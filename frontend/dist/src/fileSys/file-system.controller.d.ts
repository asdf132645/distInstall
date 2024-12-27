import { FileSystemService } from './file-system.service';
export declare class FileSystemController {
    private readonly fileSystemService;
    constructor(fileSystemService: FileSystemService);
    createFolder(body: {
        path: string;
    }): Promise<string>;
    deleteFolder(body: {
        path: string;
    }): Promise<string>;
    copyFile(body: {
        source: string;
        destination: string;
    }): Promise<{
        message: string;
    }>;
    cleanupFiles(body: {
        directoryPath: string;
        keyword: string;
    }): Promise<string>;
    checkFile(body: {
        directoryPath: string;
        keyword: string;
    }): Promise<string>;
    getFiles(directoryPath: string, searchString: string): Promise<string[]>;
    getLogs(folderPath: string): any;
}
