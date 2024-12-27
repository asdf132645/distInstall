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
exports.MinCountController = void 0;
const common_1 = require("@nestjs/common");
const minCount_service_1 = require("./minCount.service");
const minCountDto_1 = require("./dto/minCountDto");
let MinCountController = class MinCountController {
    constructor(minCountService) {
        this.minCountService = minCountService;
    }
    async create(createDto) {
        return this.minCountService.create(createDto);
    }
    async update(updateDto) {
        return this.minCountService.update(updateDto);
    }
    async get() {
        return this.minCountService.find();
    }
};
exports.MinCountController = MinCountController;
__decorate([
    (0, common_1.Post)('minCountCreate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [minCountDto_1.CreateMinCountDto]),
    __metadata("design:returntype", Promise)
], MinCountController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('minCountUpdate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [minCountDto_1.CreateMinCountDto]),
    __metadata("design:returntype", Promise)
], MinCountController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('minCountGet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MinCountController.prototype, "get", null);
exports.MinCountController = MinCountController = __decorate([
    (0, common_1.Controller)('minCount'),
    __metadata("design:paramtypes", [minCount_service_1.MinCountService])
], MinCountController);
//# sourceMappingURL=minCount.controller.js.map