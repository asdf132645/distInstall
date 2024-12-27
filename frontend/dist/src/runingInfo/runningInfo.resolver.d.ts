import { RuningInfoService } from './runingInfo.service';
import { RuningInfoEntity } from './runingInfo.entity';
import Redis from 'ioredis';
import { UpdateRuningInfoDto } from './dto/runingInfoDtoItems';
export declare class RunningInfoResolver {
    private readonly runningInfoService;
    private readonly redis;
    constructor(runningInfoService: RuningInfoService, redis: Redis);
    getRunningInfoByIdGQL(id: number): Promise<RuningInfoEntity>;
    updateRunningInfoGQL(updateDto: UpdateRuningInfoDto): Promise<RuningInfoEntity[]>;
}
