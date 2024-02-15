"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const cors_1 = __importDefault(require("cors"));
const expressWinston = __importStar(require("express-winston"));
const winston = __importStar(require("winston"));
const users_routes_config_1 = require("./users/users.routes.config");
const debug_1 = __importDefault(require("debug"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const artist_routes_config_1 = require("./artist/artist.routes.config");
const auth_routes_config_1 = require("./auth/auth.routes.config");
const app = (0, express_1.default)();
const server = http.createServer(app);
const port = 3001;
const routes = [];
const debugLog = (0, debug_1.default)('app');
const dotenvResult = dotenv_1.default.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const loggetOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true }))
};
if (!process.env.DEBUG) {
    loggetOptions.meta = false;
}
app.use(expressWinston.logger(loggetOptions));
app.use((0, helmet_1.default)());
// Routes
routes.push(new users_routes_config_1.UsersRoutes(app));
routes.push(new auth_routes_config_1.AuthRoutes(app));
// Surcoteca-API
routes.push(new artist_routes_config_1.ArtistRoutes(app));
// End Routes
const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send(runningMessage);
}));
server.listen(port, () => {
    routes.forEach((route) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    console.log(runningMessage);
});
//# sourceMappingURL=app.js.map