import { ExcelService } from './excel.service';
export declare class ExcelController {
    private readonly excelService;
    constructor(excelService: ExcelService);
    executeApplication(body: any): Promise<{
        message: string;
        result: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
        result?: undefined;
    }>;
}
