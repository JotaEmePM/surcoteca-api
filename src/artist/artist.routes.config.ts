/* eslint-disable @typescript-eslint/no-explicit-any */
import jwtMiddleware from "../auth/middleware/jwt.middleware";
import { CommonRoutesConfig } from "../common/common.routes.config";
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from "../common/middleware/common.permissionflag.enum";
import artistsController from "./controllers/artists.controller";

export class ArtistRoutes extends CommonRoutesConfig {
    constructor(app: any) {
        super(app, 'ArtistRoutes');
    }

    configureRoutes() {
        this.app.route(`/artists`)
            .get(
                artistsController.listArtists
            )
            .post(
                jwtMiddleware.validJWTNeeded,
                permissionMiddleware.permissionFlagRequired(
                    PermissionFlag.ADMIN_PERMISSION
                ),      
                // TODO: Validation
                artistsController.createArtist          
            );



        return this.app;
    }
}