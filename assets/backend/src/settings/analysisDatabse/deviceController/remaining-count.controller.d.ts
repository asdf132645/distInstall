import { RemainingCountService } from './remaining-count.service';
export declare class RemainingCountController {
    private readonly remainingCountService;
    constructor(remainingCountService: RemainingCountService);
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
