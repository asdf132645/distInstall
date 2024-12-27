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
exports.FileSystemController = void 0;
const common_1 = require("@nestjs/common");
const file_system_service_1 = require("./file-system.service");
let FileSystemController = class FileSystemController {
    constructor(fileSystemService) {
        this.fileSystemService = fileSystemService;
    }
    async createFolder(body) {
        const { path } = body;
        await this.fileSystemService.createFolder(path);
        return `Folder created at ${path}`;
    }
    async deleteFolder(body) {
        const { path } = body;
        await this.fileSystemService.deleteFolder(path);
        return `Folder deleted at ${path}`;
    }
    async copyFile(body) {
        await this.fileSystemService.copyFile(body.source, body.destination);
        return { message: 'File copied successfully' };
    }
    async cleanupFiles(body) {
        const { directoryPath, keyword } = body;
        try {
            await this.fileSystemService.cleanupOldFiles(directoryPath, keyword);
            return 'File cleanup completed successfully.';
        }
        catch (error) {
            console.error('Error during file cleanup:', error);
            return 'An error occurred during file cleanup.';
        }
    }
    async checkFile(body) {
        const { directoryPath, keyword } = body;
        try {
            const fileExists = await this.fileSystemService.checkFileExistence(directoryPath, keyword);
            if (fileExists) {
                return 'exists';
            }
            else {
                return 'NoFile';
            }
        }
        catch (error) {
            console.error('Error during file existence check:', error);
            return 'An error occurred while checking file existence.';
        }
    }
    async getFiles(directoryPath, searchString) {
        return this.fileSystemService.findFilesByString(directoryPath, searchString);
    }
    getLogs(folderPath) {
        if (!folderPath) {
            throw new common_1.HttpException({
                message: 'folderPath 파라미터를 제공해야 합니다.',
                error: 'Missing Parameter',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const logs = this.fileSystemService.getLogs(folderPath);
        return logs;
    }
};
exports.FileSystemController = FileSystemController;
__decorate([
    (0, common_1.Post)('create-folder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileSystemController.prototype, "createFolder", null);
__decorate([
    (0, common_1.Delete)('delete-folder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileSystemController.prototype, "deleteFolder", null);
__decorate([
    (0, common_1.Post)('copy'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileSystemController.prototype, "copyFile", null);
__decorate([
    (0, common_1.Post)('cleanup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileSystemController.prototype, "cleanupFiles", null);
__decorate([
    (0, common_1.Post)('existsFile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileSystemController.prototype, "checkFile", null);
__decorate([
    (0, common_1.Get)('fileSearch'),
    __param(0, (0, common_1.Query)('directoryPath')),
    __param(1, (0, common_1.Query)('searchString')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FileSystemController.prototype, "getFiles", null);
__decorate([
    (0, common_1.Get)('errLogsRead'),
    __param(0, (0, common_1.Query)('folderPath')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], FileSystemController.prototype, "getLogs", null);
exports.FileSystemController = FileSystemController = __decorate([
    (0, common_1.Controller)('filesystem'),
    __metadata("design:paramtypes", [file_system_service_1.FileSystemService])
], FileSystemController);
//# sourceMappingURL=file-system.controller.js.map