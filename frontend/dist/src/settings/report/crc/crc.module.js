"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrcModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crc_setting_service_1 = require("./crc-setting.service");
const crc_data_setting_service_1 = require("./crc-data-setting.service");
const crc_remark_setting_service_1 = require("./crc-remark-setting.service");
const crc_setting_controller_1 = require("./crc-setting.controller");
const crc_data_setting_controller_1 = require("./crc-data-setting.controller");
const crc_remark_setting_controller_1 = require("./crc-remark-setting.controller");
const crc_setting_entity_1 = require("./entities/crc-setting.entity");
const crc_data_setting_entity_1 = require("./entities/crc-data-setting.entity");
const crc_remark_setting_entity_1 = require("./entities/crc-remark-setting.entity");
const crc_option_entity_1 = require("./entities/crc-option.entity");
const crc_option_controller_1 = require("./crc-option.controller");
const crc_option_service_1 = require("./crc-option.service");
const crc_reco_controller_1 = require("./crc_reco.controller");
const crc_reco_entity_1 = require("./entities/crc_reco.entity");
const crc_reco_service_1 = require("./crc_reco.service");
const crc_comment_entity_1 = require("./entities/crc-comment.entity");
const crc_comment_setting_controller_1 = require("./crc-comment-setting.controller");
const crc_comment_setting_service_1 = require("./crc-comment-setting.service");
const crc_save_data_entity_1 = require("./entities/crc_save_data.entity");
const crc_save_data_controller_1 = require("./crc_save_data.controller");
const crc_save_data_service_1 = require("./crc_save_data.service");
let CrcModule = class CrcModule {
};
exports.CrcModule = CrcModule;
exports.CrcModule = CrcModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                crc_setting_entity_1.CrcSettingEntity,
                crc_data_setting_entity_1.CrcDataSettingEntity,
                crc_remark_setting_entity_1.CrcRemarkSettingEntity,
                crc_option_entity_1.CrcOption,
                crc_reco_entity_1.CrcRecommendationEntity,
                crc_comment_entity_1.CrcCommentEntity,
                crc_save_data_entity_1.CrcSaveDataEntity,
            ]),
        ],
        controllers: [
            crc_setting_controller_1.CrcSettingController,
            crc_data_setting_controller_1.CrcDataSettingController,
            crc_remark_setting_controller_1.CrcRemarkSettingController,
            crc_option_controller_1.CrcOptionController,
            crc_reco_controller_1.CrcRecommendationSettingController,
            crc_comment_setting_controller_1.CrcCommentSettingController,
            crc_save_data_controller_1.CrcSaveDataController,
        ],
        providers: [
            crc_setting_service_1.CrcSettingService,
            crc_data_setting_service_1.CrcDataSettingService,
            crc_remark_setting_service_1.CrcRemarkSettingService,
            crc_option_service_1.CrcOptionService,
            crc_reco_service_1.CrcRecommendationService,
            crc_comment_setting_service_1.CrcCommentSettingService,
            crc_save_data_service_1.CrcSaveDataService,
        ],
    })
], CrcModule);
//# sourceMappingURL=crc.module.js.map