import { CrcCommentSettingService } from './crc-comment-setting.service';
import { CreateCrcCommentDto } from './dto/crc-comment-setting.dto';
export declare class CrcCommentSettingController {
    private readonly crcCommentSettingService;
    constructor(crcCommentSettingService: CrcCommentSettingService);
    create(createCrcCommentDto: CreateCrcCommentDto): Promise<import("./entities/crc-comment.entity").CrcCommentEntity>;
    findAll(): Promise<import("./entities/crc-comment.entity").CrcCommentEntity[]>;
    find(code?: string, CommentAllContent?: string): Promise<import("./entities/crc-comment.entity").CrcCommentEntity[]>;
    findOne(id: string): Promise<import("./entities/crc-comment.entity").CrcCommentEntity>;
    remove(id: string): Promise<void>;
    update(updateCrcSettingDtos: any[]): Promise<import("./entities/crc-comment.entity").CrcCommentEntity[]>;
}
