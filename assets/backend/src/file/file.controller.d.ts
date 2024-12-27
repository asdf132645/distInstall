import { FileService } from './file.service';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    readFile(path: string, filename: string): Promise<any>;
    readFileEUCKR(path: string, filename: string): Promise<any>;
    checkFileExists(directoryPath: string, filename: string): any;
    createDirectory(directoryPath: string): string;
    createFile(body: {
        path: string;
        filename: string;
        content: string;
    }): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    cbcSaveData(body: {
        data: any;
        filePath: string;
    }): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
}
