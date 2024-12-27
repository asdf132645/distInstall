import { Repository } from 'typeorm';
import { CreateCrcCommentDto } from './dto/crc-comment-setting.dto';
import Redis from 'ioredis';
import { CrcCommentEntity } from './entities/crc-comment.entity';
export declare class CrcCommentSettingService {
    private readonly CrcCommentEntityRepository;
    private readonly redis;
    constructor(CrcCommentEntityRepository: Repository<CrcCommentEntity>, redis: Redis);
    create(createCrcCommentSettingDto: CreateCrcCommentDto): Promise<CrcCommentEntity>;
    findAll(): Promise<CrcCommentEntity[]>;
    findOne(id: number): Promise<CrcCommentEntity>;
    remove(id: number): Promise<void>;
    update(crcCommentSettingDto: any[]): Promise<CrcCommentEntity[]>;
    findByCodeOrCommentAllContent(code?: string, remarkAllContent?: string): Promise<CrcCommentEntity[]>;
}
