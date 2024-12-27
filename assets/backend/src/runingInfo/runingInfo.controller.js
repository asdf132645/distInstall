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
exports.RuningInfoController = void 0;
const common_1 = require("@nestjs/common");
const runingInfo_service_1 = require("./runingInfo.service");
const runingInfoDtoItems_1 = require("./dto/runingInfoDtoItems");
const moment = require("moment");
const cache_interceptor_1 = require("../cache/cache.interceptor");
const ioredis_1 = require("@nestjs-modules/ioredis");
const ioredis_2 = require("ioredis");
let RuningInfoController = class RuningInfoController {
    constructor(runingInfoService, redis) {
        this.runingInfoService = runingInfoService;
        this.redis = redis;
    }
    async getPageUpDown(id, type, dayQuery, nrCount, titles, startDay, endDay, barcodeNo, testType) {
        const startDate = startDay ? moment(startDay).toDate() : undefined;
        const endDate = endDay ? moment(endDay).toDate() : undefined;
        let titlesArray;
        if (titles) {
            titlesArray = titles.split(',');
        }
        await this.redis.del(dayQuery);
        return this.runingInfoService.getUpDownRunnInfo(Number(id), type, nrCount, titlesArray, startDate, endDate, barcodeNo, testType);
    }
    async clearPcIpAndState(oldPcIp, dayQuery) {
        await this.redis.del(dayQuery);
        await this.runingInfoService.clearPcIpAndState(oldPcIp);
    }
    async updatePcIpAndState(oldPcIp, newEntityId, newPcIp, dayQuery) {
        await this.redis.del(dayQuery);
        await this.runingInfoService.updatePcIpAndState(oldPcIp, newEntityId, newPcIp);
    }
    async create(createDto) {
        await this.redis.flushall();
        const slotId = createDto.runingInfoDtoItems.slotId;
        const existingEntity = await this.runingInfoService.findBySlotNo(slotId);
        if (existingEntity) {
            console.log(`중복된 slotId: ${slotId}가 이미 존재합니다..`);
            return null;
        }
        const createdEntity = await this.runingInfoService.create(createDto);
        return createdEntity;
    }
    async deleteMultiple(req) {
        await this.runingInfoService.redisAllClear();
        const result = await this.runingInfoService.delete(req.ids, req.img_drive_root_path);
        return { success: result };
    }
    async update(updateDto) {
        await this.redis.del(updateDto?.dayQuery);
        const updatedEntities = await this.runingInfoService.update(updateDto);
        await this.redis.flushall();
        return updatedEntities;
    }
    async getRunningInfoById(id) {
        return this.runingInfoService.getRunningInfoById(Number(id));
    }
    async getRunningInfoDetailById(id) {
        return this.runingInfoService.getRunningInfoClassDetail(Number(id));
    }
    async getRunningInfoClassInfoByIdDetail(id) {
        return this.runingInfoService.getRunningInfoClassInfo(Number(id));
    }
    async getRunningInfoClassInfoMenuByIdDetail(id) {
        return this.runingInfoService.getRunningInfoClassInfoMenu(Number(id));
    }
    async removePageAllDataApi() {
        await this.redis.flushall();
    }
    async findAllWithPagingAndFilter(page = 1, pageSize = 10, startDay, endDay, barcodeNo, patientId, patientNm, nrCount, titles, testType, wbcCountOrder) {
        const startDate = startDay ? moment(startDay).toDate() : undefined;
        const endDate = endDay ? moment(endDay).toDate() : undefined;
        let titlesArray;
        if (titles) {
            titlesArray = titles.split(',');
        }
        const result = await this.runingInfoService.findAllWithPagingAndFilter(page, pageSize, startDate, endDate, barcodeNo, patientId, patientNm, nrCount, titlesArray, testType, wbcCountOrder);
        return { data: result.data, total: result.total, page };
    }
};
exports.RuningInfoController = RuningInfoController;
__decorate([
    (0, common_1.Get)('pageUpDown'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('dayQuery')),
    __param(3, (0, common_1.Query)('nrCount')),
    __param(4, (0, common_1.Query)('title')),
    __param(5, (0, common_1.Query)('startDay')),
    __param(6, (0, common_1.Query)('endDay')),
    __param(7, (0, common_1.Query)('barcodeNo')),
    __param(8, (0, common_1.Query)('testType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "getPageUpDown", null);
__decorate([
    (0, common_1.Get)('clearPcIpState'),
    __param(0, (0, common_1.Query)('oldPcIp')),
    __param(1, (0, common_1.Query)('dayQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "clearPcIpAndState", null);
__decorate([
    (0, common_1.Get)('updatePcIpState'),
    __param(0, (0, common_1.Query)('oldPcIp')),
    __param(1, (0, common_1.Query)('newEntityId')),
    __param(2, (0, common_1.Query)('newPcIp')),
    __param(3, (0, common_1.Query)('dayQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, String]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "updatePcIpAndState", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [runingInfoDtoItems_1.CreateRuningInfoDto]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "deleteMultiple", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [runingInfoDtoItems_1.UpdateRuningInfoDto]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('detail/:id'),
    (0, common_1.UseInterceptors)(cache_interceptor_1.RedisCacheInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "getRunningInfoById", null);
__decorate([
    (0, common_1.Get)('classInfoDetail/:id'),
    (0, common_1.UseInterceptors)(cache_interceptor_1.RedisCacheInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "getRunningInfoDetailById", null);
__decorate([
    (0, common_1.Get)('classInfoDetailSelectQuery/:id'),
    (0, common_1.UseInterceptors)(cache_interceptor_1.RedisCacheInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "getRunningInfoClassInfoByIdDetail", null);
__decorate([
    (0, common_1.Get)('classInfoMenuDetailSelectQuery/:id'),
    (0, common_1.UseInterceptors)(cache_interceptor_1.RedisCacheInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "getRunningInfoClassInfoMenuByIdDetail", null);
__decorate([
    (0, common_1.Get)('removePageAllData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "removePageAllDataApi", null);
__decorate([
    (0, common_1.Get)('getAll'),
    (0, common_1.UseInterceptors)(cache_interceptor_1.RedisCacheInterceptor),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('startDay')),
    __param(3, (0, common_1.Query)('endDay')),
    __param(4, (0, common_1.Query)('barcodeNo')),
    __param(5, (0, common_1.Query)('patientId')),
    __param(6, (0, common_1.Query)('patientNm')),
    __param(7, (0, common_1.Query)('nrCount')),
    __param(8, (0, common_1.Query)('title')),
    __param(9, (0, common_1.Query)('testType')),
    __param(10, (0, common_1.Query)('wbcCountOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], RuningInfoController.prototype, "findAllWithPagingAndFilter", null);
exports.RuningInfoController = RuningInfoController = __decorate([
    (0, common_1.Controller)('runningInfo'),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [runingInfo_service_1.RuningInfoService,
        ioredis_2.default])
], RuningInfoController);
//# sourceMappingURL=runingInfo.controller.js.map