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
exports.SybaseProxyService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let SybaseProxyService = class SybaseProxyService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getCbcResults(smp_no) {
        const url = `http://localhost:4000/cbc-results?smp_no=${encodeURIComponent(smp_no)}`;
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
        return response.data;
    }
    async saveUimdResult(data) {
        const url = `http://localhost:4000/save-uimd-result`;
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, data));
        return response.data;
    }
    async cbcImgGet(smp_no) {
        const url = `http://localhost:4000/cbcImgGet?smp_no=${encodeURIComponent(smp_no)}`;
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
        return response.data;
    }
    async saveComment(data) {
        const url = `http://localhost:4000/save-comment`;
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, data));
        return response.data;
    }
};
exports.SybaseProxyService = SybaseProxyService;
exports.SybaseProxyService = SybaseProxyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], SybaseProxyService);
//# sourceMappingURL=sybase.proxy.service.js.map