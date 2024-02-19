
import permissionMiddleware from '../../common/middleware/common.permission.middleware';
import { PermissionFlag } from "../../common/middleware/common.permissionflag.enum";

import { CommonRoutesConfig } from '../../common/common.routes.config';
import jwtMiddleware from "../auth/middleware/jwt.middleware";
import albumsController from "./controllers/albums.controller";

export class AlbumRoutes extends CommonRoutesConfig {
    constructor(app: any) {
        super(app, 'AlbumRoutes');
    }

    configureRoutes() {
        this.app.route(`/albums`)
            .get((req, res) => {
                albumsController.listAlbums(req, res);
            })
            .post(
                jwtMiddleware.validJWTNeeded,
                permissionMiddleware.permissionFlagRequired(
                    PermissionFlag.ADMIN_PERMISSION
                ),
                albumsController.createAlbum
            );

        return this.app;
    }
}