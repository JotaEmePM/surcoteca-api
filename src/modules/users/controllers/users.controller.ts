import argon2 from 'argon2';
import debug from 'debug';
import express from 'express';
import emailTemplateService from '../../../common/services/email-template.service';
import resendService from '../../../common/services/resend.service';
import { PatchUserDto } from '../dto/patch.user.dto';
import usersService from '../services/users.service';

const log: debug.IDebugger = debug('app:users-controller');
class UsersController {
    async listUsers(req: express.Request, res: express.Response) {
        const users = await usersService.list(100, 0);
        res.status(200).send(users);
    }

    async getUserById(req: express.Request, res: express.Response) {
        const user = await usersService.readById(req.body.id);
        res.status(200).send(user);
    }

    async createUser(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        const userId = await usersService.create(req.body);

        if (userId === 'error') {
            res.status(403).send({ error: 'User already exists' });
        } else {
            const welcomeTemplate = await emailTemplateService.getTemplate('welcome')
            const responseResend = await resendService.sendEmail({
                to: req.body.email,
                subject: 'Bienvenido a Surcoteca',
                html: welcomeTemplate,
                from: 'no-reply@jotaemepm.dev'
            })
            res.status(201).send({ id: userId, resend: responseResend });
        }
    }

    async patch(req: express.Request, res: express.Response) {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password);
        }
        log(await usersService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        log(await usersService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeUser(req: express.Request, res: express.Response) {
        log(await usersService.deleteById(req.body.id));
        res.status(204).send();
    }

    async updatePermissionFlags(req: express.Request, res: express.Response) {
        const patchUserDto: PatchUserDto = {
            permissionFlags: parseInt(req.params.permissionFlags),
        }
        log(await usersService.patchById(req.body.id, patchUserDto))
        res.status(204).send()
    }
}

export default new UsersController();