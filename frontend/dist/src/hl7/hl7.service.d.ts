/// <reference types="node" />
export declare class HL7Service {
    parseHL7Message(data: Buffer): any;
    generateHL7MessageWithCustomData(sendingApp: string, sendingFacility: string, receivingApp: string, receivingFacility: string, dateTime: string, messageType: string[], messageControlId: string, processingId: string, hl7VersionId: string, wbcInfo: any[], result: any[], customData: any, pidData: any): string;
    generateHL7Message(sendingApp: string, sendingFacility: string, receivingApp: string, receivingFacility: string, dateTime: string, messageType: string[], messageControlId: string, processingId: string, hl7VersionId: string, wbcInfo: any[], result: any[]): string;
    generateHL7MessageNoAbnormalFlags(sendingApp: string, sendingFacility: string, receivingApp: string, receivingFacility: string, dateTime: string, messageType: string[], messageControlId: string, processingId: string, hl7VersionId: string, wbcInfo: any[], result: any[]): string;
    sendHl7Message(filepath: string, msg: any): Promise<void>;
}
