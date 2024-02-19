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
const axios_1 = __importDefault(require("axios"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:email-template-service');
class EmailTemplateService {
    constructor() {
        this.email_template_url = '';
        if (!process.env.EMAIL_TEMPLATE_URL) {
            log('EMAIL_TEMPLATE_URL is not set in .env file');
            throw new Error('EMAIL_TEMPLATE_URL is not set in .env file');
        }
        this.email_template_url = process.env.EMAIL_TEMPLATE_URL;
        this.email_template_url = 'https://surcoteca-web.vercel.app/emails/';
    }
    getTemplate(templateName) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.email_template_url}${templateName}`);
            return response.data;
        });
    }
}
exports.default = new EmailTemplateService();
//# sourceMappingURL=email-template.service.js.map