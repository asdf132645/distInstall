"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HL7Service = void 0;
const common_1 = require("@nestjs/common");
const hl7 = require("simple-hl7");
const path = require("path");
const fs = require("fs");
let HL7Service = class HL7Service {
    parseHL7Message(data) {
        const parser = new hl7.Parser();
        return parser.parse(data.toString('utf8'));
    }
    generateHL7MessageWithCustomData(sendingApp, sendingFacility, receivingApp, receivingFacility, dateTime, messageType, messageControlId, processingId, hl7VersionId, wbcInfo, result, customData, pidData) {
        const mshSegment = `MSH|^~\\&|${sendingApp}|${sendingFacility}|${receivingApp}|${receivingFacility}|${dateTime}||${messageType.join('^')}|${messageControlId}|${processingId}|${hl7VersionId}\r`;
        const segments = [mshSegment];
        let seq = 1;
        if (pidData) {
            const pidSegment = `PID|||${pidData.patientId}||${pidData.patientName}||||||||||||||||||||\r`;
            segments.push(pidSegment);
        }
        const { crcContent, crcRemark, crcComment, crcRecommendation } = customData;
        if (crcContent) {
            if (crcContent.plt) {
                crcContent.plt.forEach((item) => {
                    const zSegment = `ZCR|${seq++}|plt|${item.crcTitle}|${item.crcContent}\r`;
                    segments.push(zSegment);
                });
            }
            if (crcContent.rbc) {
                crcContent.rbc.forEach((item) => {
                    const zSegment = `ZCR|${seq++}|rbc|${item.crcTitle}|${item.crcContent}\r`;
                    segments.push(zSegment);
                });
            }
            if (crcContent.wbc) {
                crcContent.wbc.forEach((item) => {
                    const zSegment = `ZCR|${seq++}|wbc|${item.crcTitle}|${item.crcContent}\r`;
                    segments.push(zSegment);
                });
            }
        }
        if (crcRemark && Array.isArray(crcRemark)) {
            crcRemark.forEach((remark) => {
                if (remark.remarkAllContent) {
                    const zRemarkSegment = `ZRM|${seq++}|${remark.remarkAllContent}\r`;
                    segments.push(zRemarkSegment);
                }
            });
        }
        if (crcComment && Array.isArray(crcComment)) {
            crcComment.forEach((comment) => {
                if (comment.remarkAllContent) {
                    const zRemarkSegment = `ZCM|${seq++}|${comment.remarkAllContent}\r`;
                    segments.push(zRemarkSegment);
                }
            });
        }
        if (crcRecommendation && Array.isArray(crcRecommendation)) {
            crcRecommendation.forEach((recommendation) => {
                if (recommendation.remarkAllContent) {
                    const zRecSegment = `ZRC|${seq++}|${recommendation.remarkAllContent}\r`;
                    segments.push(zRecSegment);
                }
            });
        }
        return segments.join('');
    }
    generateHL7Message(sendingApp, sendingFacility, receivingApp, receivingFacility, dateTime, messageType, messageControlId, processingId, hl7VersionId, wbcInfo, result) {
        const mshSegment = `MSH|^~\\&|${sendingApp}|${sendingFacility}|${receivingApp}|${receivingFacility}|${dateTime}||${messageType.join('^')}|${messageControlId}|${processingId}|${hl7VersionId}\r`;
        const segments = [mshSegment];
        let seq = 0;
        if (result === undefined) {
            return '';
        }
        result.forEach((lisCode) => {
            if (lisCode.LIS_CD !== '') {
                wbcInfo.forEach((wbcItem) => {
                    if (Number(wbcItem.id) === Number(lisCode.IA_CD) &&
                        (Number(wbcItem.percent) > 0 || Number(wbcItem.count))) {
                        const obxSegmentCount = `OBX|${seq++}|NM|${lisCode.LIS_CD}||${wbcItem.count}|||N|||P\r`;
                        const obxSegmentPercent = `OBX|${seq++}|NM|${lisCode.LIS_CD}%||${wbcItem.percent}|%|N|||P\r`;
                        segments.push(obxSegmentCount, obxSegmentPercent);
                    }
                });
            }
        });
        return segments.join('');
    }
    generateHL7MessageNoAbnormalFlags(sendingApp, sendingFacility, receivingApp, receivingFacility, dateTime, messageType, messageControlId, processingId, hl7VersionId, wbcInfo, result) {
        const mshSegment = `MSH|^~\\&|${sendingApp}|${sendingFacility}|${receivingApp}|${receivingFacility}|${dateTime}||${messageType.join('^')}|${messageControlId}|${processingId}|${hl7VersionId}\n`;
        const segments = [mshSegment];
        let seq = 0;
        if (result === undefined) {
            return '';
        }
        result.forEach((lisCode) => {
            if (lisCode.LIS_CD !== '') {
                wbcInfo.forEach((wbcItem) => {
                    if (Number(wbcItem.id) === Number(lisCode.IA_CD) &&
                        (Number(wbcItem.percent) > 0 || Number(wbcItem.count))) {
                        const obxSegmentCount = `OBX|${seq++}|NM|${lisCode.LIS_CD}||${wbcItem.count}||||||P\n`;
                        const obxSegmentPercent = `OBX|${seq++}|NM|${lisCode.LIS_CD}%||${wbcItem.percent}|%|||||P\n`;
                        segments.push(obxSegmentCount, obxSegmentPercent);
                    }
                });
            }
        });
        return segments.join('');
    }
    async sendHl7Message(filepath, msg) {
        const directory = path.dirname(filepath);
        return new Promise((resolve, reject) => {
            fs.mkdir(directory, { recursive: true }, (err) => {
                if (err) {
                    console.error('Failed to create directory:', err.message);
                    return reject(`Failed to create directory: ${err.message}`);
                }
                fs.writeFile(filepath, msg.data, { encoding: 'utf8' }, (err) => {
                    if (err) {
                        console.error('Failed to write HL7 message to file:', err.message);
                        return reject(`Failed to write HL7 message to file: ${err.message}`);
                    }
                    resolve();
                });
            });
        });
    }
};
exports.HL7Service = HL7Service;
exports.HL7Service = HL7Service = __decorate([
    (0, common_1.Injectable)()
], HL7Service);
//# sourceMappingURL=hl7.service.js.map