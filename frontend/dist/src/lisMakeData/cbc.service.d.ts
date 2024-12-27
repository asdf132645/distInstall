import { LoggerService } from '../logger.service';
export declare class CbcService {
    private readonly logger;
    constructor(logger: LoggerService);
    getMockCbcWorkList(): string;
    ywmcFakeData(): any;
    fetchExternalData(queryParams: {
        [key: string]: string;
    }): Promise<any>;
    executePostCurl(bodyParams: any): Promise<any>;
}
