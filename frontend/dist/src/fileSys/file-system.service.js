"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs-extra");
const child_process_1 = require("child_process");
const path = require("path");
const moment = require("moment");
const fs_extra_1 = require("fs-extra");
let FileSystemService = class FileSystemService {
    async createFolder(path) {
        try {
            await fs.ensureDir(path);
        }
        catch (error) {
            throw new Error(`Failed to create folder at path: ${path}`);
        }
    }
    async deleteFolder(path) {
        try {
            await fs.remove(path);
        }
        catch (error) {
            throw new Error(`Failed to delete folder at path: ${path}`);
        }
    }
    async copyFile(source, destination) {
        (0, child_process_1.exec)(`copy "${source}" "${destination}" /Y`, (error, stdout, stderr) => {
            if (error) {
                console.error('Error copying file:', error);
                return;
            }
            console.log('File copied successfully:', stdout);
        });
    }
    async cleanupOldFiles(directoryPath, keyword) {
        try {
            const files = await fs.promises.readdir(directoryPath);
            const oneMonthAgo = moment().subtract(1, 'months');
            for (const file of files) {
                if (file.includes(keyword)) {
                    const match = file.match(/_(\d{14})\.hl7$/);
                    if (match) {
                        const dateString = match[1];
                        const fileDate = moment(dateString, 'YYYYMMDDHHmmss');
                        if (fileDate.isBefore(oneMonthAgo)) {
                            const filePath = path.join(directoryPath, file);
                            (0, child_process_1.exec)(`del /F /Q "${filePath}"`, (error, stdout, stderr) => {
                                if (error) {
                                    console.error(`Error deleting file ${filePath}:`, error);
                                }
                                else {
                                    console.log(`Deleted file: ${filePath}`);
                                }
                            });
                        }
                    }
                }
            }
        }
        catch (error) {
            console.error('Error reading directory or deleting files:', error);
        }
    }
    async checkFileExistence(directoryPath, keyword) {
        try {
            const files = await fs.promises.readdir(directoryPath);
            const fileExists = files.some((file) => file.includes(keyword));
            return fileExists;
        }
        catch (error) {
            console.error('Error reading directory:', error);
            return false;
        }
    }
    async findFilesByString(directoryPath, searchString) {
        try {
            const files = await (0, fs_extra_1.readdir)(directoryPath);
            return files.filter((file) => file.includes(searchString));
        }
        catch (error) {
            throw new Error(`Failed to read directory: ${error.message}`);
        }
    }
    getLogs(folderPath) {
        try {
            const currentDate = moment();
            const startDate = moment().subtract(5, 'days');
            const groupedLogs = {};
            if (!fs.existsSync(folderPath)) {
                return new common_1.HttpException({
                    message: '지정된 폴더가 존재하지 않습니다.',
                    error: 'Invalid Folder Path',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const files = fs.readdirSync(folderPath);
            files.forEach((file) => {
                const match = file.match(/^(\d{4})_(\d{2})_(\d{2})_Error_Log\.txt$/);
                if (match) {
                    const fileDate = moment(`${match[1]}-${match[2]}-${match[3]}`, 'YYYY-MM-DD');
                    const dateKey = fileDate.format('YYYY-MM-DD');
                    if (fileDate.isBetween(startDate, currentDate, 'day', '[]')) {
                        const filePath = path.join(folderPath, file);
                        const content = fs.readFileSync(filePath, 'utf-8');
                        const lines = content.split('\n');
                        const seenMessages = new Map();
                        lines.forEach((line) => {
                            const timestampMatch = line.match(/^\[(\d{2}:\d{2}:\d{2}\.\d{3})\]/);
                            const dataMatch = line.match(/E_TYPE\s*:\s*(\w+)\s*\|\s*E_CODE:\s*(\d+)\s*\|\s*E_NAME:\s*(\w+)\s*\|\s*E_DESC:\s*(.*?)\s*\|\s*E_SOLN:\s*(.*)/);
                            if (timestampMatch && dataMatch) {
                                const timestamp = timestampMatch[1].trim();
                                const [E_TYPE, E_CODE, E_NAME, E_DESC, E_SOLN] = dataMatch
                                    .slice(1)
                                    .map((v) => v.trim());
                                const messageKey = `${E_CODE}-${E_NAME}-${E_TYPE}`;
                                if (!currentDate.isSame(fileDate, 'day')) {
                                    if (seenMessages.has(messageKey)) {
                                        const existingLog = seenMessages.get(messageKey);
                                        const existingTimestamp = existingLog.timestamp;
                                        if (moment(timestamp, 'HH:mm:ss.SSS').isAfter(moment(existingTimestamp, 'HH:mm:ss.SSS'))) {
                                            seenMessages.set(messageKey, {
                                                timestamp,
                                                log: {
                                                    timestamp,
                                                    E_TYPE,
                                                    E_CODE,
                                                    E_NAME,
                                                    E_DESC,
                                                    E_SOLN,
                                                },
                                            });
                                        }
                                    }
                                    else {
                                        seenMessages.set(messageKey, {
                                            timestamp,
                                            log: {
                                                timestamp,
                                                E_TYPE,
                                                E_CODE,
                                                E_NAME,
                                                E_DESC,
                                                E_SOLN,
                                            },
                                        });
                                    }
                                }
                                else {
                                    if (!groupedLogs[dateKey]) {
                                        groupedLogs[dateKey] = [];
                                    }
                                    groupedLogs[dateKey].push({
                                        timestamp,
                                        E_TYPE,
                                        E_CODE,
                                        E_NAME,
                                        E_DESC,
                                        E_SOLN,
                                    });
                                }
                            }
                        });
                        if (!currentDate.isSame(fileDate, 'day')) {
                            seenMessages.forEach((value) => {
                                const log = value.log;
                                if (!groupedLogs[dateKey]) {
                                    groupedLogs[dateKey] = [];
                                }
                                groupedLogs[dateKey].push(log);
                            });
                        }
                    }
                }
            });
            return groupedLogs;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                return error;
            }
            return new common_1.HttpException({
                message: '로그를 처리하는 중에 알 수 없는 오류가 발생했습니다.',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FileSystemService = FileSystemService;
exports.FileSystemService = FileSystemService = __decorate([
    (0, common_1.Injectable)()
], FileSystemService);
//# sourceMappingURL=file-system.service.js.map