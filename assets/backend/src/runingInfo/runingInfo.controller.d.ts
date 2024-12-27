import { RuningInfoService } from './runingInfo.service';
import { CreateRuningInfoDto, UpdateRuningInfoDto } from './dto/runingInfoDtoItems';
import { RuningInfoEntity } from './runingInfo.entity';
import Redis from 'ioredis';
export declare class RuningInfoController {
    private readonly runingInfoService;
    private readonly redis;
    constructor(runingInfoService: RuningInfoService, redis: Redis);
    getPageUpDown(id: string, type: string, dayQuery: string, nrCount?: string, titles?: string, startDay?: string, endDay?: string, barcodeNo?: string, testType?: string): Promise<Partial<RuningInfoEntity> | null>;
    clearPcIpAndState(oldPcIp: string, dayQuery: string): Promise<void>;
    updatePcIpAndState(oldPcIp: string, newEntityId: number, newPcIp: string, dayQuery: string): Promise<void>;
    create(createDto: CreateRuningInfoDto): Promise<RuningInfoEntity | null>;
    deleteMultiple(req: any): Promise<{
        success: boolean;
    }>;
    update(updateDto: UpdateRuningInfoDto): Promise<RuningInfoEntity[]>;
    getRunningInfoById(id: string): Promise<RuningInfoEntity | null>;
    getRunningInfoDetailById(id: string): Promise<RuningInfoEntity | null>;
    getRunningInfoClassInfoByIdDetail(id: string): Promise<RuningInfoEntity | null>;
    getRunningInfoClassInfoMenuByIdDetail(id: string): Promise<RuningInfoEntity | null>;
    removePageAllDataApi(): Promise<void>;
    findAllWithPagingAndFilter(page?: number, pageSize?: number, startDay?: string, endDay?: string, barcodeNo?: string, patientId?: string, patientNm?: string, nrCount?: string, titles?: string, testType?: string, wbcCountOrder?: string): Promise<{
        data: RuningInfoEntity[];
        total: number;
        page: number;
    }>;
}
