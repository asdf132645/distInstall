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
exports.RunningInfoResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const runingInfo_service_1 = require("./runingInfo.service");
const runingInfo_entity_1 = require("./runingInfo.entity");
const ioredis_1 = require("@nestjs-modules/ioredis");
const ioredis_2 = require("ioredis");
const runingInfoDtoItems_1 = require("./dto/runingInfoDtoItems");
let RunningInfoResolver = class RunningInfoResolver {
    constructor(runningInfoService, redis) {
        this.runningInfoService = runningInfoService;
        this.redis = redis;
    }
    async getRunningInfoByIdGQL(id) {
        await this.redis.flushall();
        const runningInfo = await this.runningInfoService.getRunningInfoById(id);
        if (runningInfo) {
            return runningInfo;
        }
        return null;
    }
    async updateRunningInfoGQL(updateDto) {
        await this.redis.flushall();
        return await this.runningInfoService.update(updateDto);
    }
};
exports.RunningInfoResolver = RunningInfoResolver;
__decorate([
    (0, graphql_1.Query)(() => runingInfo_entity_1.RuningInfoEntity),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RunningInfoResolver.prototype, "getRunningInfoByIdGQL", null);
__decorate([
    (0, graphql_1.Mutation)(() => [runingInfo_entity_1.RuningInfoEntity]),
    __param(0, (0, graphql_1.Args)('updateDto', { type: () => runingInfoDtoItems_1.UpdateRuningInfoDto })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [runingInfoDtoItems_1.UpdateRuningInfoDto]),
    __metadata("design:returntype", Promise)
], RunningInfoResolver.prototype, "updateRunningInfoGQL", null);
exports.RunningInfoResolver = RunningInfoResolver = __decorate([
    (0, graphql_1.Resolver)(() => runingInfo_entity_1.RuningInfoEntity),
    __param(1, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [runingInfo_service_1.RuningInfoService,
        ioredis_2.default])
], RunningInfoResolver);
//# sourceMappingURL=runningInfo.resolver.js.map