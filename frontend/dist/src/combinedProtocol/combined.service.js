"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombinedService = void 0;
const common_1 = require("@nestjs/common");
const net = require("net");
const socket_io_1 = require("socket.io");
const websockets_1 = require("@nestjs/websockets");
const logger_service_1 = require("../logger.service");
const dotenv = require("dotenv");
const runingInfo_service_1 = require("../runingInfo/runingInfo.service");
const network_1 = require("../utils/network");
const browser_service_1 = require("../browserExit/browser.service");
dotenv.config();
let CombinedService = class CombinedService {
    constructor(logger, runingInfoService, browserService) {
        this.logger = logger;
        this.runingInfoService = runingInfoService;
        this.browserService = browserService;
        this.connectedClient = null;
        this.count = 0;
        this.reqArr = [];
        this.prevReqDttm = null;
        this.clients = [];
        this.notRes = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 10;
        this.reconnectDelay = 1000;
        this.mainPc = true;
        this.isNotDownloadOrUploading = true;
        this.tcpQueue = [];
        this.isProcessing = false;
        this.runningJobCmd = {
            START: {
                status: false,
                data: '',
            },
            INIT: {
                status: false,
                data: '',
            },
            RESTART: {
                status: false,
                data: '',
            },
            STOP: {
                status: false,
                data: '',
            },
            END: {
                status: false,
                data: '',
            },
            PAUSE: {
                status: false,
                data: '',
            },
            RUNNING_COMP: {
                status: false,
                data: '',
            },
            RECOVERY: {
                status: false,
                data: '',
            },
            SETTINGS: {
                status: false,
                data: '',
            },
            OIL_PRIME: {
                status: false,
                data: '',
            },
            GRIPPER_OPEN: {
                status: false,
                data: '',
            },
            CAMERA_RESET: {
                status: false,
                data: '',
            },
            clientExit: {
                status: false,
                data: '',
            },
            SEARCH_CARD_COUNT: {
                status: false,
                data: '',
            },
            ERROR_CLEAR: {
                status: false,
                data: '',
            },
        };
        this.handleJobcmd = async (tcpData) => {
            if (!this.runningJobCmd[tcpData.payload.jobCmd].status) {
                this.runningJobCmd[tcpData.payload.jobCmd].status = true;
                this.runningJobCmd[tcpData.payload.jobCmd].data = tcpData;
                this.tcpQueue = [];
                this.tcpQueue.push(tcpData);
            }
        };
        this.getNotRunningJob = () => {
            return Object.entries(this.runningJobCmd)
                .filter(([_, value]) => value.status)
                .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
        };
        this.reSendProcessQueue = (data) => {
            if (!['SYSINFO', 'RUNNING_INFO'].includes(JSON.parse(data).jobCmd) &&
                this.runningJobCmd[JSON.parse(data).jobCmd].status) {
                this.runningJobCmd[JSON.parse(data).jobCmd].status = false;
                this.runningJobCmd[JSON.parse(data).jobCmd].data = '';
            }
            const isNotReceivingJob = this.getNotRunningJob();
            if (isNotReceivingJob && Object.keys(isNotReceivingJob).length > 0) {
                this.tcpQueue = [];
                this.tcpQueue.push(isNotReceivingJob.data);
            }
        };
    }
    afterInit(server) {
        this.wss = server;
    }
    async handleDisconnect(client) {
        const clientIpAddress = client.handshake.headers['x-real-ip'] || client.conn.remoteAddress;
        const ipAddress = this.extractIPAddress(clientIpAddress);
        if (ipAddress) {
            await this.runingInfoService.clearPcIpAndSetStateFalse(ipAddress);
        }
        this.logger.log(`WebSocket 클라이언트 정보: ${client.conn}`);
        const clientIndex = this.clients.findIndex((c) => c.id === client.id);
        if (clientIndex !== -1) {
            await this.broadcastDisconnectedClient();
            this.clients.splice(clientIndex, 1);
        }
    }
    async broadcastDisconnectedClient() {
        this.clients.forEach((client) => {
            client.emit('stateVal', '');
        });
    }
    extractIPAddress(inputString) {
        if (Array.isArray(inputString)) {
            return null;
        }
        const ipAddressRegex = /\d+\.\d+\.\d+\.\d+/;
        const ipAddressMatch = inputString.match(ipAddressRegex);
        return ipAddressMatch ? ipAddressMatch[0] : null;
    }
    async handleConnection(client) {
        const clientIpAddress = client.handshake.headers['x-real-ip'] || client.conn.remoteAddress;
        const ipAddress = this.extractIPAddress(clientIpAddress);
        this.clients.push(client);
        this.logger.log(`WebSocket 클라이언트 연결됨: ${client.conn}`);
        await this.runingInfoService.addUniqueConstraintToSlotId();
        this.serverIp = await (0, network_1.isServerRunningLocally)();
        this.wss.emit('multiViewer', client.conn.remoteAddress);
        client.on('ping', () => {
            client.emit('pong');
            this.logger.ping(` 프론트 Ping : 최초연결 한번 PING ${client.conn.remoteAddress}`);
        });
        client.on('message', (message) => {
            try {
                if (this.wss) {
                    delete message.payload?.anyWay;
                    if (!client.conn.remoteAddress.includes('192.168.0.131')) {
                        this.logger.log(`웹소켓 프론트에서 받은 데이터 ${JSON.stringify(message.payload)}`);
                    }
                    if (!this.notRes) {
                        this.webSocketGetData(message);
                    }
                }
            }
            catch (e) {
                this.logger.error(`🚨 WebSocket 프론트 메시지 처리 중 오류 발생: ${e.message}`);
            }
        });
        client.on('state', (state) => {
            try {
                if (this.wss) {
                    this.wss.emit('stateVal', state);
                }
            }
            catch (e) {
                this.logger.error(`🚨 WebSocket 프론트 메시지 처리 중 오류 발생: ${e.message}`);
            }
        });
        client.on('isDownloadUploading', (state) => {
            try {
                if (this.wss) {
                    if (state.payload) {
                        this.isNotDownloadOrUploading = false;
                    }
                    else {
                        this.isNotDownloadOrUploading = true;
                    }
                }
            }
            catch (e) {
                this.logger.logic(`[Download&Upload] 다운로드 or 업로드 도중 Core Backend로 통신 중지 실패: ${e}`);
            }
        });
        client.on('viewerCheck', () => {
            try {
                if (this.wss) {
                    this.wss.emit('viewerCheck', ipAddress);
                }
            }
            catch (e) {
                this.logger.error(`🚨 WebSocket 프론트(viewerCheck) 메시지 처리 중 오류 발생: ${e.message}`);
            }
        });
        client.on('disconnect', async () => {
            console.log(clientIpAddress);
            await this.runingInfoService.redisAllClear();
            this.logger.log('WebSocket 클라이언트 연결 끊김');
        });
        client.on('error', (error) => {
            this.logger.error(`🚨 WebSocket 클라이언트 오류: ${error.message}`);
        });
    }
    webSocketGetData(message) {
        this.sendDataToEmbeddedServer(message);
        if (!this.connectedClient || this.connectedClient.destroyed) {
            this.setupTcpServer('localhost', 11235);
        }
    }
    sendDataToWebSocketClients(data) {
        if (!this.wss) {
            console.log('없다는데..?');
            this.logger.error(`🚨 WebSocket 서버 연결 끊김 클라이언트 서버 확인 필요`);
        }
        if (this.wss) {
            let jsonData = '';
            if (data?.err) {
                jsonData = `{ "bufferData": 'err' }`;
            }
            else {
                this.reSendProcessQueue(data);
                jsonData = data;
            }
            this.wss.emit('chat', jsonData);
            this.logger.log(`코어 데이터 -> 웹 백엔드 -> 프론트엔드로 전송 ${jsonData}`);
            this.notRes = false;
        }
        else {
            this.logger.error('🚨 웹소켓 전송 실패..');
        }
    }
    sendDataToEmbeddedServer(data) {
        if (this.tcpQueue.some((item) => JSON.stringify(item) === JSON.stringify(data))) {
            this.logger.warn('⚠️ 중복 데이터로 인해 전송이 무시되었습니다.');
            return;
        }
        this.tcpQueue.push(data);
        if (!['SYSINFO', 'RUNNING_INFO'].includes(data.payload.jobCmd)) {
            this.handleJobcmd(data);
        }
        this.processQueue();
    }
    async processQueue() {
        if (this.isProcessing || !this.tcpQueue.length) {
            return;
        }
        this.isProcessing = true;
        const data = this.tcpQueue.shift();
        try {
            if (this.connectedClient && !this.connectedClient.destroyed) {
                const serializedData = JSON.stringify(data.payload);
                if (serializedData && this.isNotDownloadOrUploading) {
                    this.connectedClient.write(serializedData);
                    this.logger.log(`웹백엔드 -> 코어로 전송: ${serializedData}`);
                    this.notRes = true;
                    await new Promise((resolve) => setTimeout(resolve, 100));
                }
            }
            else {
                this.logger.warn('⚠️ 활성화된 코어 TCP 없음. 데이터 전송 안됨.');
                this.notRes = false;
            }
        }
        catch (error) {
            this.logger.error(`🚨 TCP 데이터 전송 오류: ${error.message}`);
        }
        finally {
            this.isProcessing = false;
            await this.processQueue();
        }
    }
    stopTcpServer() {
        if (this.connectedClient) {
            this.connectedClient.destroy();
        }
    }
    setupTcpServer(newAddress, newPort) {
        const connectClient = () => {
            if (!this.connectedClient || this.connectedClient.destroyed) {
                const newClient = new net.Socket();
                newClient.setTimeout(10000);
                newClient.connect(newPort, newAddress, () => {
                    this.logger.warn('코어 TCP 웹 백엔드 연결 성공');
                    this.connectedClient = newClient;
                    this.wss.emit('isTcpConnected', true);
                    this.reconnectAttempts = 0;
                    this.notRes = false;
                });
                newClient.on('timeout', () => {
                    this.logger.error('🚨 코어 TCP 웹 백엔드 연결 타임아웃');
                    this.handleReconnectFailure(newClient);
                });
                newClient.on('data', (chunk) => {
                    this.logger.warn(`코어 TCP 서버로부터 데이터 수신 성공`);
                    if (this.wss) {
                        this.sendDataToWebSocketClients(chunk);
                        this.notRes = false;
                    }
                    else {
                        this.logger.error('🚨 WebSocketService가 초기화되지 않았습니다.');
                    }
                });
                newClient.on('end', () => {
                    this.logger.warn('코어 TCP 클라이언트 연결 종료');
                    this.sendDataToWebSocketClients({ err: true });
                    this.handleReconnectFailure(newClient);
                });
                newClient.on('error', (err) => {
                    this.logger.error(`🚨[${err.code} - 코어 서버 연결 거부] 코어 TCP 연결 오류 - ${err}`);
                    this.sendDataToWebSocketClients({ err: true });
                    this.handleReconnectFailure(newClient);
                });
            }
            else {
                this.logger.warn('⚠️ 이미 클라이언트 연결이 활성화되어 있습니다. 연결 재활성화 시 문제 없음 정상 코드');
            }
        };
        connectClient();
    }
    handleReconnectFailure(client) {
        if (!this.mainPc) {
            return;
        }
        this.reconnectAttempts++;
        client.destroy();
        this.connectedClient = null;
        this.logger.warn(`⚠️ TCP 연결 실패, 재연결 시도 중 (${this.reconnectAttempts}/${this.maxReconnectAttempts})... 재 연결 텀 1초`);
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            setTimeout(() => this.setupTcpServer('localhost', 11235), this.reconnectDelay);
        }
        else {
            this.logger.error('🚨 최대 재연결 시도 횟수 초과.');
        }
    }
    sendIsDownloadUploadFinished(type) {
        const obj = {
            type,
            isFinished: true,
        };
        this.wss.emit('downloadUploadFinished', obj);
    }
};
exports.CombinedService = CombinedService;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CombinedService.prototype, "wss", void 0);
exports.CombinedService = CombinedService = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        transports: ['websocket'],
        cors: { origin: '*', allowedHeaders: '*' },
    }),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        runingInfo_service_1.RuningInfoService,
        browser_service_1.BrowserService])
], CombinedService);
//# sourceMappingURL=combined.service.js.map