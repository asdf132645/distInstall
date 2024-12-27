"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const ormconfig_1 = require("../ormconfig");
const user_module_1 = require("./user/user.module");
const cell_module_1 = require("./settings/analysisDatabse/cellImgAnalyzed/cell.module");
const rbcDegree_module_1 = require("./settings/analysisDatabse/rbcDegree/rbcDegree.module");
const wbcCustomClass_module_1 = require("./settings/analysisDatabse/wbcCustomClass/wbcCustomClass.module");
const wbcHotKeys_module_1 = require("./settings/analysisDatabse/wbcHotKeys/wbcHotKeys.module");
const normalRange_module_1 = require("./settings/analysisDatabse/normalRange/normalRange.module");
const bfHotKeys_module_1 = require("./settings/analysisDatabse/bhHotKeys/bfHotKeys.module");
const imagePrint_module_1 = require("./settings/report/imagePrint/imagePrint.module");
const lisCodeWbc_module_1 = require("./settings/report/lisCode/wbc/lisCodeWbc.module");
const lisCodeRbc_module_1 = require("./settings/report/lisCode/rbc/lisCodeRbc.module");
const cbcCode_module_1 = require("./settings/report/cbcCode/cbcCode.module");
const filePathSetModule_1 = require("./settings/report/filrPathSet/filePathSetModule");
const wbcRunCount_module_1 = require("./settings/report/runInfoCount/wbcRunCount.module");
const jsonReader_module_1 = require("./jsonReader/jsonReader.module");
const minCount_module_1 = require("./settings/report/minCount/minCount.module");
const runingInfo_module_1 = require("./runingInfo/runingInfo.module");
const images_controller_1 = require("./images/images.controller");
const excel_service_1 = require("./excel/excel.service");
const excel_controller_1 = require("./excel/excel.controller");
const http_exception_filter_1 = require("./utils/http-exception.filter");
const response_interceptor_1 = require("./utils/response.interceptor");
const combined_module_1 = require("./combinedProtocol/combined.module");
const logger_service_1 = require("./logger.service");
const drivesFolderController_1 = require("./drivesFolder/drivesFolderController");
const folders_controller_1 = require("./images/folders.controller");
const pdf_controller_1 = require("./pdfDown/pdf.controller");
const file_system_controller_1 = require("./fileSys/file-system.controller");
const file_system_service_1 = require("./fileSys/file-system.service");
const ipService_module_1 = require("./ipService/ipService.module");
const classOrder_module_1 = require("./classOrder/classOrder.module");
const dziReader_module_1 = require("./dziReader/dziReader.module");
const file_module_1 = require("./file/file.module");
const images_service_1 = require("./images/images.service");
const hl7_module_1 = require("./hl7/hl7.module");
const device_module_1 = require("./device/device.module");
const download_module_1 = require("./download/download.module");
const remaining_count_controller_1 = require("./settings/analysisDatabse/deviceController/remaining-count.controller");
const remaining_count_service_1 = require("./settings/analysisDatabse/deviceController/remaining-count.service");
const qualityCheck_service_1 = require("./settings/qualityCheck/qualityCheck.service");
const qualityCheck_controller_1 = require("./settings/qualityCheck/qualityCheck.controller");
const browser_module_1 = require("./browserExit/browser.module");
const upload_module_1 = require("./upload/upload.module");
const cbc_module_1 = require("./lisMakeData/cbc.module");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const crc_module_1 = require("./settings/report/crc/crc.module");
const axios_1 = require("@nestjs/axios");
const sybase_controller_1 = require("./sybase/sybase.controller");
const sybase_proxy_service_1 = require("./sybase/sybase.proxy.service");
const graphql_type_json_1 = require("graphql-type-json");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: ormconfig_1.createTypeOrmOptions,
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: 'src/schema.gql',
                playground: true,
                path: 'api/graphql',
                resolvers: { JSON: graphql_type_json_1.default },
            }),
            axios_1.HttpModule,
            user_module_1.UserModule,
            cell_module_1.CellImgAnalyzedModule,
            rbcDegree_module_1.RbcDegreeModule,
            wbcCustomClass_module_1.WbcCustomClassModule,
            wbcHotKeys_module_1.WbcHotKeysModule,
            normalRange_module_1.NormalRangeModule,
            bfHotKeys_module_1.BfHotKeysModule,
            imagePrint_module_1.ImagePrintModule,
            lisCodeWbc_module_1.LisCodeWbcModule,
            lisCodeRbc_module_1.LisCodeRbcModule,
            cbcCode_module_1.CbcCodeModule,
            filePathSetModule_1.FilePathSetModule,
            wbcRunCount_module_1.WbcRunCountModule,
            jsonReader_module_1.JsonReaderModule,
            minCount_module_1.MinCountModule,
            runingInfo_module_1.RuningInfoModule,
            combined_module_1.CombinedModule,
            ipService_module_1.IpModule,
            classOrder_module_1.ClassOrderModule,
            dziReader_module_1.DziReaderModule,
            file_module_1.FileModule,
            hl7_module_1.Hl7Module,
            device_module_1.DeviceModule,
            download_module_1.DownloadModule,
            browser_module_1.BrowserModule,
            upload_module_1.UploadModule,
            cbc_module_1.CbcModule,
            crc_module_1.CrcModule,
        ],
        controllers: [
            app_controller_1.AppController,
            drivesFolderController_1.FolderController,
            images_controller_1.ImagesController,
            folders_controller_1.FoldersController,
            pdf_controller_1.PdfController,
            file_system_controller_1.FileSystemController,
            remaining_count_controller_1.RemainingCountController,
            qualityCheck_controller_1.QualityCheckController,
            excel_controller_1.ExcelController,
            sybase_controller_1.SybaseController,
        ],
        providers: [
            logger_service_1.LoggerService,
            app_service_1.AppService,
            file_system_service_1.FileSystemService,
            images_service_1.ImagesService,
            remaining_count_service_1.RemainingCountService,
            qualityCheck_service_1.QualityCheckService,
            excel_service_1.ExcelService,
            sybase_proxy_service_1.SybaseProxyService,
            {
                provide: 'APP_FILTER',
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_interceptor_1.ResponseInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map