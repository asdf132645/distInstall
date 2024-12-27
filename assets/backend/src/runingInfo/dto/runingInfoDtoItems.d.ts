import { abnormalClassInfo, RbcAfterClassInfos, RbcInfo, WbcInfoAfter, WbcResponse } from '../types/class-info';
import { UpdateRuningInfoDtoItems } from './UpdateRuningInfoDtoItems';
export declare class RuningInfoDtoItems {
    id: number;
    lock_status?: boolean;
    traySlot?: string;
    slotNo: string;
    barcodeNo?: string;
    patientId?: string;
    patientNm?: string;
    gender?: string;
    birthDay?: string;
    wbcCount?: string;
    slotId: string;
    orderDttm: string;
    testType: string;
    analyzedDttm: string;
    tactTime: string;
    maxWbcCount?: string;
    bf_lowPowerPath?: string[];
    wbcInfo?: WbcResponse;
    wbcInfoAfter?: WbcInfoAfter[];
    rbcInfo?: RbcInfo;
    rbcInfoAfter: RbcAfterClassInfos[];
    cassetId: string;
    isNormal?: string;
    submitState?: string;
    submitOfDate?: string;
    submitUserId?: string;
    classificationResult?: string[];
    isNsNbIntegration?: string;
    wbcMemo?: string;
    rbcMemo?: string;
    pcIp?: string;
    cbcPatientNo?: string;
    cbcPatientNm?: string;
    cbcSex?: string;
    cbcAge?: string;
    img_drive_root_path?: string;
    hosName?: string;
    abnormalClassInfo?: abnormalClassInfo;
    isAllClassesChecked?: boolean;
}
export declare class CreateRuningInfoDto {
    userId?: number;
    runingInfoDtoItems: RuningInfoDtoItems;
    dayQuery: string;
}
export declare class UpdateRuningInfoDto {
    userId?: number;
    dayQuery?: string;
    runingInfoDtoItems?: UpdateRuningInfoDtoItems[];
}
