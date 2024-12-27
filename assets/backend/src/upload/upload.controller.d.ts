import { UploadService } from './upload.service';
import Redis from 'ioredis';
import { UploadDto } from './upload.dto';
export declare class UploadController {
    private readonly uploadService;
    private readonly redis;
    constructor(uploadService: UploadService, redis: Redis);
    executeSql(body: UploadDto): Promise<{
        message: string;
    }>;
    checkDuplicatedData(body: UploadDto): Promise<any>;
    checkPossibleUploadFile(body: Pick<UploadDto, 'originUploadPath'>): Promise<any>;
}
