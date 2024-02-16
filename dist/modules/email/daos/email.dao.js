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
const mongoose_service_1 = __importDefault(require("@/common/services/mongoose.service"));
const cuid2_1 = require("@paralleldrive/cuid2");
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:email-dao');
class EmailDao {
    constructor() {
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.emailSchema = new this.Schema({
            _id: String,
            date: Date,
            reason: String,
            data: String,
            to_user: String,
            from: String,
            to: String,
            subject: String,
            text: String,
        });
        this.Email = mongoose_service_1.default.getMongoose().model('EmailLog', this.emailSchema);
        log('Created new instance of EmailDao');
    }
    AddEmailLog(emailFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const EmailLogId = (0, cuid2_1.createId)();
            const email = new this.Email(Object.assign({ _id: EmailLogId, date: new Date() }, emailFields));
            yield email.save();
            return email._id;
        });
    }
    getEmailLogById(emailId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Email.findById(emailId).exec();
        });
    }
    getEmailLogsByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Email.find({ email: { $regex: '.*' + email + '.*' } }).exec();
        });
    }
    getEmailLogs(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Email.find()
                .limit(limit)
                .skip(limit * page)
                .exec();
        });
    }
}
exports.default = new EmailDao();
//# sourceMappingURL=email.dao.js.map