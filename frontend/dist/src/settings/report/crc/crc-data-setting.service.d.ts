import { Repository } from 'typeorm';
import { CrcDataSettingEntity } from './entities/crc-data-setting.entity';
import { CreateCrcDataSettingDto } from './dto/crc-data-setting.dto';
import Redis from 'ioredis';
export declare class CrcDataSettingService {
    private readonly crcDataSettingRepository;
    private readonly redis;
    constructor(crcDataSettingRepository: Repository<CrcDataSettingEntity>, redis: Redis);
    create(createCrcDataSettingDto: CreateCrcDataSettingDto): Promise<CrcDataSettingEntity>;
    findAll(): Promise<CrcDataSettingEntity[]>;
    findOne(id: number): Promise<CrcDataSettingEntity>;
    remove(id: number): Promise<void>;
    update(crcSettingDtos: any[]): Promise<any[]>;
}
