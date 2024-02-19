import axios from "axios";
import debug from "debug";

const log: debug.IDebugger = debug('app:email-template-service');

class EmailTemplateService {
    private email_template_url = '';

    constructor() {
        if (!process.env.EMAIL_TEMPLATE_URL) {
            log('EMAIL_TEMPLATE_URL is not set in .env file')
            throw new Error('EMAIL_TEMPLATE_URL is not set in .env file')
        }
        this.email_template_url = process.env.EMAIL_TEMPLATE_URL;
        this.email_template_url = 'https://surcoteca-web.vercel.app/emails/'
    }

    public async getTemplate(templateName: string) {
        const response = await axios.get(`${this.email_template_url}${templateName}`)
        return response.data
    }
}

export default new EmailTemplateService()