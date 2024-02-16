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
const email_dao_1 = __importDefault(require("../daos/email.dao"));
class EmailLogService {
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return email_dao_1.default.getEmailLogs(limit, page);
        });
    }
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return email_dao_1.default.AddEmailLog(resource);
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return email_dao_1.default.getEmailLogById(id);
        });
    }
    // The following methods are not implemented in este servicio ya que no se requiere de modificaciones o eliminaciones.
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () { throw new Error('Method not implemented.'); });
    }
    putById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () { throw new Error('Method not implemented.'); });
    }
    patchById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () { throw new Error('Method not implemented.'); });
    }
}
exports.default = new EmailLogService();
//# sourceMappingURL=emaillog.service.js.map