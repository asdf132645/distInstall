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
exports.ClassOrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const classOrder_1 = require("./classOrder");
let ClassOrderService = class ClassOrderService {
    constructor(classOrderRepository) {
        this.classOrderRepository = classOrderRepository;
    }
    async getClassOrders() {
        const classOrders = await this.classOrderRepository.find();
        return classOrders.map(this.entityToDto);
    }
    async createClassOrder(createDtos) {
        const newClassOrders = [];
        const existingOrder = await this.classOrderRepository.find();
        if (existingOrder.length > 0)
            return;
        for (const item of createDtos) {
            const classOrderEntity = this.classOrderRepository.create({ ...item });
            const createdItem = await this.classOrderRepository.save(classOrderEntity);
            newClassOrders.push(createdItem);
        }
        return newClassOrders;
    }
    async updateClassOrders(newData) {
        const updatedData = [];
        for (const dto of newData) {
            try {
                const existingRecord = await this.classOrderRepository.findOne({
                    where: { abbreviation: dto.abbreviation },
                });
                if (existingRecord) {
                    existingRecord.orderIdx = String(dto.orderIdx);
                    existingRecord.abbreviation = dto.abbreviation;
                    existingRecord.fullNm = dto.fullNm;
                    existingRecord.classId = dto.classId;
                    await this.classOrderRepository.save(existingRecord);
                    updatedData.push(this.entityToDto(existingRecord));
                }
                else {
                    const createdRecord = await this.createClassOrder([dto]);
                    if (createdRecord && createdRecord.length > 0) {
                        updatedData.push(createdRecord[0]);
                    }
                }
            }
            catch (error) {
                console.error(`Failed to process dto with id ${dto.id}:`, error);
            }
        }
        return updatedData;
    }
    entityToDto(classOrder) {
        const { abbreviation, fullNm, orderIdx, classId } = classOrder;
        return {
            abbreviation,
            fullNm,
            orderIdx,
            classId,
        };
    }
};
exports.ClassOrderService = ClassOrderService;
exports.ClassOrderService = ClassOrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(classOrder_1.ClassOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClassOrderService);
//# sourceMappingURL=classOrder.service.js.map