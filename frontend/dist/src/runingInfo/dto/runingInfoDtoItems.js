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
exports.UpdateRuningInfoDto = exports.CreateRuningInfoDto = exports.RuningInfoDtoItems = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const graphql_1 = require("@nestjs/graphql");
const class_info_1 = require("../types/class-info");
const UpdateRuningInfoDtoItems_1 = require("./UpdateRuningInfoDtoItems");
let RuningInfoDtoItems = class RuningInfoDtoItems {
};
exports.RuningInfoDtoItems = RuningInfoDtoItems;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], RuningInfoDtoItems.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], RuningInfoDtoItems.prototype, "lock_status", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "traySlot", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "slotNo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "barcodeNo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "patientId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "patientNm", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "birthDay", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "wbcCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "slotId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "orderDttm", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "testType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "analyzedDttm", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "tactTime", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "maxWbcCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], RuningInfoDtoItems.prototype, "bf_lowPowerPath", void 0);
__decorate([
    (0, graphql_1.Field)(() => class_info_1.WbcResponse, { nullable: 'itemsAndList' }),
    __metadata("design:type", class_info_1.WbcResponse)
], RuningInfoDtoItems.prototype, "wbcInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => [class_info_1.WbcInfoAfter], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], RuningInfoDtoItems.prototype, "wbcInfoAfter", void 0);
__decorate([
    (0, graphql_1.Field)(() => class_info_1.RbcInfo, { nullable: true }),
    __metadata("design:type", class_info_1.RbcInfo)
], RuningInfoDtoItems.prototype, "rbcInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => [class_info_1.RbcAfterClassInfos], { nullable: true }),
    __metadata("design:type", Array)
], RuningInfoDtoItems.prototype, "rbcInfoAfter", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "cassetId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "isNormal", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "submitState", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "submitOfDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "submitUserId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], RuningInfoDtoItems.prototype, "classificationResult", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "isNsNbIntegration", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "wbcMemo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "rbcMemo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "pcIp", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "cbcPatientNo", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "cbcPatientNm", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "cbcSex", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "cbcAge", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "img_drive_root_path", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], RuningInfoDtoItems.prototype, "hosName", void 0);
__decorate([
    (0, graphql_1.Field)(() => class_info_1.abnormalClassInfo, { nullable: true }),
    __metadata("design:type", class_info_1.abnormalClassInfo)
], RuningInfoDtoItems.prototype, "abnormalClassInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], RuningInfoDtoItems.prototype, "isAllClassesChecked", void 0);
exports.RuningInfoDtoItems = RuningInfoDtoItems = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, graphql_1.InputType)()
], RuningInfoDtoItems);
let CreateRuningInfoDto = class CreateRuningInfoDto {
};
exports.CreateRuningInfoDto = CreateRuningInfoDto;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateRuningInfoDto.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => RuningInfoDtoItems),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RuningInfoDtoItems),
    __metadata("design:type", RuningInfoDtoItems)
], CreateRuningInfoDto.prototype, "runingInfoDtoItems", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateRuningInfoDto.prototype, "dayQuery", void 0);
exports.CreateRuningInfoDto = CreateRuningInfoDto = __decorate([
    (0, graphql_1.InputType)()
], CreateRuningInfoDto);
let UpdateRuningInfoDto = class UpdateRuningInfoDto {
};
exports.UpdateRuningInfoDto = UpdateRuningInfoDto;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateRuningInfoDto.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateRuningInfoDto.prototype, "dayQuery", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, graphql_1.Field)(() => [UpdateRuningInfoDtoItems_1.UpdateRuningInfoDtoItems], { nullable: 'itemsAndList' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdateRuningInfoDtoItems_1.UpdateRuningInfoDtoItems),
    __metadata("design:type", Array)
], UpdateRuningInfoDto.prototype, "runingInfoDtoItems", void 0);
exports.UpdateRuningInfoDto = UpdateRuningInfoDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateRuningInfoDto);
//# sourceMappingURL=runingInfoDtoItems.js.map