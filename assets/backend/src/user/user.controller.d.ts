import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import Redis from 'ioredis';
export declare class UserController {
    private readonly userService;
    private readonly redis;
    constructor(userService: UserService, redis: Redis);
    register(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    getUser(userId: string): Promise<{
        user: {};
        code: number;
        success?: undefined;
        error?: undefined;
    } | {
        user: import("./entities/user.entity").User;
        code: number;
        success?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        user?: undefined;
        code?: undefined;
    }>;
    getALLUsers(userId: string): Promise<{
        users: import("./entities/user.entity").User[];
        code: number;
        success?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        users?: undefined;
        code?: undefined;
    }>;
    loginUser({ userId, password }: {
        userId: string;
        password: string;
    }): Promise<{
        user: string | import("./entities/user.entity").User;
        success?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        user?: undefined;
    }>;
    logoutUser({ userId }: {
        userId: string;
    }): Promise<boolean>;
    updateUser(userId: string, { userType, name, employeeNo }: Partial<CreateUserDto>): Promise<{
        user: import("./entities/user.entity").User;
        code: number;
        success?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        user?: undefined;
        code?: undefined;
    }>;
    deleteUser({ userId }: Pick<CreateUserDto, 'userId'>): Promise<{
        success: boolean;
        code: number;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        code?: undefined;
    }>;
}
