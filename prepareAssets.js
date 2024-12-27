const fs = require("fs-extra");
const path = require("path");

// 원본 경로
const frontendSource = "C:/workspace/pbbm/frontend/dist";
const backendSource = "C:/workspace/pbbm/newserver/dist";

// 대상 경로
const assetsDir = path.join(__dirname, "assets");
const frontendDest = path.join(assetsDir, "frontend");
const backendDest = path.join(assetsDir, "backend");
const versionFile = path.join(assetsDir, "version.txt");

// 초기화
fs.emptyDirSync(assetsDir);

// 파일 복사
fs.copySync(frontendSource, frontendDest);
fs.copySync(backendSource, backendDest);

// 버전 파일 생성
fs.writeFileSync(versionFile, "UI-2.00.88");
