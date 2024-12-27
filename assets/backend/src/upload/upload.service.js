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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fs = require("fs-extra");
const path = require("path");
const runingInfo_entity_1 = require("../runingInfo/runingInfo.entity");
const logger_service_1 = require("../logger.service");
const child_process_1 = require("child_process");
const os = require("os");
const combined_service_1 = require("../combinedProtocol/combined.service");
const userInfo = os.userInfo();
let UploadService = class UploadService {
    constructor(dataSource, runningInfoRepository, logger, combinedService) {
        this.dataSource = dataSource;
        this.runningInfoRepository = runningInfoRepository;
        this.logger = logger;
        this.combinedService = combinedService;
        this.moveResults = { success: 0, total: 0 };
        this.pythonScriptPath = `${userInfo.homedir}\\AppData\\Local\\Programs\\UIMD\\UIMD_download_upload_tool\\move_files.exe`;
        this.listDirectoriesInFolder = async (folderPath) => {
            const folderNamesArr = [];
            try {
                const items = await fs.readdir(folderPath);
                for (const item of items) {
                    const itemPath = path.join(folderPath, item);
                    const stats = await fs.stat(itemPath);
                    if (stats.isDirectory()) {
                        folderNamesArr.push(item);
                    }
                }
                return folderNamesArr;
            }
            catch (error) {
                this.logger.logic(`[Upload] Error reading directories: ${error}`);
                return [];
            }
        };
        this.getInsertStatement = (filePath) => {
            const sql = fs.readFileSync(filePath, 'utf8');
            const statements = sql
                .split(';')
                .map((s) => s.trim())
                .filter((s) => s.length > 0);
            return statements.filter((s) => s.toUpperCase().startsWith('INSERT INTO'));
        };
        this.getCreateTableStatement = (sql) => {
            const createTableRegex = /CREATE TABLE `runing_info_entity` \(([\s\S]*?)\)\s*ENGINE=[^\s]+/;
            const match = sql.match(createTableRegex);
            let createTableStatement = match[0];
            createTableStatement = createTableStatement.replace(/CREATE TABLE `runing_info_entity`/, 'CREATE TABLE IF NOT EXISTS `restore_runing_info_entity`');
            const engineMatch = createTableStatement.match(/ ENGINE=InnoDB/);
            createTableStatement = createTableStatement.replace(engineMatch[0], ';');
            return createTableStatement;
        };
        this.createTemporaryTable = async (filePath) => {
            let sql = fs.readFileSync(filePath, 'utf8');
            const dropTableMatch = sql.match(/DROP TABLE IF EXISTS `runing_info_entity`;/);
            if (dropTableMatch) {
                sql = sql.replace(dropTableMatch[0], '');
            }
            let createTableStatement = this.getCreateTableStatement(sql);
            createTableStatement = createTableStatement.replace(/CREATE TABLE `runing_info_entity`/, 'CREATE TABLE IF NOT EXISTS `restore_runing_info_entity`');
            await this.dataSource.query(createTableStatement);
            const insertStatements = this.getInsertStatement(filePath);
            for (let insertStatement of insertStatements) {
                insertStatement = insertStatement.replace(/INSERT INTO `runing_info_entity`/, 'INSERT INTO `restore_runing_info_entity`');
                await this.dataSource.query(insertStatement);
            }
        };
        this.moveDataToDatabase = async () => {
            const restoreSql = `SELECT * FROM restore_runing_info_entity`;
            const items = await this.dataSource.query(restoreSql);
            const slotIds = items.map((item) => item?.slotId);
            const existingItems = await this.runningInfoRepository.find({
                where: { slotId: (0, typeorm_2.In)(slotIds) },
                select: ['slotId'],
            });
            const existingSlotIdSet = new Set(existingItems.map((item) => item.slotId));
            const itemsToSave = items
                .filter((item) => !existingSlotIdSet.has(item?.slotId))
                .map((item) => ({
                slotNo: item.slotNo,
                traySlot: item.traySlot,
                testType: item.testType,
                barcodeNo: item.barcodeNo,
                patientId: item.patientId,
                patientNm: item.patientNm,
                gender: item.gender,
                birthDay: item.birthDay,
                wbcCount: item.wbcCount,
                slotId: item.slotId,
                orderDttm: item.orderDttm,
                analyzedDttm: item.analyzedDttm,
                tactTime: item.tactTime,
                isNormal: item.isNormal,
                cassetId: item.cassetId,
                wbcMemo: item.wbcMemo,
                rbcMemo: item.rbcMemo,
                wbcInfo: item.wbcInfo,
                wbcInfoAfter: item.wbcInfoAfter,
                rbcInfo: item.rbcInfo,
                rbcInfoAfter: item.rbcInfoAfter,
                rbcInfoPosAfter: item.rbcInfoPosAfter,
                maxWbcCount: item.maxWbcCount,
                bf_lowPowerPath: item.bf_lowPowerPath,
                submitState: item.submitState,
                submitOfDate: item.submitOfDate,
                submitUserId: item.submitUserId,
                isNsNbIntegration: item.isNsNbIntegration,
                pcIp: item.pcIp,
                cbcPatientNo: item.cbcPatientNo,
                cbcPatientNm: item.cbcPatientNm,
                cbcSex: item.cbcSex,
                cbcAge: item.cbcAge,
                img_drive_root_path: null,
                lock_status: 0,
            }));
            if (itemsToSave.length > 0) {
                await this.runningInfoRepository.save(itemsToSave);
            }
        };
        this.checkDuplicatedInDatabase = async () => {
            const restoreSql = `SELECT slotId, barcodeNo FROM restore_runing_info_entity`;
            const items = await this.dataSource.query(restoreSql);
            const slotIds = items.map((item) => item.slotId);
            const existingItemsInDB = await this.runningInfoRepository.find({
                where: { slotId: (0, typeorm_2.In)(slotIds) },
            });
            const existingSlotIdSet = new Set(existingItemsInDB.map((item) => item.slotId));
            const duplicatedSlotIdArr = [];
            const nonDuplicatedSlotIdArr = [];
            for (const item of items) {
                if (existingSlotIdSet.has(item.slotId)) {
                    duplicatedSlotIdArr.push(item.barcodeNo);
                }
                else {
                    nonDuplicatedSlotIdArr.push(item.barcodeNo);
                }
            }
            if (duplicatedSlotIdArr.length === 0) {
                this.moveResults.success = 0;
                this.moveResults.total = nonDuplicatedSlotIdArr.length;
            }
            return {
                duplicated: duplicatedSlotIdArr,
                nonDuplicated: nonDuplicatedSlotIdArr,
                totalMove: this.moveResults.total,
                successMove: this.moveResults.success,
            };
        };
        this.deleteTemporaryTable = async () => {
            const deleteTableSql = 'DROP TABLE IF EXISTS `restore_runing_info_entity`';
            await this.dataSource.query(deleteTableSql);
        };
        this.deleteImageFolder = async (folderPath) => {
            if (await fs.pathExists(folderPath)) {
                try {
                    fs.removeSync(folderPath);
                }
                catch (e) {
                    this.logger.logic(`[Upload] Error(Remained Image Folder): ${e}`);
                }
            }
        };
        this.updateImgDriveRootPath = async (availableIds, destinationUploadPath) => {
            const convertedDestinationUploadPath = destinationUploadPath.replace('\\', '\\\\');
            for (const id of availableIds) {
                const query = `UPDATE runing_info_entity SET img_drive_root_path = '${convertedDestinationUploadPath}' WHERE (id = '${id}');`;
                await this.dataSource.query(query);
            }
        };
        this.moveImages = async (fileNames, originUploadPath, destinationUploadPath, uploadType, apiUrl) => {
            const availableFileNames = [];
            const availableIds = [];
            const processFileName = async (fileName) => {
                try {
                    const items = await this.runningInfoRepository.find({
                        where: { slotId: fileName },
                    });
                    if (Array.isArray(items) && items[0]?.slotId) {
                        availableFileNames.push(fileName);
                        availableIds.push(items[0].id);
                    }
                    else {
                        console.log(`Unexpected data format for slotId: ${fileName}`);
                    }
                }
                catch (error) {
                    console.log(error);
                }
            };
            await Promise.all(fileNames.map((fileName) => processFileName(fileName)));
            const queue = availableFileNames.map((slotId) => {
                const sourcePath = path.join(originUploadPath, slotId);
                const targetFolderPath = path.join(destinationUploadPath, slotId);
                return { source: sourcePath, destination: targetFolderPath, uploadType };
            });
            const promises = queue.map(async (task) => await this.runPythonScript(task, uploadType));
            await Promise.all(promises);
            return availableIds;
        };
    }
    cleanNpmCache() {
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)('npm cache clean --force', (error, stdout, stderr) => {
                if (error) {
                    return reject(error);
                }
                if (stderr) {
                    console.log(`npm cache clean warning: ${stderr}`);
                }
                resolve(stdout);
            });
        });
    }
    runPythonScript(task, uploadType) {
        const { source, destination } = task;
        const convertedSource = source.replaceAll('\\', '/');
        const convertedDestination = destination.replaceAll('\\', '/');
        return new Promise((resolve, reject) => {
            const result = (0, child_process_1.spawn)(`${this.pythonScriptPath}`, [convertedSource, convertedDestination, uploadType]);
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
    async uploadOperation(fileInfo) {
        const { fileName, destinationUploadPath, projectType, originUploadPath, uploadType, apiUrl, } = fileInfo;
        const databaseName = projectType.toUpperCase() === 'PB' ? 'pb_db_web' : 'bm_db_web';
        await this.deleteTemporaryTable();
        const uploadDateFolderName = path.join(originUploadPath, fileName);
        fs.access(uploadDateFolderName, fs.constants.R_OK);
        const entries = await fs.readdir(uploadDateFolderName, {
            withFileTypes: true,
        });
        const sqlFileName = entries
            .filter((entry) => entry.name.includes('.sql'))
            .map((file) => file.name)[0];
        const sqlFilePath = `${uploadDateFolderName}\\${sqlFileName}`;
        try {
            if (!(await fs.pathExists(destinationUploadPath))) {
                await fs.ensureDir(destinationUploadPath);
            }
            if (!(await fs.pathExists(uploadDateFolderName))) {
                return 'Upload folder does not exist';
            }
            if (!(await fs.pathExists(sqlFilePath))) {
                return 'Upload file does not exist';
            }
            if (!(await fs.pathExists(destinationUploadPath))) {
                await fs.ensureDir(destinationUploadPath);
            }
            await this.cleanNpmCache();
            const folderNamesArr = await this.listDirectoriesInFolder(uploadDateFolderName);
            await this.dataSource.query(`USE ${databaseName}`);
            await this.createTemporaryTable(sqlFilePath);
            await this.moveDataToDatabase();
            const availableIds = await this.moveImages(folderNamesArr, uploadDateFolderName, destinationUploadPath, uploadType, apiUrl);
            await this.updateImgDriveRootPath(availableIds, destinationUploadPath);
            await this.deleteTemporaryTable();
            if (uploadType === 'move') {
                await this.deleteImageFolder(uploadDateFolderName);
            }
            this.combinedService.sendIsDownloadUploadFinished('upload');
            return 'Upload completed successfully';
        }
        catch (e) {
            console.log(e);
        }
    }
    async checkDuplicatedData(fileInfo) {
        const { fileName, destinationUploadPath, originUploadPath, projectType } = fileInfo;
        const databaseName = projectType.toUpperCase() === 'PB' ? 'pb_db_web' : 'bm_db_web';
        await this.deleteTemporaryTable();
        const uploadDateFolderName = path.join(originUploadPath, fileName);
        fs.access(uploadDateFolderName, fs.constants.R_OK);
        const entries = await fs.readdir(uploadDateFolderName, {
            withFileTypes: true,
        });
        const sqlFileName = entries
            .filter((entry) => entry.name.includes('.sql'))
            .map((file) => file.name)[0];
        const sqlFilePath = `${uploadDateFolderName}\\${sqlFileName}`;
        try {
            if (!(await fs.pathExists(destinationUploadPath))) {
                await fs.ensureDir(destinationUploadPath);
            }
            if (!(await fs.pathExists(uploadDateFolderName))) {
                return 'Download folder does not exist';
            }
            if (!(await fs.pathExists(sqlFilePath))) {
                return 'Download file does not exist';
            }
            await this.dataSource.query(`USE ${databaseName}`);
            await this.createTemporaryTable(sqlFilePath);
            return await this.checkDuplicatedInDatabase();
        }
        catch (e) {
            this.logger.logic(`[UPLOAD] Error: ${e}`);
            return `Invalid access`;
        }
    }
    async checkPossibleUploadFile(fileInfo) {
        const { originUploadPath } = fileInfo;
        if (!(await fs.pathExists(originUploadPath))) {
            return { success: false, message: 'Download folder does not exits' };
        }
        try {
            fs.access(originUploadPath, fs.constants.R_OK);
            const entries = await fs.readdir(originUploadPath, {
                withFileTypes: true,
            });
            const topLevelDirectories = entries
                .filter((entry) => entry.isDirectory())
                .map((dir) => dir.name);
            return topLevelDirectories;
        }
        catch (error) {
            return { success: false, message: 'Error reading download path' };
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(1, (0, typeorm_1.InjectRepository)(runingInfo_entity_1.RuningInfoEntity)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        logger_service_1.LoggerService,
        combined_service_1.CombinedService])
], UploadService);
//# sourceMappingURL=upload.service.js.map