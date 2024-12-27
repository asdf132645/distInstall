import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(userId: string, password: string): Promise<User | string | undefined>;
    logout(userId: string): Promise<boolean>;
    findOneById(userId: string): Promise<User | undefined>;
    findAll(userId: string): Promise<User[] | undefined>;
    update(userId: string, { userType, name, employeeNo }: Partial<CreateUserDto>): Promise<User | undefined>;
    delete(userId: string): Promise<boolean>;
}
