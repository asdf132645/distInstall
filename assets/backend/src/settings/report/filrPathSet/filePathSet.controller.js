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
exports.FilePathSetController = void 0;
const common_1 = require("@nestjs/common");
const filePathSet_service_1 = require("./filePathSet.service");
const filePathSetDto_1 = require("./dto/filePathSetDto");
let FilePathSetController = class FilePathSetController {
    constructor(filePathSetService) {
        this.filePathSetService = filePathSetService;
    }
    async create(createDto) {
        return this.filePathSetService.create(createDto);
    }
    async update(updateDto) {
        return this.filePathSetService.update(updateDto);
    }
    async get() {
        return this.filePathSetService.find();
    }
};
exports.FilePathSetController = FilePathSetController;
__decorate([
    (0, common_1.Post)('filePathSetCreate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filePathSetDto_1.CreateFilePathSetDto]),
    __metadata("design:returntype", Promise)
], FilePathSetController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('filePathSetUpdate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filePathSetDto_1.CreateFilePathSetDto]),
    __metadata("design:returntype", Promise)
], FilePathSetController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('filePathSetGet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilePathSetController.prototype, "get", null);
exports.FilePathSetController = FilePathSetController = __decorate([
    (0, common_1.Controller)('filePathSet'),
    __metadata("design:paramtypes", [filePathSet_service_1.FilePathSetService])
], FilePathSetController);
//# sourceMappingURL=filePathSet.controller.js.map