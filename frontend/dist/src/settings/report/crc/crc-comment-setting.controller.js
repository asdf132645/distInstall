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
exports.CrcCommentSettingController = void 0;
const common_1 = require("@nestjs/common");
const crc_comment_setting_service_1 = require("./crc-comment-setting.service");
const crc_comment_setting_dto_1 = require("./dto/crc-comment-setting.dto");
let CrcCommentSettingController = class CrcCommentSettingController {
    constructor(crcCommentSettingService) {
        this.crcCommentSettingService = crcCommentSettingService;
    }
    create(createCrcCommentDto) {
        return this.crcCommentSettingService.create(createCrcCommentDto);
    }
    findAll() {
        return this.crcCommentSettingService.findAll();
    }
    find(code, CommentAllContent) {
        {
            return this.crcCommentSettingService.findByCodeOrCommentAllContent(code, CommentAllContent);
        }
    }
    findOne(id) {
        return this.crcCommentSettingService.findOne(+id);
    }
    remove(id) {
        return this.crcCommentSettingService.remove(+id);
    }
    update(updateCrcSettingDtos) {
        return this.crcCommentSettingService.update(updateCrcSettingDtos);
    }
};
exports.CrcCommentSettingController = CrcCommentSettingController;
__decorate([
    (0, common_1.Post)('crcCommentCreate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crc_comment_setting_dto_1.CreateCrcCommentDto]),
    __metadata("design:returntype", void 0)
], CrcCommentSettingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('crcCommentFindAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CrcCommentSettingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('crcCommentSearch'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('CommentAllContent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CrcCommentSettingController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CrcCommentSettingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)('crcCommentRemove'),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CrcCommentSettingController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)('crcCommentUpdate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], CrcCommentSettingController.prototype, "update", null);
exports.CrcCommentSettingController = CrcCommentSettingController = __decorate([
    (0, common_1.Controller)('crc-comment-setting'),
    __metadata("design:paramtypes", [crc_comment_setting_service_1.CrcCommentSettingService])
], CrcCommentSettingController);
//# sourceMappingURL=crc-comment-setting.controller.js.map