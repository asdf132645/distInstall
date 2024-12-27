export declare class FileService {
    private readonly possibleExtensions;
    readFile(filePath: string): Promise<any>;
    readFileEUCKR(filePath: string): Promise<any>;
    checkFileExists(directoryPath: string, filename: string): boolean;
    cbcSaveDataService(filePath: string, data: any): Promise<void>;
    private ensureDirectoryExistence;
}
