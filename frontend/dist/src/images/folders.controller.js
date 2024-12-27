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
exports.FoldersController = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const fs_extra_1 = require("fs-extra");
let FoldersController = class FoldersController {
    getFilesInFolder(folderPath, res) {
        if (!folderPath) {
            return res.status(200).send({
                success: false,
                code: 400,
                message: '폴더 못찾음.',
            });
        }
        try {
            const fullPath = path.join(folderPath);
            const stats = fs.statSync(fullPath);
            if (stats.isDirectory()) {
                const files = fs.readdirSync(fullPath);
                res.status(common_1.HttpStatus.OK).json(files);
            }
            else if (stats.isFile()) {
                const fileStream = fs.createReadStream(fullPath);
                fileStream.pipe(res);
            }
            else {
                return res.status(200).send({
                    success: false,
                    code: 400,
                    message: '잘못된 경로입니다.',
                });
            }
        }
        catch (error) {
            return res.status(200).send({
                success: false,
                code: 400,
                message: '파일 또는 폴더를 찾을 수 없습니다.',
            });
        }
    }
    getFilesInFolderWhole(folderPath, res) {
        if (!folderPath) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .send('폴더를 찾을 수 없습니다.');
        }
        try {
            const fullPath = path.join(folderPath);
            const stats = fs.statSync(fullPath);
            if (stats.isDirectory()) {
                const files = fs.readdirSync(fullPath);
                res.status(common_1.HttpStatus.OK).json(files);
            }
            else if (stats.isFile()) {
                const fileExtension = path.extname(fullPath).toLowerCase();
                if (['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.gif', '.bmp'].includes(fileExtension)) {
                    try {
                        const optimizedStream = sharp(fullPath, { limitInputPixels: false })
                            .toFormat('webp')
                            .jpeg({ quality: 30 });
                        optimizedStream
                            .on('error', () => {
                            res
                                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                                .send('이미지 처리 중 오류가 발생했습니다.');
                        })
                            .pipe(res);
                    }
                    catch (sharpError) {
                        res
                            .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                            .send('이미지 처리 중 오류가 발생했습니다.');
                    }
                }
                else {
                    const fileStream = fs.createReadStream(fullPath);
                    fileStream.pipe(res);
                }
            }
            else {
                res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send('잘못된 경로입니다.');
            }
        }
        catch (error) {
            console.error(error);
            res
                .status(common_1.HttpStatus.NOT_FOUND)
                .send('파일 또는 폴더를 찾을 수 없습니다.');
        }
    }
    async checkAndMoveImages(body) {
        const { folderPath, wbcInfo } = body;
        try {
            for (const item of wbcInfo) {
                const folderName = `${item.id}_${item.title}`;
                const sourceFolderPath = path.join(folderPath, folderName);
                if (!fs.existsSync(sourceFolderPath)) {
                    continue;
                }
                const files = await (0, fs_extra_1.readdir)(sourceFolderPath);
                const validFileNames = new Set(item.images.map((img) => img.fileName));
                for (const fileName of files) {
                    const sourceFilePath = path.join(sourceFolderPath, fileName);
                    if (!validFileNames.has(fileName)) {
                        const destinationFolder = wbcInfo.find((info) => info.images.some((img) => img.fileName === fileName));
                        if (destinationFolder) {
                            const destinationFolderName = `${destinationFolder.id}_${destinationFolder.title}`;
                            const destinationFolderPath = path.join(folderPath, destinationFolderName);
                            if (!fs.existsSync(destinationFolderPath)) {
                                await (0, fs_extra_1.mkdir)(destinationFolderPath, { recursive: true });
                            }
                            const destinationFilePath = path.join(destinationFolderPath, fileName);
                            console.log(`Moving file from ${sourceFilePath} to ${destinationFilePath}`);
                            await (0, fs_extra_1.rename)(sourceFilePath, destinationFilePath);
                            console.log(`File ${fileName} moved to ${destinationFolderPath}`);
                        }
                        else {
                        }
                    }
                    else {
                    }
                }
            }
            return { message: 'Files checked and moved successfully.' };
        }
        catch (error) {
            console.log('Error:', error.message);
        }
    }
};
exports.FoldersController = FoldersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('folderPath')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "getFilesInFolder", null);
__decorate([
    (0, common_1.Get)('getFilesInFolderWhole'),
    __param(0, (0, common_1.Query)('folderPath')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FoldersController.prototype, "getFilesInFolderWhole", null);
__decorate([
    (0, common_1.Post)('check-and-move-images'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FoldersController.prototype, "checkAndMoveImages", null);
exports.FoldersController = FoldersController = __decorate([
    (0, common_1.Controller)('folders')
], FoldersController);
//# sourceMappingURL=folders.controller.js.map