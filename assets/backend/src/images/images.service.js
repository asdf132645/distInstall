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
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const Jimp = require("jimp");
let ImagesService = class ImagesService {
    constructor() { }
    async getImageWbc(folder, imageName, res) {
        if (!folder || !imageName) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).send('Invalid parameters');
        }
        const absoluteImagePath = path.join(folder, imageName);
        try {
            fs.accessSync(absoluteImagePath, fs.constants.R_OK);
            const jpegImageBuffer = await this.convertBmpToJpeg(absoluteImagePath);
            res.setHeader('Content-Type', 'image/jpeg');
            res.send(jpegImageBuffer);
        }
        catch (error) {
            res
                .status(common_1.HttpStatus.NOT_FOUND)
                .send('File not found or permission issue');
        }
    }
    async convertBmpToJpeg(absoluteImagePath) {
        return new Promise((resolve, reject) => {
            sharp(absoluteImagePath)
                .jpeg({ quality: 80 })
                .toBuffer((err, buffer) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(buffer);
                }
            });
        });
    }
    async convertImageToJPEG(imagePath) {
        const image = await Jimp.read(imagePath);
        const buffer = await image.quality(60).getBufferAsync(Jimp.MIME_JPEG);
        return buffer;
    }
};
exports.ImagesService = ImagesService;
exports.ImagesService = ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ImagesService);
//# sourceMappingURL=images.service.js.map