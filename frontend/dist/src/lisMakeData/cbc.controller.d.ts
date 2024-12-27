import { CbcService } from './cbc.service';
import { Response } from 'express';
export declare class CbcController {
    private readonly cbcService;
    constructor(cbcService: CbcService);
    getCbcWorkList(spcParams: any, res: Response): void;
    getYwmcFakeData(res: Response): void;
    getData(query: {
        [key: string]: string;
    }): Promise<any>;
    executeCurlCommand(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    sss(body: any): Promise<string>;
}
