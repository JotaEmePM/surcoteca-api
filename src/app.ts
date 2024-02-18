import express from 'express'
import * as http from 'http'

import cors from 'cors'
import * as expressWinston from 'express-winston'
import * as winston from 'winston'

import { CommonRoutesConfig } from './common/common.routes.config'

import debug from 'debug'
import dotenv from 'dotenv'
import helmet from 'helmet'

import emailTemplateService from './common/services/email-template.service'
import resendService from './common/services/resend.service'

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const port = 3001
const routes: Array<CommonRoutesConfig> = []
const debugLog: debug.IDebugger = debug('app')

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

app.use(express.json())
app.use(cors())

const loggetOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    )
}

if (!process.env.DEBUG) {
    loggetOptions.meta = false
}

app.use(expressWinston.logger(loggetOptions))
app.use(helmet())

// Routes
// routes.push(new UsersRoutes(app))
// routes.push(new AuthRoutes(app));

// Surcoteca-API
//routes.push(new ArtistRoutes(app))
//routes.push(new AlbumRoutes(app))

// End Routes

const runningMessage = `Server running at http://localhost:${port}`
app.get('/', async (req: express.Request, res: express.Response) => {
    const template = await emailTemplateService.getTemplate('welcome')
    const responseResend = resendService.sendEmail({
        to: 'perezmjosem@gmail.com',
        subject: 'Bienvenido a Surcoteca',
        html: template,
        from: 'test@surcoteca.cl'
    })
    debugLog(`template: ${template}`)
    debugLog(`responseResend: ${responseResend}`)
    res.status(200).send(JSON.stringify(template && responseResend))
})

server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`)
    })
    console.log(runningMessage)
})