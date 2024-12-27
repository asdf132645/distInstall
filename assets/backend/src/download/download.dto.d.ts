export declare class DownloadDto {
    startDate: string;
    endDate: string;
    destinationDownloadPath: string;
    originDownloadPath: string;
    downloadType: 'copy' | 'move';
    projectType: 'bm' | 'pb';
    dayQuery: any;
    deleteFileNames: string[];
    apiUrl: string;
}
export declare class DownloadReturn {
    success: boolean;
    message: string;
}
