import { Response } from 'express';
import { ImagesService } from './images.service';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    getImage(folder: string, imageName: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getImageQuality(folder: string, imageName: string, quality: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getPrintImage(folder: string, imageName: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getImageRealTime(folder: string, imageName: string, res: Response): Response<any, Record<string, any>>;
    checkImageExists(folder: string, imageName: string, res: Response): Response<any, Record<string, any>>;
    getImageWbc(folder: string, imageName: string, res: Response): Promise<void>;
    moveImage(sourceFolders: string, destinationFolders: string, imageNames: string, res: Response): Promise<Response<any, Record<string, any>>>;
    moveClassImage(sourceFolders: any, destinationFolders: any, imageNames: any, res: Response): Promise<Response<any, Record<string, any>>>;
    uploadImage(file: any): Promise<{
        imagePath: string;
    }>;
    cropImage(requestBody: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
