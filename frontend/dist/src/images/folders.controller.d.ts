import { Response } from 'express';
export declare class FoldersController {
    getFilesInFolder(folderPath: string, res: Response): Response<any, Record<string, any>>;
    getFilesInFolderWhole(folderPath: string, res: Response): Response<any, Record<string, any>>;
    checkAndMoveImages(body: {
        folderPath: string;
        wbcInfo: any[];
    }): Promise<{
        message: string;
    }>;
}
