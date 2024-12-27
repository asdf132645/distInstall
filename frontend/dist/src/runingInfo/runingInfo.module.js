"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuningInfoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const runingInfo_entity_1 = require("./runingInfo.entity");
const runingInfo_service_1 = require("./runingInfo.service");
const runingInfo_controller_1 = require("./runingInfo.controller");
const logger_service_1 = require("../logger.service");
const ioredis_1 = require("@nestjs-modules/ioredis");
const runningInfo_resolver_1 = require("./runningInfo.resolver");
let RuningInfoModule = class RuningInfoModule {
};
exports.RuningInfoModule = RuningInfoModule;
exports.RuningInfoModule = RuningInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([runingInfo_entity_1.RuningInfoEntity]),
            ioredis_1.RedisModule.forRoot({
                type: 'single',
                url: 'redis://localhost:6379',
            }),
        ],
        providers: [runingInfo_service_1.RuningInfoService, runningInfo_resolver_1.RunningInfoResolver, logger_service_1.LoggerService],
        exports: [runingInfo_service_1.RuningInfoService, runningInfo_resolver_1.RunningInfoResolver],
        controllers: [runingInfo_controller_1.RuningInfoController],
    })
], RuningInfoModule);
//# sourceMappingURL=runingInfo.module.js.map