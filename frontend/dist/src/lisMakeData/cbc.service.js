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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CbcService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const util_1 = require("util");
const logger_service_1 = require("../logger.service");
const execPromise = (0, util_1.promisify)(child_process_1.exec);
let CbcService = class CbcService {
    constructor(logger) {
        this.logger = logger;
    }
    getMockCbcWorkList() {
        return `
    <root>
    <spcworklist>
    <worklist>
    <bcno><![CDATA[O288L54K0]]></bcno>
    <tclscd><![CDATA[LHR007]]></tclscd>
    <testcd><![CDATA[LHR007]]></testcd>
    <tclsscrnnm><![CDATA[BMT CBC & Manual WBC Differential Count]]></tclsscrnnm>
    <rsltstat><![CDATA[4]]></rsltstat>
    <inptrslt></inptrslt>
    <reptrslt></reptrslt>
    <spcstat><![CDATA[4]]></spcstat>
    <judgmark></judgmark>
    <deltamark></deltamark>
    <panicmark></panicmark>
    <criticalmark></criticalmark>
    <alertmark></alertmark>
    <amrmark></amrmark>
    </worklist><worklist>
    <bcno><![CDATA[O288L54K0]]></bcno>
    <tclscd><![CDATA[LHR007]]></tclscd>
    <testcd><![CDATA[LHR100]]></testcd>
    <tclsscrnnm><![CDATA[WBC Count]]></tclsscrnnm>
    <rsltstat><![CDATA[4]]></rsltstat>
    <inptrslt><![CDATA[15.41]]></inptrslt>
    <reptrslt><![CDATA[15.41]]></reptrslt>
    <spcstat><![CDATA[4]]></spcstat>
    <judgmark><![CDATA[H]]></judgmark>
    <deltamark><![CDATA[-]]></deltamark>
    <panicmark><![CDATA[-]]></panicmark>
    <criticalmark><![CDATA[-]]></criticalmark>
    <alertmark><![CDATA[-]]></alertmark>
    <amrmark><![CDATA[-]]></amrmark></worklist>
    <worklist>
      <bcno><![CDATA[O288L54K0]]></bcno>
      <tclscd><![CDATA[LHR007]]></tclscd>
      <testcd><![CDATA[LHR10001]]></testcd>
      <tclsscrnnm><![CDATA[Corrected WBC Count]]></tclsscrnnm>
      <rsltstat><![CDATA[-]]></rsltstat>
      <inptrslt></inptrslt>
      <reptrslt></reptrslt>
      <spcstat><![CDATA[4]]></spcstat>
      <judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR101]]></testcd><tclsscrnnm><![CDATA[RBC Count]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[3.93]]></inptrslt><reptrslt><![CDATA[3.93]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[L]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[-]]></alertmark><amrmark><![CDATA[-]]></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR102]]></testcd><tclsscrnnm><![CDATA[Hemoglobin]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[11.6]]></inptrslt><reptrslt><![CDATA[11.6]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[L]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[-]]></alertmark><amrmark><![CDATA[-]]></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR103]]></testcd><tclsscrnnm><![CDATA[Hematocrit]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[36.3]]></inptrslt><reptrslt><![CDATA[36.3]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[-]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[-]]></alertmark><amrmark><![CDATA[-]]></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR104]]></testcd><tclsscrnnm><![CDATA[Platelet count]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[471]]></inptrslt><reptrslt><![CDATA[471]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[H]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[-]]></alertmark><amrmark><![CDATA[-]]></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR105]]></testcd><tclsscrnnm><![CDATA[WBC Diff. Count]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10501]]></testcd><tclsscrnnm><![CDATA[Seg.-neutrophils]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[73]]></inptrslt><reptrslt><![CDATA[73]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[-]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[-]]></alertmark><amrmark><![CDATA[-]]></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10502]]></testcd><tclsscrnnm><![CDATA[Band-neutrophils]]></tclsscrnnm><rsltstat><![CDATA[-]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10503]]></testcd><tclsscrnnm><![CDATA[Lymphocytes]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[18]]></inptrslt><reptrslt><![CDATA[18]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[L]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[-]]></alertmark><amrmark><![CDATA[-]]></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10504]]></testcd><tclsscrnnm><![CDATA[Monocytes]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[3]]></inptrslt><reptrslt><![CDATA[3]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[-]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[-]]></alertmark><amrmark><![CDATA[-]]></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10505]]></testcd><tclsscrnnm><![CDATA[Eosinophils]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[1]]></inptrslt><reptrslt><![CDATA[1]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[-]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[-]]></alertmark><amrmark><![CDATA[-]]></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10506]]></testcd><tclsscrnnm><![CDATA[Basophils]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[5]]></inptrslt><reptrslt><![CDATA[5]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[H]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[-]]></alertmark><amrmark><![CDATA[-]]></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10507]]></testcd><tclsscrnnm><![CDATA[Metamyelocytes]]></tclsscrnnm><rsltstat><![CDATA[-]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10508]]></testcd><tclsscrnnm><![CDATA[Myelocytes]]></tclsscrnnm><rsltstat><![CDATA[-]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10509]]></testcd><tclsscrnnm><![CDATA[Promyelocytes]]></tclsscrnnm><rsltstat><![CDATA[-]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10510]]></testcd><tclsscrnnm><![CDATA[Blasts]]></tclsscrnnm><rsltstat><![CDATA[-]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10515]]></testcd><tclsscrnnm><![CDATA[Prolymphocytes]]></tclsscrnnm><rsltstat><![CDATA[-]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10516]]></testcd><tclsscrnnm><![CDATA[Promonocytes]]></tclsscrnnm><rsltstat><![CDATA[-]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10517]]></testcd><tclsscrnnm><![CDATA[Plasma cells]]></tclsscrnnm><rsltstat><![CDATA[-]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10518]]></testcd><tclsscrnnm><![CDATA[Nucleated RBC]]></tclsscrnnm><rsltstat><![CDATA[-]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10519]]></testcd><tclsscrnnm><![CDATA[Others]]></tclsscrnnm><rsltstat><![CDATA[-]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10542]]></testcd><tclsscrnnm><![CDATA[Leukemic cells]]></tclsscrnnm><rsltstat><![CDATA[-]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10543]]></testcd><tclsscrnnm><![CDATA[Abnormal  lymphocyte]]></tclsscrnnm><rsltstat><![CDATA[-]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10544]]></testcd><tclsscrnnm><![CDATA[Reactive lymphocyte]]></tclsscrnnm><rsltstat><![CDATA[-]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10545]]></testcd><tclsscrnnm><![CDATA[Plasmacytoid lymphocyte]]></tclsscrnnm><rsltstat><![CDATA[-]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10599]]></testcd><tclsscrnnm><![CDATA[ANC 계산]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[11.2493]]></inptrslt><reptrslt><![CDATA[11.25]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[-]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[-]]></alertmark><amrmark><![CDATA[-]]></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR108]]></testcd><tclsscrnnm><![CDATA[Mean Corp Index]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt></inptrslt><reptrslt></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark></judgmark><deltamark></deltamark><panicmark></panicmark><criticalmark></criticalmark><alertmark></alertmark><amrmark></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10801]]></testcd><tclsscrnnm><![CDATA[MCV]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[92.4]]></inptrslt><reptrslt><![CDATA[92.4]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[-]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[-]]></alertmark><amrmark><![CDATA[-]]></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10802]]></testcd><tclsscrnnm><![CDATA[MCH]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[29.5]]></inptrslt><reptrslt><![CDATA[29.5]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[-]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[-]]></alertmark><amrmark><![CDATA[-]]></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR10803]]></testcd><tclsscrnnm><![CDATA[MCHC]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[32.0]]></inptrslt><reptrslt><![CDATA[32.0]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[-]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[-]]></alertmark><amrmark><![CDATA[-]]></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR007]]></tclscd><testcd><![CDATA[LHR123]]></testcd><tclsscrnnm><![CDATA[P-LCR]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[37.5]]></inptrslt><reptrslt><![CDATA[37.5]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[-]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[A]]></alertmark><amrmark><![CDATA[-]]></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR110]]></tclscd><testcd><![CDATA[LHR110]]></testcd><tclsscrnnm><![CDATA[Reticulocyte Count]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[3.21]]></inptrslt><reptrslt><![CDATA[3.21]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[H]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[-]]></alertmark><amrmark><![CDATA[-]]></amrmark></worklist><worklist><bcno><![CDATA[O288L54K0]]></bcno><tclscd><![CDATA[LHR110]]></tclscd><testcd><![CDATA[LHR11001]]></testcd><tclsscrnnm><![CDATA[Reticulocyte (Absolute)]]></tclsscrnnm><rsltstat><![CDATA[4]]></rsltstat><inptrslt><![CDATA[0.1262]]></inptrslt><reptrslt><![CDATA[0.1262]]></reptrslt><spcstat><![CDATA[4]]></spcstat><judgmark><![CDATA[-]]></judgmark><deltamark><![CDATA[-]]></deltamark><panicmark><![CDATA[-]]></panicmark><criticalmark><![CDATA[-]]></criticalmark><alertmark><![CDATA[-]]></alertmark><amrmark><![CDATA[-]]></amrmark>
     </worklist>
     <resultKM error="no" type="status" clear="true" description="info||정상 처리되었습니다." updateinstance="true" source="1724826500317"/>
</spcworklist>
</root>
    `;
    }
    ywmcFakeData() {
        return {
            success: true,
            data: {
                data: [
                    {
                        exam_ymd_unit: '20241108',
                        slip: 'H1        ',
                        wrk_no: 394,
                        exam_cd: '8HN109G_NRBC_F       ',
                        spc: '1W        ',
                        pt_no: '7227867 ',
                        rslt_typ: 'N         ',
                        text_rslt: '++',
                        numeric_rslt: ' ',
                        unit: ' ',
                        rslt_stus: 'F',
                        ref_stus: ' ',
                        pt_nm: '��**',
                        sex: 'M',
                        age: '072218',
                    },
                    {
                        exam_ymd_unit: '20241108',
                        slip: 'H1        ',
                        wrk_no: 394,
                        exam_cd: '8HN109G_NRBC_F',
                        spc: '1W        ',
                        pt_no: '7227867 ',
                        rslt_typ: 'N         ',
                        text_rslt: ' ',
                        numeric_rslt: '7.4',
                        unit: 'g/dL',
                        rslt_stus: 'F',
                        ref_stus: ' ',
                        pt_nm: '��**                          ',
                        sex: 'M',
                        age: '072218',
                    },
                    {
                        exam_ymd_unit: '20241108',
                        slip: 'H1        ',
                        wrk_no: 394,
                        exam_cd: '8HN109G_ATYP_FRAG ',
                        spc: '1W        ',
                        pt_no: '7227867 ',
                        rslt_typ: 'N         ',
                        text_rslt: ' ',
                        numeric_rslt: '32.9',
                        unit: 'g/dL',
                        rslt_stus: 'F',
                        ref_stus: ' ',
                        pt_nm: '��**                          ',
                        sex: 'M',
                        age: '072218',
                    },
                    {
                        exam_ymd_unit: '20241108',
                        slip: 'H1        ',
                        wrk_no: 394,
                        exam_cd: '8HN109GIG_F       ',
                        spc: '1W        ',
                        pt_no: '7227867 ',
                        rslt_typ: 'N         ',
                        text_rslt: ' ',
                        numeric_rslt: '105.3',
                        unit: 'E9/L',
                        rslt_stus: 'F',
                        ref_stus: 'H',
                        pt_nm: '��**                          ',
                        sex: 'M',
                        age: '072218',
                    },
                    {
                        exam_ymd_unit: '20241108',
                        slip: 'H1        ',
                        wrk_no: 394,
                        exam_cd: '8HN109GBL_F       ',
                        spc: '1W        ',
                        pt_no: '7227867 ',
                        rslt_typ: 'N         ',
                        text_rslt: ' ',
                        numeric_rslt: '4.47',
                        unit: '%',
                        rslt_stus: 'F',
                        ref_stus: 'H',
                        pt_nm: '��**                          ',
                        sex: 'M',
                        age: '072218',
                    },
                ],
            },
            code: 200,
        };
    }
    async fetchExternalData(queryParams) {
        const queryParamsCopy = { ...queryParams };
        delete queryParamsCopy.baseUrl;
        const queryString = new URLSearchParams(queryParamsCopy).toString();
        const url = `${queryParams.baseUrl}?${queryString}`;
        this.logger.cbcLis(`cbc-service-fetchExternalData: ${url}`);
        const curlCommand = `curl -s "${url}"`;
        try {
            const { stdout, stderr } = await execPromise(curlCommand);
            if (stderr) {
                this.logger.cbcLis(`Curl stderr lis err:, ${stderr}`);
            }
            this.logger.cbcLis(`cbcLis 응답 값:, ${stdout}`);
            return stdout;
        }
        catch (error) {
            this.logger.cbcLis(`cbcLis error.message:, ${error.message}`);
        }
    }
    async executePostCurl(bodyParams) {
        const url = bodyParams.baseUrl;
        delete bodyParams.baseUrl;
        const jsonBody = JSON.stringify(bodyParams)
            .replace(/\|/g, '\\\\')
            .replace(/"/g, '\\"');
        this.logger.cbcLis(`lis-service-executePostCurl: ${url}`);
        const curlCommand = `curl -X POST -H "Content-Type: application/json" -d "${jsonBody}" "${url}`;
        try {
            const { stdout, stderr } = await execPromise(curlCommand);
            if (stderr) {
                this.logger.cbcLis(`Curl stderr lis err:, ${stderr}`);
            }
            this.logger.cbcLis(`lis 응답 값:, ${stdout}`);
            return stdout;
        }
        catch (error) {
            this.logger.cbcLis(`lis error.message:, ${error.message}`);
        }
    }
};
exports.CbcService = CbcService;
exports.CbcService = CbcService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], CbcService);
//# sourceMappingURL=cbc.service.js.map