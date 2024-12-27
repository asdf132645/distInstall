export declare class ClassInfo {
    classId?: string;
    classNm?: string;
    degree?: string;
    originalDegree?: string;
}
export declare class RbcAfterClassInfoObj {
    classId?: string;
    classNm?: string;
    degree?: string;
    originalDegree?: number;
    percent?: string;
}
export declare class RbcClassInfo {
    classInfo?: ClassInfo[];
    categoryId?: string;
    categoryNm?: string;
}
export declare class RbcAfterClassInfos {
    classInfo?: RbcAfterClassInfoObj[];
    categoryId?: string;
    categoryNm?: string;
}
export declare class RbcInfo {
    rbcClass?: RbcClassInfo[];
    malariaCount: string;
    maxRbcCount: string;
    pltCount: string;
}
export declare class abnormalClassInfo {
    classNm?: string;
    val?: string;
}
export declare class WbcInfoAfter {
    id?: string;
    name?: string;
    count?: string;
    title?: string;
    images?: wbcImages[];
    percent?: string;
}
export declare class WbcInfo {
    id?: string;
    name?: string;
    count?: string;
    title?: string;
    images?: wbcImages[];
    percent?: string;
}
export declare class Coordinates {
    display?: string;
}
export declare class wbcImages {
    coordinates?: Coordinates;
    fileName?: string;
    title?: string;
    filter?: string;
    height?: number;
    width?: number;
}
export declare class WbcResponse {
    wbcInfo?: [WbcInfo[]];
    totalCount?: string;
    maxWbcCount?: string;
}
