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
const emaillog_service_1 = __importDefault(require("../services/emaillog.service"));
const log = (0, debug_1.default)('app:email-controller');
class EmailController {
    getEmails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = req.query.limit && parseInt(req.query.limit);
                const page = req.query.page && parseInt(req.query.page);
                const emails = yield emaillog_service_1.default.list(limit, page);
                return res.status(200).send(emails);
            }
            catch (err) {
                log('getEmails error: %O', err);
                return res.status(500).send();
            }
        });
    }
}
exports.default = new EmailController();
//# sourceMappingURL=email.controller.js.map