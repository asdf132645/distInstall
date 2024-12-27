import { DataSource, Repository } from 'typeorm';
import { RuningInfoEntity } from '../runingInfo/runingInfo.entity';
import { UploadDto } from './upload.dto';
import { LoggerService } from '../logger.service';
import { CombinedService } from '../combinedProtocol/combined.service';
export declare class UploadService {
    private readonly dataSource;
    private readonly runningInfoRepository;
    private readonly logger;
    private readonly combinedService;
    private moveResults;
    private readonly pythonScriptPath;
    constructor(dataSource: DataSource, runningInfoRepository: Repository<RuningInfoEntity>, logger: LoggerService, combinedService: CombinedService);
    private listDirectoriesInFolder;
    private getInsertStatement;
    private getCreateTableStatement;
    private createTemporaryTable;
    private cleanNpmCache;
    private moveDataToDatabase;
    private checkDuplicatedInDatabase;
    private deleteTemporaryTable;
    private deleteImageFolder;
    private updateImgDriveRootPath;
    private runPythonScript;
    private moveImages;
    uploadOperation(fileInfo: UploadDto): Promise<string>;
    checkDuplicatedData(fileInfo: UploadDto): Promise<any>;
    checkPossibleUploadFile(fileInfo: Pick<UploadDto, 'originUploadPath'>): Promise<any>;
}
