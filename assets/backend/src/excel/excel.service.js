"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
let ExcelService = class ExcelService {
    executeApplication(filesPath) {
        return new Promise((resolve, reject) => {
            const baseUrl = 'D:\\UIMD_get_confusion_matrix\\Get_Confusion_Matrix\\Get_Confusion_Matrix.exe';
            const execDir = 'D:/UIMD_get_confusion_matrix/Get_Confusion_Matrix';
            const filesUrl = filesPath.join(' ');
            (0, child_process_1.exec)(`${baseUrl} ${filesUrl}`, { cwd: execDir }, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error: ${error.message}`);
                }
                else if (stderr) {
                    reject(`Stderr: ${stderr}`);
                }
                else {
                    resolve(`Stdout: ${stdout}`);
                }
            });
        });
    }
};
exports.ExcelService = ExcelService;
exports.ExcelService = ExcelService = __decorate([
    (0, common_1.Injectable)()
], ExcelService);
//# sourceMappingURL=excel.service.js.map