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
exports.BrowserController = void 0;
const common_1 = require("@nestjs/common");
const browser_service_1 = require("./browser.service");
let BrowserController = class BrowserController {
    constructor(browserService) {
        this.browserService = browserService;
    }
    async closeEdgeBrowser() {
        try {
            await this.browserService.closeEdgeBrowser();
            return 'Edge 브라우저가 종료되었습니다.';
        }
        catch (error) {
            return `Edge 브라우저 종료 중 오류가 발생했습니다: ${error.message}`;
        }
    }
    async closeNodeProcesses() {
        try {
            await this.browserService.closeNodeProcesses();
            return '모든 node.exe 프로세스가 종료되었습니다.';
        }
        catch (error) {
            return `node.exe 프로세스 종료 중 오류가 발생했습니다: ${error.message}`;
        }
    }
    async closeAllProcesses() {
        try {
            await this.browserService.closeAllProcesses();
            return 'Edge 브라우저와 모든 node.exe 프로세스가 종료되었습니다.';
        }
        catch (error) {
            return `프로세스 종료 중 오류가 발생했습니다: ${error.message}`;
        }
    }
};
exports.BrowserController = BrowserController;
__decorate([
    (0, common_1.Get)('close-edge'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BrowserController.prototype, "closeEdgeBrowser", null);
__decorate([
    (0, common_1.Get)('close-node'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BrowserController.prototype, "closeNodeProcesses", null);
__decorate([
    (0, common_1.Get)('close-all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BrowserController.prototype, "closeAllProcesses", null);
exports.BrowserController = BrowserController = __decorate([
    (0, common_1.Controller)('browser'),
    __metadata("design:paramtypes", [browser_service_1.BrowserService])
], BrowserController);
//# sourceMappingURL=browser.controller.js.map