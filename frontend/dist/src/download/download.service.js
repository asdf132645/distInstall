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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const runingInfo_entity_1 = require("../runingInfo/runingInfo.entity");
const child_process_1 = require("child_process");
const fs = require("fs-extra");
const path = require("path");
const moment = require("moment");
const os = require("os");
const logger_service_1 = require("../logger.service");
const combined_service_1 = require("../combinedProtocol/combined.service");
const userInfo = os.userInfo();
let DownloadService = class DownloadService {
    constructor(dataSource, runningInfoRepository, logger, combinedService) {
        this.dataSource = dataSource;
        this.runningInfoRepository = runningInfoRepository;
        this.logger = logger;
        this.combinedService = combinedService;
        this.moveResults = { success: 0, total: 0 };
        this.pythonScriptPath = `${userInfo.homedir}\\AppData\\Local\\Programs\\UIMD\\UIMD_download_upload_tool\\move_files.exe`;
        this.cleanNpmCache = () => this.execCommand('npm cache clean --force');
        this.checkAvailableFolders = async (path, slotIds) => {
            const folderNames = await this.readFolderNames(path);
            return folderNames.filter((folderName) => slotIds.includes(folderName));
        };
    }
    formatDate(date, type) {
        const formattedDate = moment(date).format('YYYYMMDD');
        return type === 'start'
            ? `${formattedDate}000000000`
            : `${formattedDate}999999999`;
    }
    async ensureDirectoryExists(directoryPath) {
        if (!(await fs.pathExists(directoryPath))) {
            await fs.ensureDir(directoryPath);
        }
    }
    runPythonScript(task, downloadType) {
        const { source, destination } = task;
        const convertedSource = source.replaceAll('\\', '/');
        const convertedDestination = destination.replaceAll('\\', '/');
        return new Promise((resolve, reject) => {
            const result = (0, child_process_1.spawn)(`${this.pythonScriptPath}`, [convertedSource, convertedDestination, downloadType]);
            result.stdout.on('data', (data) => {
                console.log(`Output: ${data}`);
            });
            result.stderr.on('data', (data) => {
                console.error(`Error: ${data}`);
            });
            result.on('close', (code) => {
                this.moveResults.success++;
                console.log('close code', code);
                resolve(null);
            });
            result.on('error', (err) => {
                reject(err);
            });
        });
    }
    execCommand(command) {
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                if (error) {
                    this.logger.logic(`[Command] - Error executing ${command}: ${error.message}`);
                    reject(error);
                }
                if (stderr) {
                    this.logger.logic(`[Command] - Warning: ${stderr}`);
                }
                resolve();
            });
        });
    }
    async fetchDataByDateRange(startDate, endDate) {
        const query = `
      SELECT slotId
      FROM runing_info_entity
      WHERE analyzedDttm BETWEEN ? AND ?;
    `;
        const slotIdArray = await this.runningInfoRepository.query(query, [
            this.formatDate(startDate, 'start'),
            this.formatDate(endDate, 'end'),
        ]);
        return slotIdArray.map((item) => item.slotId);
    }
    async readFolderNames(dirPath) {
        const files = await fs.readdir(dirPath, { withFileTypes: true });
        return files.filter((file) => file.isDirectory()).map((file) => file.name);
    }
    async updateImgDriveRootPath(availableIds, destinationUploadPath) {
        const convertedDestinationUploadPath = destinationUploadPath.replaceAll('\\', '\\\\');
        const ids = availableIds.map((id) => `'${id}'`).join(',');
        const query = `UPDATE runing_info_entity SET img_drive_root_path = '${convertedDestinationUploadPath}' WHERE slotId IN (${ids})`;
        await this.dataSource.query(query);
    }
    async checkIsPossibleToDownload(downloadDto) {
        const { startDate, endDate, destinationDownloadPath, originDownloadPath } = downloadDto;
        await this.ensureDirectoryExists(destinationDownloadPath);
        const dateFolder = path.join(destinationDownloadPath, `${startDate}_${endDate}`);
        const availableSlotIdsFromDB = await this.fetchDataByDateRange(moment(startDate).toDate(), moment(endDate).toDate());
        const moveAvailableFolders = await this.checkAvailableFolders(originDownloadPath, availableSlotIdsFromDB);
        if (moveAvailableFolders.length === 0) {
            return { success: false, message: 'No data exists' };
        }
        if (await fs.pathExists(dateFolder)) {
            return {
                success: false,
                message: 'The download file for the specified date already exists',
            };
        }
        this.moveResults.total = moveAvailableFolders.length;
        this.moveResults.success = 0;
        return {
            success: true,
            message: `Success ${moveAvailableFolders.length}`,
        };
    }
    async downloadOperation(downloadDto) {
        const { startDate, endDate, originDownloadPath, destinationDownloadPath, downloadType, projectType, apiUrl, } = downloadDto;
        const downloadPath = `${destinationDownloadPath.split(':')[0]}:\\UIMD_${projectType.toUpperCase()}_backup`;
        const downloadDateFolder = path.join(downloadPath, `${startDate}_${endDate}`);
        await this.ensureDirectoryExists(downloadDateFolder);
        await this.cleanNpmCache();
        const availableSlotIdsFromDB = await this.fetchDataByDateRange(moment(startDate).toDate(), moment(endDate).toDate());
        const queue = (await Promise.all(availableSlotIdsFromDB.map(async (slotId) => {
            const sourcePath = path.join(originDownloadPath, slotId);
            if (await fs.pathExists(sourcePath)) {
                return {
                    source: sourcePath,
                    destination: path.join(downloadDateFolder, slotId),
                };
            }
            return null;
        }))).filter(Boolean);
        const promises = queue.map(async (task) => await this.runPythonScript(task, downloadType));
        await Promise.all(promises);
        if (downloadType === 'move') {
            await this.updateImgDriveRootPath(availableSlotIdsFromDB, downloadDateFolder);
        }
        const backupFile = path.join(downloadDateFolder, `backup-${startDate}_${endDate}.sql`);
        const schema = projectType.toUpperCase() === 'PB' ? 'pb_db_web' : 'bm_db_web';
        const dumpCommand = `mysqldump --user=root --password=uimd5191! --host=127.0.0.1 ${schema} runing_info_entity --where="analyzedDttm BETWEEN '${this.formatDate(moment(startDate).toDate(), 'start')}' AND '${this.formatDate(moment(endDate).toDate(), 'end')}'" > ${backupFile}`;
        await this.execCommand(dumpCommand);
        this.combinedService.sendIsDownloadUploadFinished('download');
        return { success: this.moveResults.success, total: queue.length };
    }
    async openDrive(downloadDto) {
        const { originDownloadPath } = downloadDto;
        await this.ensureDirectoryExists(originDownloadPath);
        (0, child_process_1.exec)(`explorer.exe ${originDownloadPath}`, (err) => {
            if (err) {
                this.logger.error(`[OpenDrive] - Error opening ${originDownloadPath}: ${err}`);
            }
            else {
                this.logger.log(`[OpenDrive] - Successfully opened ${originDownloadPath}`);
            }
        });
        return 'Success';
    }
};
exports.DownloadService = DownloadService;
exports.DownloadService = DownloadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(runingInfo_entity_1.RuningInfoEntity)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        logger_service_1.LoggerService,
        combined_service_1.CombinedService])
], DownloadService);
//# sourceMappingURL=download.service.js.map