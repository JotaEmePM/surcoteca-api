import debug from "debug";
import { Resend } from "resend";
import { ResendEmailData } from "../interfaces/resend.interface";

const log: debug.IDebugger = debug('app:resend-service');

class ResendService {
    private resend_api_key = '';
    private dotenv = require('dotenv');

    constructor() {
        this.dotenv.config();
        if (!process.env.RESEND_API_KEY) {
            log('RESEND_API_KEY is not set in .env file')
            throw new Error('RESEND_API_KEY is not set in .env file')
        }
        this.resend_api_key = process.env.RESEND_API_KEY;
    }

    public async sendEmail(resendData: ResendEmailData) {
        const resend = new Resend(this.resend_api_key)
        const response = await resend.emails.send({
            ...resendData
        })
        return response
    }
}

export default new ResendService()