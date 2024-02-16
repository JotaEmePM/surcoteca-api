import { CommonRoutesConfig } from "@/common/common.routes.config";
import express from 'express';

export class EmailRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'EmailRoutes');
    }

    configureRoutes(): express.Application {
        this.app.get(`/email`, [            
            // TODO: add getOperation
        ]);
        return this.app;
    }
}