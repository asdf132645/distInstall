import { Repository, DataSource } from 'typeorm';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { DownloadDto, DownloadReturn } from './download.dto';
import { LoggerService } from '../logger.service';
import { CombinedService } from '../combinedProtocol/combined.service';
export declare class DownloadService {
    private readonly dataSource;
    private readonly runningInfoRepository;
    private readonly logger;
    private readonly combinedService;
    private moveResults;
    private readonly pythonScriptPath;
    constructor(dataSource: DataSource, runningInfoRepository: Repository<RuningInfoEntity>, logger: LoggerService, combinedService: CombinedService);
    private cleanNpmCache;
    private formatDate;
    private ensureDirectoryExists;
    private runPythonScript;
    private execCommand;
    private fetchDataByDateRange;
    private readFolderNames;
    private checkAvailableFolders;
    private updateImgDriveRootPath;
    checkIsPossibleToDownload(downloadDto: Pick<DownloadDto, 'startDate' | 'endDate' | 'destinationDownloadPath' | 'originDownloadPath'>): Promise<DownloadReturn>;
    downloadOperation(downloadDto: DownloadDto): Promise<any>;
    openDrive(downloadDto: Pick<DownloadDto, 'originDownloadPath'>): Promise<string>;
}
