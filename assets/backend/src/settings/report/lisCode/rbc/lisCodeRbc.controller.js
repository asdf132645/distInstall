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
exports.LisCodeController = void 0;
const common_1 = require("@nestjs/common");
const lisCodeRbc_service_1 = require("./lisCodeRbc.service");
const lisCodeRbcDto_1 = require("./dto/lisCodeRbcDto");
let LisCodeController = class LisCodeController {
    constructor(lisCode) {
        this.lisCode = lisCode;
    }
    async create(createDto) {
        return this.lisCode.create(createDto);
    }
    async update(updateDto) {
        return this.lisCode.update(updateDto);
    }
    async get() {
        return this.lisCode.find();
    }
};
exports.LisCodeController = LisCodeController;
__decorate([
    (0, common_1.Post)('lisCodeRbcCreate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lisCodeRbcDto_1.CreateLisCodeRbcDto]),
    __metadata("design:returntype", Promise)
], LisCodeController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('lisCodeRbcUpdate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lisCodeRbcDto_1.CreateLisCodeRbcDto]),
    __metadata("design:returntype", Promise)
], LisCodeController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('lisCodeRbcGet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LisCodeController.prototype, "get", null);
exports.LisCodeController = LisCodeController = __decorate([
    (0, common_1.Controller)('lisCodeRbc'),
    __metadata("design:paramtypes", [lisCodeRbc_service_1.LisCodeRbcService])
], LisCodeController);
//# sourceMappingURL=lisCodeRbc.controller.js.map