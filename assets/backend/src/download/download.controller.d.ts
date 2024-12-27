import { DownloadService } from './download.service';
import { DownloadDto, DownloadReturn } from './download.dto';
import Redis from 'ioredis';
export declare class DownloadController {
    private readonly downloadService;
    private readonly redis;
    constructor(downloadService: DownloadService, redis: Redis);
    createBackup(downloadDto: DownloadDto): Promise<any>;
    checkIsPossibleToDownload(downloadDto: Pick<DownloadDto, 'startDate' | 'endDate' | 'destinationDownloadPath' | 'originDownloadPath'>): Promise<DownloadReturn>;
    openDrive(downloadDto: Pick<DownloadDto, 'originDownloadPath'>): Promise<string[] | string>;
}
