import { Logger } from '@nestjs/common';
export declare class LoggerService extends Logger {
    private readonly baseLogDir;
    private lastMessages;
    constructor();
    log(message: string): void;
    error(message: string, trace?: string): void;
    warn(message: string): void;
    debug(message: string): void;
    cbcLis(message: string): void;
    ping(message: string): void;
    logic(message: string): void;
    private isDuplicateMessage;
    private formattedTime;
    private writeLog;
    private ensureBaseLogDirectoryExists;
    private ensureDirectoryExists;
    private ensureFileExists;
}
