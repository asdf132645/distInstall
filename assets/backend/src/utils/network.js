"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isServerRunningLocally = void 0;
const os = require("os");
async function isServerRunningLocally() {
    const networkInterfaces = os.networkInterfaces();
    for (const name of Object.keys(networkInterfaces)) {
        for (const net of networkInterfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
}
exports.isServerRunningLocally = isServerRunningLocally;
//# sourceMappingURL=network.js.map