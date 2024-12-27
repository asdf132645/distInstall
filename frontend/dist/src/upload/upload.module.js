"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const upload_service_1 = require("./upload.service");
const runingInfo_entity_1 = require("../runingInfo/runingInfo.entity");
const upload_controller_1 = require("./upload.controller");
const ioredis_1 = require("@nestjs-modules/ioredis");
const logger_service_1 = require("../logger.service");
const combined_module_1 = require("../combinedProtocol/combined.module");
let UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            combined_module_1.CombinedModule,
            typeorm_1.TypeOrmModule.forFeature([runingInfo_entity_1.RuningInfoEntity]),
            ioredis_1.RedisModule.forRoot({
                type: 'single',
                url: 'redis://localhost:6379',
            }),
        ],
        providers: [upload_service_1.UploadService, logger_service_1.LoggerService],
        controllers: [upload_controller_1.UploadController],
    })
], UploadModule);
//# sourceMappingURL=upload.module.js.map