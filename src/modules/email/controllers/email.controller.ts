import debug from "debug"
import express from "express"

import emailService from "../services/emaillog.service"

const log: debug.IDebugger = debug('app:email-controller')

class EmailController {
    async getEmails(req: express.Request, res: express.Response) {
        try {
            const limit = req.query.limit && parseInt(req.query.limit as string)
            const page = req.query.page && parseInt(req.query.page as string)
            const emails = await emailService.list(limit as number, page as number)
            return res.status(200).send(emails)
        } catch (err) {
            log('getEmails error: %O', err)
            return res.status(500).send()
        }
    }
}

export default new EmailController()