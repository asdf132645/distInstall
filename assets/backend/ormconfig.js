"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeOrmOptions = void 0;
const user_entity_1 = require("./src/user/entities/user.entity");
const cell_entity_1 = require("./src/settings/analysisDatabse/cellImgAnalyzed/entities/cell.entity");
const rbcDegree_entity_1 = require("./src/settings/analysisDatabse/rbcDegree/rbcDegree.entity");
const wbcCustomClass_entity_1 = require("./src/settings/analysisDatabse/wbcCustomClass/wbcCustomClass.entity");
const wbcHotKeys_entity_1 = require("./src/settings/analysisDatabse/wbcHotKeys/wbcHotKeys.entity");
const bfHotKeys_entity_1 = require("./src/settings/analysisDatabse/bhHotKeys/bfHotKeys.entity");
const normalRange_entity_1 = require("./src/settings/analysisDatabse/normalRange/normalRange.entity");
const imagePrint_entity_1 = require("./src/settings/report/imagePrint/imagePrint.entity");
const lisCodeWbc_entity_1 = require("./src/settings/report/lisCode/wbc/lisCodeWbc.entity");
const lisCodeRbc_entity_1 = require("./src/settings/report/lisCode/rbc/lisCodeRbc.entity");
const cbcCode_entity_1 = require("./src/settings/report/cbcCode/cbcCode.entity");
const filePathSetEntity_1 = require("./src/settings/report/filrPathSet/filePathSetEntity");
const wbcRunCount_entity_1 = require("./src/settings/report/runInfoCount/wbcRunCount.entity");
const minCount_entity_1 = require("./src/settings/report/minCount/minCount.entity");
const runingInfo_entity_1 = require("./src/runingInfo/runingInfo.entity");
const classOrder_1 = require("./src/classOrder/classOrder");
const dotenv = require("dotenv");
const device_entity_1 = require("./src/device/device.entity");
const crc_setting_entity_1 = require("./src/settings/report/crc/entities/crc-setting.entity");
const crc_remark_setting_entity_1 = require("./src/settings/report/crc/entities/crc-remark-setting.entity");
const crc_data_setting_entity_1 = require("./src/settings/report/crc/entities/crc-data-setting.entity");
const crc_option_entity_1 = require("./src/settings/report/crc/entities/crc-option.entity");
const crc_reco_entity_1 = require("./src/settings/report/crc/entities/crc_reco.entity");
const crc_comment_entity_1 = require("./src/settings/report/crc/entities/crc-comment.entity");
const crc_save_data_entity_1 = require("./src/settings/report/crc/entities/crc_save_data.entity");
dotenv.config();
const createTypeOrmOptions = async () => {
    const options = {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'uimd5191!',
        database: 'pb_db_web',
        synchronize: false,
        migrations: ['src/migrations/**/*{.ts,.js}'],
        entities: [
            user_entity_1.User,
            cell_entity_1.CellImgAnalyzed,
            rbcDegree_entity_1.RbcDegree,
            wbcCustomClass_entity_1.WbcCustomClass,
            wbcHotKeys_entity_1.WbcHotKeys,
            bfHotKeys_entity_1.BfHotKeys,
            normalRange_entity_1.NormalRange,
            imagePrint_entity_1.ImagePrintEntity,
            lisCodeWbc_entity_1.LisCodeWbcEntity,
            lisCodeRbc_entity_1.LisCodeRbcEntity,
            cbcCode_entity_1.CbcCodeEntity,
            filePathSetEntity_1.FilePathSetEntity,
            wbcRunCount_entity_1.WbcRunCountEntity,
            minCount_entity_1.MinCountEntity,
            runingInfo_entity_1.RuningInfoEntity,
            classOrder_1.ClassOrder,
            device_entity_1.DeviceEntity,
            crc_setting_entity_1.CrcSettingEntity,
            crc_remark_setting_entity_1.CrcRemarkSettingEntity,
            crc_data_setting_entity_1.CrcDataSettingEntity,
            crc_option_entity_1.CrcOption,
            crc_reco_entity_1.CrcRecommendationEntity,
            crc_comment_entity_1.CrcCommentEntity,
            crc_save_data_entity_1.CrcSaveDataEntity,
        ],
        extra: {
            connectionLimit: 20,
            multipleStatements: true,
        },
    };
    return options;
};
exports.createTypeOrmOptions = createTypeOrmOptions;
//# sourceMappingURL=ormconfig.js.map