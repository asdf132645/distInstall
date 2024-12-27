const path = require("path");
const fs = require("fs-extra");

// 설치 경로
const userLocalData = path.join(process.env.LOCALAPPDATA || "C:\\Users\\user\\AppData\\Local");
const installDir = path.join(userLocalData, "Programs", "UIMD", "web");
const frontendDest = path.join(installDir, "frontend");
const backendDest = path.join(installDir, "backend");

// pkg 내부 자원 경로
const frontendSource = path.join(__dirname, "assets/frontend");
const backendSource = path.join(__dirname, "assets/backend");
const versionFilePath = path.join(__dirname, "assets/version.txt");

// 디렉터리 생성 함수
const createDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
};

// 파일 복사 함수
const copyFiles = (sourceDir, destDir) => {
    fs.readdirSync(sourceDir, { withFileTypes: true }).forEach((entry) => {
        const srcPath = path.join(sourceDir, entry.name);
        const destPath = path.join(destDir, entry.name);

        if (entry.isDirectory()) {
            createDir(destPath);
            copyFiles(srcPath, destPath); // 재귀적으로 디렉토리 처리
        } else {
            try {
                fs.copyFileSync(srcPath, destPath);
                console.log(`Copied file: ${srcPath} -> ${destPath}`);
            } catch (error) {
                console.error(`Failed to copy: ${srcPath} -> ${destPath}`, error.message);
            }
        }
    });
};

// 동적 파일명 가져오기
const getDynamicFileName = () => {
    if (fs.existsSync(versionFilePath)) {
        const version = fs.readFileSync(versionFilePath, "utf-8").trim();
        return version || "UI-default";
    }
    return "UI-default";
};

// 현재 실행 파일 복사하여 새로운 exe 생성
const createNewExe = () => {
    const newExeName = `${getDynamicFileName()}.exe`;
    const newExePath = path.join(installDir, newExeName);

    try {
        fs.copyFileSync(process.execPath, newExePath);
        console.log(`Created new exe: ${newExePath}`);
    } catch (error) {
        console.error("Failed to create new exe file:", error.message);
    }
};

// 설치 로직
const install = () => {
    console.log("Starting installation...");

    // 설치 경로 생성
    createDir(frontendDest);
    createDir(backendDest);

    console.log("Copying frontend files...");
    copyFiles(frontendSource, frontendDest);

    console.log("Copying backend files...");
    copyFiles(backendSource, backendDest);

    console.log("Installation completed successfully!");

    // 새로운 exe 생성
    // createNewExe();
};

// 실행
install();
