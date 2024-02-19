import { createId } from "@paralleldrive/cuid2"
import debug from "debug"
import mongooseService from "../../../common/services/mongoose.service"
import { CreateEmailLogDto } from "../dto/create.emaillog.dto"

const log: debug.IDebugger = debug('app:email-dao')

class EmailDao {
    constructor() {
        log('Created new instance of EmailDao')
    }

    Schema = mongooseService.getMongoose().Schema

    emailSchema = new this.Schema({
        _id: String,
        date: Date,
        reason: String,

        data: String,
        to_user: String,

        from: String,
        to: String,
        subject: String,
        text: String,

    })

    Email = mongooseService.getMongoose().model('EmailLog', this.emailSchema)

    async AddEmailLog(emailFields: CreateEmailLogDto) {
        const EmailLogId = createId()
        const email = new this.Email({
            _id: EmailLogId,
            date: new Date(),
            ...emailFields
        })
        await email.save()
        return email._id
    }

    async getEmailLogById(emailId: string) {
        return this.Email.findById(emailId).exec()
    }

    async getEmailLogsByEmail(email: string) {
        return this.Email.find({ email: { $regex: '.*' + email + '.*' } }).exec()
    }

    async getEmailLogs(limit = 25, page = 0) {
        return this.Email.find()
            .limit(limit)
            .skip(limit * page)
            .exec()
    }
}
export default new EmailDao()