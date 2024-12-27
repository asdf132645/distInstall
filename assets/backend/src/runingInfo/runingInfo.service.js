"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuningInfoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const runingInfo_entity_1 = require("./runingInfo.entity");
const moment = require("moment");
const os = require("os");
const logger_service_1 = require("../logger.service");
const ioredis_1 = require("@nestjs-modules/ioredis");
const ioredis_2 = require("ioredis");
const child_process_1 = require("child_process");
const axios_1 = require("axios");
const userInfo = os.userInfo();
let RuningInfoService = class RuningInfoService {
    constructor(logger, dataSource, runingInfoEntityRepository, redis) {
        this.logger = logger;
        this.dataSource = dataSource;
        this.runingInfoEntityRepository = runingInfoEntityRepository;
        this.redis = redis;
        this.fileOperationExpressServerPath = `${userInfo.homedir}\\AppData\\Local\\Programs\\UIMD\\UIMD_fileOperation_server`;
    }
    async addUniqueConstraintToSlotId() {
        try {
            const entityManager = this.runingInfoEntityRepository.manager;
            const checkQuery = `
      SELECT COUNT(*)
      FROM information_schema.TABLE_CONSTRAINTS tc
      JOIN information_schema.KEY_COLUMN_USAGE kcu
      ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
      WHERE tc.TABLE_SCHEMA = DATABASE() -- 현재 데이터베이스 선택
      AND tc.TABLE_NAME = 'runing_info_entity'
      AND tc.CONSTRAINT_TYPE = 'UNIQUE'
      AND kcu.COLUMN_NAME = 'slotId';
    `;
            const checkResult = await entityManager.query(checkQuery);
            if (checkResult[0]['COUNT(*)'] > 0) {
                console.log('UNIQUE 제약 조건이 이미 존재합니다.');
                return;
            }
            const addQuery = `
      ALTER TABLE runing_info_entity 
      ADD CONSTRAINT unique_slotId UNIQUE (slotId);
    `;
            await entityManager.query(addQuery);
            console.log('slotId에 UNIQUE 제약 조건이 추가되었습니다.');
        }
        catch (error) {
            console.log('오류 발생:', error.message);
        }
    }
    async create(createDto) {
        const { runingInfoDtoItems } = createDto;
        const analyzedDttm = moment(runingInfoDtoItems.analyzedDttm, 'YYYYMMDDHHmm');
        const startDttm = analyzedDttm.clone().subtract(1, 'hours');
        const endDttm = analyzedDttm.clone().add(1, 'hours');
        const startDttmStr = startDttm.format('YYYYMMDDHHmm');
        const endDttmStr = endDttm.format('YYYYMMDDHHmm');
        return await this.dataSource.transaction(async (manager) => {
            const existingEntity = await manager.findOne(runingInfo_entity_1.RuningInfoEntity, {
                where: {
                    slotId: runingInfoDtoItems.slotId,
                    analyzedDttm: (0, typeorm_2.Between)(startDttmStr, endDttmStr),
                },
            });
            if (existingEntity) {
                console.log('동일 슬롯아이디 및 1시간 범위 내 analyzedDttm 존재, 저장 x');
                return null;
            }
            const entity = manager.create(runingInfo_entity_1.RuningInfoEntity, {
                ...runingInfoDtoItems,
            });
            return await manager.save(entity);
        });
    }
    async findBySlotNo(slotId) {
        return this.runingInfoEntityRepository.findOne({ where: { slotId } });
    }
    async update(updateDto) {
        const { runingInfoDtoItems } = updateDto;
        const updatedItems = [];
        for (const item of runingInfoDtoItems) {
            const existingEntity = await this.runingInfoEntityRepository.findOne({
                where: { id: item.id },
            });
            if (existingEntity) {
                Object.assign(existingEntity, item);
                await this.runingInfoEntityRepository.save(existingEntity);
                updatedItems.push(existingEntity);
            }
        }
        return updatedItems;
    }
    async delete(ids, rootPaths) {
        await this.cleanBrowserCache();
        try {
            await this.runingInfoEntityRepository.delete({ id: (0, typeorm_2.In)(ids) });
            const promises = rootPaths.map((rootPath) => {
                return new Promise((resolve, reject) => {
                    (0, child_process_1.exec)(`rmdir /s /q "${rootPath}"`, (error) => {
                        if (error) {
                            console.error(`Fail to delete folder at ${rootPath}: ${error.message}`);
                            reject(false);
                        }
                        else {
                            console.log(`Folder at ${rootPath} has been deleted successfully`);
                            resolve(true);
                        }
                    });
                });
            });
            await Promise.all(promises);
            return true;
        }
        catch (error) {
            console.error('Error while deleting entities:', error);
            return false;
        }
    }
    async findAllWithPagingAndFilter(page, pageSize, startDay, endDay, barcodeNo, patientId, patientNm, nrCount, titles, testType, wbcCountOrder) {
        const queryBuilder = this.runingInfoEntityRepository.createQueryBuilder('runInfo');
        const startFormatted = startDay
            ? `${startDay.getFullYear()}${(startDay.getMonth() + 1).toString().padStart(2, '0')}${startDay.getDate().toString().padStart(2, '0')}000000000`
            : undefined;
        const endFormatted = endDay
            ? `${endDay.getFullYear()}${(endDay.getMonth() + 1).toString().padStart(2, '0')}${endDay.getDate().toString().padStart(2, '0')}235959999`
            : undefined;
        if (startFormatted || endFormatted) {
            queryBuilder.andWhere(startFormatted && endFormatted
                ? 'runInfo.analyzedDttm BETWEEN :startDay AND :endDay'
                : startFormatted
                    ? 'runInfo.analyzedDttm >= :startDay'
                    : 'runInfo.analyzedDttm <= :endDay', {
                startDay: startFormatted,
                endDay: endFormatted,
            });
        }
        queryBuilder.orderBy('runInfo.analyzedDttm', 'DESC');
        if (barcodeNo) {
            queryBuilder.andWhere('runInfo.barcodeNo LIKE :barcodeNo', {
                barcodeNo: `%${barcodeNo}%`,
            });
        }
        if (patientId) {
            queryBuilder.andWhere('runInfo.patientId LIKE :patientId', {
                patientId: `%${patientId}%`,
            });
        }
        if (patientNm) {
            queryBuilder.andWhere('runInfo.patientNm LIKE :patientNm', {
                patientNm: `%${patientNm}%`,
            });
        }
        if (testType) {
            queryBuilder.andWhere('runInfo.testType = :testType', { testType });
        }
        if (nrCount !== '0' && nrCount !== '') {
            const query = `
    JSON_SEARCH(runInfo.wbcInfoAfter, 'one', :titlePath, NULL, '$[*].title') IS NOT NULL
    AND (
      SELECT COUNT(*)
      FROM JSON_TABLE(
        runInfo.wbcInfoAfter,
        '$[*]' COLUMNS(
          title VARCHAR(255) PATH '$.title',
          count INT PATH '$.count'
        )
      ) AS jt
      WHERE jt.title = :titleParam
        AND jt.count = :nrCount
    ) > 0
  `;
            queryBuilder.andWhere(query, {
                titlePath: 'NR',
                titleParam: 'NR',
                nrCount: parseInt(nrCount, 10),
            });
        }
        if (titles && titles.length > 0) {
            const andConditions = titles
                .map((title, index) => {
                const titleParam = `title${index}`;
                return `
        JSON_SEARCH(runInfo.wbcInfoAfter, 'one', :${titleParam}, NULL, '$[*].title') IS NOT NULL
        AND (
          SELECT COUNT(*)
          FROM JSON_TABLE(
            runInfo.wbcInfoAfter,
            '$[*]' COLUMNS(
              title VARCHAR(255) PATH '$.title',
              count INT PATH '$.count'
            )
          ) AS jt
          WHERE jt.title = :${titleParam}
            AND jt.count > 0
        ) > 0
      `;
            })
                .join(' AND ');
            const params = titles.reduce((acc, title, index) => {
                acc[`title${index}`] = title;
                return acc;
            }, {});
            queryBuilder.andWhere(andConditions, params);
        }
        let [data, total] = await queryBuilder.getManyAndCount();
        if (wbcCountOrder) {
            data.sort((a, b) => {
                const aCount = Number(a.wbcCount);
                const bCount = Number(b.wbcCount);
                return wbcCountOrder.toUpperCase() === 'ASC'
                    ? aCount - bCount
                    : bCount - aCount;
            });
        }
        if (pageSize && page) {
            data = data.slice((page - 1) * pageSize, page * pageSize);
        }
        return { data, total };
    }
    async getUpDownRunnInfo(id, type, nrCount, titles, startDay, endDay, barcodeNo, testType) {
        const entityManager = this.runingInfoEntityRepository.manager;
        const queryBuilder = this.runingInfoEntityRepository.createQueryBuilder('runInfo');
        const currentEntityResult = await entityManager.query('SELECT id FROM runing_info_entity WHERE id = ?', [id]);
        if (currentEntityResult.length === 0) {
            return null;
        }
        const startFormatted = startDay
            ? `${startDay.getFullYear()}${(startDay.getMonth() + 1).toString().padStart(2, '0')}${startDay.getDate().toString().padStart(2, '0')}000000000`
            : undefined;
        const endFormatted = endDay
            ? `${endDay.getFullYear()}${(endDay.getMonth() + 1).toString().padStart(2, '0')}${endDay.getDate().toString().padStart(2, '0')}235959999`
            : undefined;
        if (startFormatted) {
            queryBuilder.andWhere('runInfo.analyzedDttm >= :startDay', {
                startDay: startFormatted,
            });
        }
        if (endFormatted) {
            queryBuilder.andWhere('runInfo.analyzedDttm <= :endDay', {
                endDay: endFormatted,
            });
        }
        if (barcodeNo) {
            queryBuilder.andWhere('runInfo.barcodeNo LIKE :barcodeNo', {
                barcodeNo: `%${barcodeNo}%`,
            });
        }
        if (testType) {
            queryBuilder.andWhere('runInfo.testType = :testType', { testType });
        }
        if (type === 'up') {
            queryBuilder
                .andWhere('runInfo.id > :id', { id })
                .orderBy('runInfo.id', 'ASC');
        }
        else if (type === 'down') {
            queryBuilder
                .andWhere('runInfo.id < :id', { id })
                .orderBy('runInfo.id', 'DESC');
        }
        if (nrCount && nrCount !== '0') {
            queryBuilder.andWhere(`JSON_SEARCH(runInfo.wbcInfoAfter, 'one', 'NR', NULL, '$[*].title') IS NOT NULL
       AND (
         SELECT COUNT(*)
         FROM JSON_TABLE(
           runInfo.wbcInfoAfter,
           '$[*]' COLUMNS(
             title VARCHAR(255) PATH '$.title',
             count INT PATH '$.count'
           )
         ) AS jt
         WHERE jt.title = 'NR' AND jt.count = :nrCount
       ) > 0`, { nrCount: parseInt(nrCount, 10) });
        }
        if (titles && titles.length > 0) {
            titles.forEach((title, index) => {
                queryBuilder.andWhere(`JSON_SEARCH(runInfo.wbcInfoAfter, 'one', :title${index}, NULL, '$[*].title') IS NOT NULL
         AND (
           SELECT COUNT(*)
           FROM JSON_TABLE(
             runInfo.wbcInfoAfter,
             '$[*]' COLUMNS(
               title VARCHAR(255) PATH '$.title',
               count INT PATH '$.count'
             )
           ) AS jt
           WHERE jt.title = :title${index}
             AND jt.count > 0
         ) > 0`, { [`title${index}`]: title });
            });
        }
        const result = await queryBuilder.getRawOne();
        if (result) {
            const cleanedResult = {};
            Object.keys(result).forEach((key) => {
                const cleanedKey = key.replace(/^runInfo_/, '');
                cleanedResult[cleanedKey] = result[key];
            });
            return cleanedResult;
        }
        const directionQuery = type === 'up'
            ? 'SELECT * FROM runing_info_entity WHERE id > ? ORDER BY id ASC LIMIT 1'
            : 'SELECT * FROM runing_info_entity WHERE id < ? ORDER BY id DESC LIMIT 1';
        const nextResult = await entityManager.query(directionQuery, [id]);
        if (nextResult.length > 0) {
            const cleanedNextResult = {};
            Object.keys(nextResult[0]).forEach((key) => {
                const cleanedKey = key.replace(/^runInfo_/, '');
                cleanedNextResult[cleanedKey] = nextResult[0][key];
            });
            return cleanedNextResult;
        }
        return null;
    }
    async clearPcIpAndSetStateFalse(pcIp) {
        try {
            console.log(pcIp);
            const entityWithPcIp = await this.runingInfoEntityRepository.findOne({
                where: { pcIp },
            });
            if (!entityWithPcIp) {
                console.error(`Entity with PC IP ${pcIp} not found`);
                return;
            }
            entityWithPcIp.pcIp = '';
            entityWithPcIp.lock_status = false;
            await this.runingInfoEntityRepository.save(entityWithPcIp);
        }
        catch (error) {
            console.error('Error while clearing PC IP and setting state to false:', error);
        }
    }
    async getRunningInfoById(id) {
        const entity = await this.runingInfoEntityRepository.findOne({
            where: { id },
        });
        console.log(Array.isArray(entity.rbcInfo));
        return entity || null;
    }
    async getRunningInfoClassDetail(id) {
        const entityManager = this.runingInfoEntityRepository.manager;
        const query = `
      SELECT 
        id,
        slotId,
        wbcInfoAfter,
        testType,
        barcodeNo,
        patientId,
        cbcPatientNo,
        cbcPatientNm,
        submitState,
        cbcSex,
        cbcAge,
        hosName,
        analyzedDttm,
        wbcInfo,
        img_drive_root_path,
        rbcInfoAfter,
        wbcMemo,
        isAllClassesChecked
      FROM 
        runing_info_entity
      WHERE 
        id = ?`;
        const result = await entityManager.query(query, [id]);
        if (result.length > 0) {
            return result[0];
        }
        else {
            return null;
        }
    }
    async getRunningInfoClassInfo(id) {
        const entityManager = this.runingInfoEntityRepository.manager;
        const query = `
      SELECT 
        id,
        wbcInfoAfter,
        wbcInfo,
        testType,
        submitState,
        img_drive_root_path,
        rbcInfoAfter,
        wbcMemo,
        barcodeNo,
        isAllClassesChecked
      FROM 
        runing_info_entity
      WHERE 
        id = ?`;
        const result = await entityManager.query(query, [id]);
        if (result.length > 0) {
            return result[0];
        }
        else {
            return null;
        }
    }
    async getRunningInfoClassInfoMenu(id) {
        const entityManager = this.runingInfoEntityRepository.manager;
        const query = `
      SELECT 
        id,
        lock_status,
        wbcInfoAfter,
        wbcInfo,
        testType,
        img_drive_root_path,
        rbcInfoAfter,
        wbcMemo,
        isAllClassesChecked
      FROM 
        runing_info_entity
      WHERE 
        id = ?`;
        const result = await entityManager.query(query, [id]);
        if (result.length > 0) {
            return result[0];
        }
        else {
            return null;
        }
    }
    async updatePcIpAndState(oldPcIp, newEntityId, newPcIp) {
        await this.runingInfoEntityRepository.update({ pcIp: oldPcIp }, { pcIp: '', lock_status: false });
        await this.runingInfoEntityRepository.update({ id: newEntityId }, { pcIp: newPcIp, lock_status: true });
    }
    async clearPcIpAndState(oldPcIp) {
        await this.runingInfoEntityRepository.update({ pcIp: oldPcIp }, { pcIp: '', lock_status: false });
    }
    async redisAllClear() {
        this.redis.flushall();
    }
    cleanBrowserCache() {
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)('powershell.exe -Command "Get-ChildItem \\"$env:LOCALAPPDATA\\Microsoft\\Edge\\User Data\\" -Directory | ForEach-Object { Remove-Item -Path \\"$($_.FullName)\\Cache\\Cache_Data\\f_*\\" -Recurse -ErrorAction SilentlyContinue }"', (error, stdout, stderr) => {
                if (error) {
                    return reject(error);
                }
                if (stderr) {
                    console.log(`browser cache clean warning: ${stderr}`);
                }
                resolve(stdout);
            });
        });
    }
    async runFileExpressServer(task, apiUrl) {
        const expressServer = (0, child_process_1.spawn)('npm', ['start'], {
            cwd: this.fileOperationExpressServerPath,
            stdio: 'inherit',
            shell: true,
        });
        expressServer.on('close', (code) => {
            console.log(`Express 서버가 종료되었습니다. 종료 코드: ${code}`);
        });
        try {
            await axios_1.default.post(`${apiUrl}:3010/file-delete`, { task });
        }
        catch (error) {
            console.error('파일 삭제 중 오류 발생: ', error);
        }
        expressServer.kill();
    }
};
exports.RuningInfoService = RuningInfoService;
exports.RuningInfoService = RuningInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(runingInfo_entity_1.RuningInfoEntity)),
    __param(3, (0, ioredis_1.InjectRedis)()),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        typeorm_2.DataSource,
        typeorm_2.Repository,
        ioredis_2.default])
], RuningInfoService);
//# sourceMappingURL=runingInfo.service.js.map