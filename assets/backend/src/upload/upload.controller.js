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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const ioredis_1 = require("@nestjs-modules/ioredis");
const ioredis_2 = require("ioredis");
const upload_dto_1 = require("./upload.dto");
let UploadController = class UploadController {
    constructor(uploadService, redis) {
        this.uploadService = uploadService;
        this.redis = redis;
    }
    async executeSql(body) {
        await this.redis.flushall();
        await this.uploadService.uploadOperation(body);
        return { message: 'SQL file executed successfully' };
    }
    async checkDuplicatedData(body) {
        return await this.uploadService.checkDuplicatedData(body);
    }
    async checkPossibleUploadFile(body) {
        return await this.uploadService.checkPossibleUploadFile(body);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('execute'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_dto_1.UploadDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "executeSql", null);
__decorate([
    (0, common_1.Post)('checkDuplicatedData'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_dto_1.UploadDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "checkDuplicatedData", null);
__decorate([
    (0, common_1.Post)('checkPossibleUploadFile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "checkPossibleUploadFile", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [upload_service_1.UploadService,
        ioredis_2.default])
], UploadController);
//# sourceMappingURL=upload.controller.js.map