"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
let BrowserService = class BrowserService {
    closeEdgeBrowser() {
        return new Promise((resolve, reject) => {
            const appPath = `"D:\\UIMD_Data\\UI_ETC\\kill_edge.exe"`;
            const command = `powershell -Command "Start-Process '${appPath}' -Verb RunAs"`;
            (0, child_process_1.exec)(command, (error, stdout, stderr) => {
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
    closeNodeProcesses() {
        return new Promise((resolve, reject) => {
            const command = 'taskkill /IM node.exe /F';
            (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                if (error) {
                    return reject(error);
                }
                console.log(stdout);
                resolve();
            });
        });
    }
    closeAllProcesses() {
        return Promise.all([
            this.closeEdgeBrowser(),
            this.closeNodeProcesses(),
        ]).then(() => { }, (error) => {
            throw new Error(`프로세스 종료 중 오류가 발생했습니다: ${error.message}`);
        });
    }
};
exports.BrowserService = BrowserService;
exports.BrowserService = BrowserService = __decorate([
    (0, common_1.Injectable)()
], BrowserService);
//# sourceMappingURL=browser.service.js.map