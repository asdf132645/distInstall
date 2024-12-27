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
exports.CbcController = void 0;
const common_1 = require("@nestjs/common");
const cbc_service_1 = require("./cbc.service");
let CbcController = class CbcController {
    constructor(cbcService) {
        this.cbcService = cbcService;
    }
    getCbcWorkList(spcParams, res) {
        const xmlData = this.cbcService.getMockCbcWorkList();
        res.set('Content-Type', 'application/xml');
        res.send(xmlData);
    }
    getYwmcFakeData(res) {
        const data = this.cbcService.ywmcFakeData();
        res.send(data);
    }
    async getData(query) {
        return await this.cbcService.fetchExternalData(query);
    }
    async executeCurlCommand(body, res) {
        const result = await this.cbcService.executePostCurl(body);
        return res.json(result);
    }
    async sss(body) {
        console.log(body);
        return 'ssssssss';
    }
};
exports.CbcController = CbcController;
__decorate([
    (0, common_1.Get)('/liveTest'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CbcController.prototype, "getCbcWorkList", null);
__decorate([
    (0, common_1.Get)('/ywmcFakeData'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CbcController.prototype, "getYwmcFakeData", null);
__decorate([
    (0, common_1.Get)('/lisCbcMarys'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CbcController.prototype, "getData", null);
__decorate([
    (0, common_1.Post)('/executePostCurl'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CbcController.prototype, "executeCurlCommand", null);
__decorate([
    (0, common_1.Post)('/executePostCurltest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CbcController.prototype, "sss", null);
exports.CbcController = CbcController = __decorate([
    (0, common_1.Controller)('cbc'),
    __metadata("design:paramtypes", [cbc_service_1.CbcService])
], CbcController);
//# sourceMappingURL=cbc.controller.js.map