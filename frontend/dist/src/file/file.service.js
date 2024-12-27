"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path = require("path");
const fss = require("fs");
const iconv = require("iconv-lite");
let FileService = class FileService {
    constructor() {
        this.possibleExtensions = [
            '.txt',
            '.json',
            '.csv',
            '.hl7',
            '.ini',
            '.lst2msg',
        ];
    }
    async readFile(filePath) {
        for (const extension of this.possibleExtensions) {
            try {
                const data = await fs_1.promises.readFile(`${filePath}${extension}`, 'utf8');
                return { success: true, data };
            }
            catch (error) {
                if (error.code !== 'ENOENT') {
                    return {
                        success: false,
                        message: `Error reading file: ${error.message}`,
                    };
                }
            }
        }
        return {
            success: false,
            message: `File not found with any of the extensions: ${this.possibleExtensions.join(', ')}`,
        };
    }
    async readFileEUCKR(filePath) {
        for (const extension of this.possibleExtensions) {
            try {
                const buffer = await fs_1.promises.readFile(`${filePath}${extension}`);
                const data = iconv.decode(buffer, 'EUC-KR');
                return { success: true, data };
            }
            catch (error) {
                if (error.code !== 'ENOENT') {
                    return {
                        success: false,
                        message: `Error reading file in EUC-KR encoding: ${error.message}`,
                    };
                }
            }
        }
        return {
            success: false,
            message: `File not found with any of the extensions: ${this.possibleExtensions.join(', ')}`,
        };
    }
    checkFileExists(directoryPath, filename) {
        const fullPath = path.join(directoryPath, filename);
        return fss.existsSync(fullPath);
    }
    async cbcSaveDataService(filePath, data) {
        const directory = path.dirname(filePath);
        await this.ensureDirectoryExistence(directory);
        try {
            await (0, promises_1.access)(filePath, promises_1.constants.F_OK);
            await (0, promises_1.unlink)(filePath);
        }
        catch (error) {
            console.log(`파일 없음 새로 생성`);
        }
        await (0, promises_1.writeFile)(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`File saved successfully at ${filePath}`);
    }
    async ensureDirectoryExistence(directory) {
        try {
            await (0, promises_1.access)(directory, promises_1.constants.F_OK);
        }
        catch {
            await (0, promises_1.mkdir)(directory, { recursive: true });
        }
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
//# sourceMappingURL=file.service.js.map