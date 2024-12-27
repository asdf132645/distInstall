import { Repository, DataSource } from 'typeorm';
import { RuningInfoEntity } from './runingInfo.entity';
import { CreateRuningInfoDto, UpdateRuningInfoDto } from './dto/runingInfoDtoItems';
import { LoggerService } from '../logger.service';
import Redis from 'ioredis';
export declare class RuningInfoService {
    private readonly logger;
    private readonly dataSource;
    private readonly runingInfoEntityRepository;
    private readonly redis;
    private readonly fileOperationExpressServerPath;
    constructor(logger: LoggerService, dataSource: DataSource, runingInfoEntityRepository: Repository<RuningInfoEntity>, redis: Redis);
    addUniqueConstraintToSlotId(): Promise<void>;
    create(createDto: CreateRuningInfoDto): Promise<RuningInfoEntity | null>;
    findBySlotNo(slotId: string): Promise<RuningInfoEntity | undefined>;
    update(updateDto: UpdateRuningInfoDto): Promise<RuningInfoEntity[]>;
    delete(ids: string[], rootPaths: string[]): Promise<boolean>;
    findAllWithPagingAndFilter(page: number, pageSize: number, startDay?: Date, endDay?: Date, barcodeNo?: string, patientId?: string, patientNm?: string, nrCount?: string, titles?: string[], testType?: string, wbcCountOrder?: string): Promise<{
        data: RuningInfoEntity[];
        total: number;
    }>;
    getUpDownRunnInfo(id: number, type: string, nrCount?: string, titles?: string[], startDay?: Date, endDay?: Date, barcodeNo?: string, testType?: string): Promise<Partial<RuningInfoEntity> | null>;
    clearPcIpAndSetStateFalse(pcIp: string): Promise<void>;
    getRunningInfoById(id: number): Promise<RuningInfoEntity | null>;
    getRunningInfoClassDetail(id: number): Promise<RuningInfoEntity | null>;
    getRunningInfoClassInfo(id: number): Promise<RuningInfoEntity | null>;
    getRunningInfoClassInfoMenu(id: number): Promise<RuningInfoEntity | null>;
    updatePcIpAndState(oldPcIp: string, newEntityId: number, newPcIp: string): Promise<void>;
    clearPcIpAndState(oldPcIp: string): Promise<void>;
    redisAllClear(): Promise<void>;
    private cleanBrowserCache;
    private runFileExpressServer;
}
