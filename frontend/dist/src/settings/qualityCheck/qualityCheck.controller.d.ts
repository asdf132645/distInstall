import { QualityCheckService } from './qualityCheck.service';
export declare class QualityCheckController {
    private readonly qualityCheckService;
    constructor(qualityCheckService: QualityCheckService);
    executeApplication(): Promise<{
        message: string;
        result: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
        result?: undefined;
    }>;
}
