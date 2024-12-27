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
exports.FolderController = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const os = require("os");
let FolderController = class FolderController {
    getDrives() {
        try {
            const drives = os.platform() === 'win32'
                ? this.getWindowsDrives()
                : this.getUnixLikeDrives();
            return drives.filter((drive) => !!drive);
        }
        catch (error) {
            throw new Error(`Failed to get drives: ${error.message}`);
        }
    }
    getWindowsDrives() {
        try {
            const powershellOutput = (0, child_process_1.execSync)('powershell -Command "Get-PSDrive -PSProvider FileSystem | Select-Object -ExpandProperty Root"').toString();
            const driveLetters = powershellOutput
                .split('\r\n')
                .filter((line) => line.trim() !== '');
            const convertedDriveLetters = driveLetters.map((letter) => letter.replaceAll('\\', ''));
            return convertedDriveLetters;
        }
        catch (error) {
            throw new Error(`Failed to get Windows drives: ${error.message}`);
        }
    }
    getUnixLikeDrives() {
        return ['/'];
    }
};
exports.FolderController = FolderController;
__decorate([
    (0, common_1.Get)('drives'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], FolderController.prototype, "getDrives", null);
exports.FolderController = FolderController = __decorate([
    (0, common_1.Controller)('folder')
], FolderController);
//# sourceMappingURL=drivesFolderController.js.map