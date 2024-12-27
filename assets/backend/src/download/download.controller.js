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
exports.DownloadController = void 0;
const common_1 = require("@nestjs/common");
const download_service_1 = require("./download.service");
const download_dto_1 = require("./download.dto");
const ioredis_1 = require("@nestjs-modules/ioredis");
const ioredis_2 = require("ioredis");
let DownloadController = class DownloadController {
    constructor(downloadService, redis) {
        this.downloadService = downloadService;
        this.redis = redis;
    }
    async createBackup(downloadDto) {
        const { dayQuery } = downloadDto;
        await this.redis.del(dayQuery);
        return await this.downloadService.downloadOperation(downloadDto);
    }
    async checkIsPossibleToDownload(downloadDto) {
        return await this.downloadService.checkIsPossibleToDownload(downloadDto);
    }
    async openDrive(downloadDto) {
        return await this.downloadService.openDrive(downloadDto);
    }
};
exports.DownloadController = DownloadController;
__decorate([
    (0, common_1.Post)('post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [download_dto_1.DownloadDto]),
    __metadata("design:returntype", Promise)
], DownloadController.prototype, "createBackup", null);
__decorate([
    (0, common_1.Post)('check'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DownloadController.prototype, "checkIsPossibleToDownload", null);
__decorate([
    (0, common_1.Post)('openDrive'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DownloadController.prototype, "openDrive", null);
exports.DownloadController = DownloadController = __decorate([
    (0, common_1.Controller)('download'),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [download_service_1.DownloadService,
        ioredis_2.default])
], DownloadController);
//# sourceMappingURL=download.controller.js.map