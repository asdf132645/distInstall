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
exports.RemainingCountController = void 0;
const common_1 = require("@nestjs/common");
const remaining_count_service_1 = require("./remaining-count.service");
let RemainingCountController = class RemainingCountController {
    constructor(remainingCountService) {
        this.remainingCountService = remainingCountService;
    }
    async executeApplication() {
        try {
            const result = await this.remainingCountService.executeApplication();
            return { message: 'Application executed successfully', result };
        }
        catch (error) {
            return { message: 'Failed to execute application', error };
        }
    }
};
exports.RemainingCountController = RemainingCountController;
__decorate([
    (0, common_1.Get)('execute'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RemainingCountController.prototype, "executeApplication", null);
exports.RemainingCountController = RemainingCountController = __decorate([
    (0, common_1.Controller)('remaining-count'),
    __metadata("design:paramtypes", [remaining_count_service_1.RemainingCountService])
], RemainingCountController);
//# sourceMappingURL=remaining-count.controller.js.map