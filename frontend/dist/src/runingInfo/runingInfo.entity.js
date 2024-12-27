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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuningInfoEntity = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const class_info_1 = require("./types/class-info");
let RuningInfoEntity = class RuningInfoEntity {
};
exports.RuningInfoEntity = RuningInfoEntity;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RuningInfoEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], RuningInfoEntity.prototype, "lock_status", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "traySlot", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "slotNo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "barcodeNo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "patientId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "patientNm", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "birthDay", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "wbcCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "slotId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "orderDttm", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "testType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "analyzedDttm", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "tactTime", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "maxWbcCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], RuningInfoEntity.prototype, "bf_lowPowerPath", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "cassetId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "isNormal", void 0);
__decorate([
    (0, graphql_1.Field)(() => class_info_1.WbcResponse, { nullable: true }),
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", class_info_1.WbcResponse)
], RuningInfoEntity.prototype, "wbcInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => [class_info_1.WbcInfoAfter]),
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], RuningInfoEntity.prototype, "wbcInfoAfter", void 0);
__decorate([
    (0, graphql_1.Field)(() => class_info_1.RbcInfo, { nullable: true }),
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", class_info_1.RbcInfo)
], RuningInfoEntity.prototype, "rbcInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => [class_info_1.RbcAfterClassInfos], { nullable: true }),
    (0, typeorm_1.Column)('json', { nullable: true }),
    __metadata("design:type", Array)
], RuningInfoEntity.prototype, "rbcInfoAfter", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "submitState", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "submitOfDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "submitUserId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], RuningInfoEntity.prototype, "rbcInfoPosAfter", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "isNsNbIntegration", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "wbcMemo", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "rbcMemo", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "pcIp", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "cbcPatientNo", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "cbcPatientNm", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "cbcSex", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "cbcAge", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "img_drive_root_path", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], RuningInfoEntity.prototype, "hosName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", class_info_1.abnormalClassInfo)
], RuningInfoEntity.prototype, "abnormalClassInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], RuningInfoEntity.prototype, "isAllClassesChecked", void 0);
exports.RuningInfoEntity = RuningInfoEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['slotId'])
], RuningInfoEntity);
//# sourceMappingURL=runingInfo.entity.js.map