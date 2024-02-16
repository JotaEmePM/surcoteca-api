"use strict";
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
const debug_1 = __importDefault(require("debug"));
const resend_1 = require("resend");
const log = (0, debug_1.default)('app:resend-service');
class ResendService {
    constructor() {
        this.resend_api_key = '';
        if (!process.env.RESEND_API_KEY) {
            log('RESEND_API_KEY is not set in .env file');
            throw new Error('RESEND_API_KEY is not set in .env file');
        }
        this.resend_api_key = process.env.RESEND_API_KEY;
    }
    sendEmail(resendData) {
        return __awaiter(this, void 0, void 0, function* () {
            const resend = new resend_1.Resend(this.resend_api_key);
            const response = yield resend.emails.send(Object.assign({}, resendData));
            return response;
        });
    }
}
exports.default = new ResendService();
//# sourceMappingURL=resend.service.js.map