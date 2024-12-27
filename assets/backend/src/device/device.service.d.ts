import { DeviceEntity } from './device.entity';
import { Repository } from 'typeorm';
import { CreateDeviceDto, DeviceDto } from './dto/deviceDto';
export declare class DeviceService {
    private readonly deviceEntityRepository;
    constructor(deviceEntityRepository: Repository<DeviceEntity>);
    create(createDto: CreateDeviceDto): Promise<DeviceEntity>;
    find(): Promise<DeviceEntity[]>;
    update(deviceItems: DeviceDto): Promise<void>;
}
