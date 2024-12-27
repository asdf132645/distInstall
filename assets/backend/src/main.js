"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const child_process_1 = require("child_process");
async function bootstrap() {
    const httpApp = await core_1.NestFactory.create(app_module_1.AppModule, {
        rawBody: true,
    });
    httpApp.use(bodyParser.json({ limit: '50mb' }));
    httpApp.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    httpApp.use(bodyParser.text({ limit: '50mb', type: 'text/plain' }));
    const corsOptions = {
        origin: [
            'http://192.168.0.131:8080',
            'http://192.168.0.115:8080',
            'http://127.0.0.1:8080',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    };
    console.log(corsOptions.origin[0]);
    httpApp.enableCors(corsOptions);
    httpApp.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('api 정의')
        .setDescription('uimd 웹 백엔드 req, res 정의')
        .setVersion('1.0')
        .addTag('your-tag')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(httpApp, config);
    swagger_1.SwaggerModule.setup('api', httpApp, document);
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'uimd5191!',
    });
    await connection.query('SET GLOBAL sort_buffer_size = 4*1024*1024;');
    console.log('MySQL sort_buffer_size 설정 완료');
    await connection.end();
    if (corsOptions.origin[0] === 'http://192.168.2.229:8080') {
        const expressServerPath = 'C:\\Users\\user\\AppData\\Local\\Programs\\UIMD\\ywmc-server';
        const expressServer = (0, child_process_1.spawn)('npm', ['start'], {
            cwd: expressServerPath,
            stdio: 'inherit',
            shell: true,
        });
        expressServer.on('close', (code) => {
            console.log(`Express 서버가 종료되었습니다. 종료 코드: ${code}`);
        });
    }
    await httpApp.listen(3002);
}
bootstrap();
//# sourceMappingURL=main.js.map