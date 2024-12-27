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
exports.CrcDataSettingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const crc_data_setting_entity_1 = require("./entities/crc-data-setting.entity");
const ioredis_1 = require("@nestjs-modules/ioredis");
const ioredis_2 = require("ioredis");
let CrcDataSettingService = class CrcDataSettingService {
    constructor(crcDataSettingRepository, redis) {
        this.crcDataSettingRepository = crcDataSettingRepository;
        this.redis = redis;
    }
    async create(createCrcDataSettingDto) {
        const crcDataSetting = this.crcDataSettingRepository.create(createCrcDataSettingDto);
        return this.crcDataSettingRepository.save(crcDataSetting);
    }
    async findAll() {
        return this.crcDataSettingRepository.find();
    }
    async findOne(id) {
        return this.crcDataSettingRepository.findOneBy({ id });
    }
    async remove(id) {
        await this.crcDataSettingRepository.delete(id);
    }
    async update(crcSettingDtos) {
        const updatedEntities = [];
        for (const dto of crcSettingDtos) {
            const crcSetting = await this.crcDataSettingRepository.findOne({
                where: { id: dto.id },
            });
            if (crcSetting) {
                await this.crcDataSettingRepository.save(dto);
                updatedEntities.push(crcSetting);
            }
        }
        await this.redis.flushall();
        return updatedEntities;
    }
};
exports.CrcDataSettingService = CrcDataSettingService;
exports.CrcDataSettingService = CrcDataSettingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(crc_data_setting_entity_1.CrcDataSettingEntity)),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ioredis_2.default])
], CrcDataSettingService);
//# sourceMappingURL=crc-data-setting.service.js.map