export declare class FileSystemService {
    createFolder(path: string): Promise<void>;
    deleteFolder(path: string): Promise<void>;
    copyFile(source: string, destination: string): Promise<void>;
    cleanupOldFiles(directoryPath: string, keyword: string): Promise<void>;
    checkFileExistence(directoryPath: string, keyword: string): Promise<boolean>;
    findFilesByString(directoryPath: string, searchString: string): Promise<string[]>;
    function: any;
    getLogs(folderPath: string): any;
}
