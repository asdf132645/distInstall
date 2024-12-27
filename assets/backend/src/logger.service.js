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
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
let LoggerService = class LoggerService extends common_1.Logger {
    constructor() {
        super();
        this.baseLogDir = 'D:\\UIMD_Data\\UI_Log\\BACKEND_LOG';
        this.lastMessages = {
            log: null,
            error: null,
            warn: null,
            debug: null,
            cbcLis: null,
            ping: null,
            login: null,
        };
        this.ensureBaseLogDirectoryExists();
    }
    log(message) {
        if (this.isDuplicateMessage('log', message))
            return;
        super.log(message);
        this.writeLog('log', message);
    }
    error(message, trace) {
        const fullMessage = trace ? `${message}\n${trace}` : message;
        if (this.isDuplicateMessage('error', fullMessage))
            return;
        super.error(message, trace);
        this.writeLog('error', fullMessage);
    }
    warn(message) {
        if (this.isDuplicateMessage('warn', message))
            return;
        super.warn(message);
        this.writeLog('warn', message);
    }
    debug(message) {
        if (this.isDuplicateMessage('debug', message))
            return;
        super.debug(message);
        this.writeLog('debug', message);
    }
    cbcLis(message) {
        if (this.isDuplicateMessage('cbcLis', message))
            return;
        super.log(message);
        this.writeLog('cbcLis', message);
    }
    ping(message) {
        if (this.isDuplicateMessage('ping', message))
            return;
        super.log(message);
        this.writeLog('ping', message);
    }
    logic(message) {
        if (this.isDuplicateMessage('logic', message))
            return;
        super.log(message);
        this.writeLog('logic', message);
    }
    isDuplicateMessage(level, message) {
        if (this.lastMessages[level] === message) {
            return true;
        }
        this.lastMessages[level] = message;
        return false;
    }
    formattedTime(date) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
        return `[${hours}:${minutes}:${seconds}.${milliseconds}]`;
    }
    writeLog(level, message) {
        const now = new Date();
        const dateString = moment(now).format('YYYY-MM-DD');
        const logDir = path.join(this.baseLogDir, level);
        this.ensureDirectoryExists(logDir);
        const logFilePath = path.join(logDir, `${dateString}_${level}.txt`);
        this.ensureFileExists(logFilePath);
        const formattedMessage = `${this.formattedTime(now)} - ${message}`;
        fs.appendFileSync(logFilePath, `${formattedMessage}\n`);
    }
    ensureBaseLogDirectoryExists() {
        this.ensureDirectoryExists(this.baseLogDir);
    }
    ensureDirectoryExists(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`로그 디렉토리가 존재하지 않아서 생성: ${dir}`);
        }
    }
    ensureFileExists(file) {
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, '');
        }
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggerService);
//# sourceMappingURL=logger.service.js.map