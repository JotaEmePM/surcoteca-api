"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumRoutes = void 0;
const common_permission_middleware_1 = __importDefault(require("../../common/middleware/common.permission.middleware"));
const common_permissionflag_enum_1 = require("../../common/middleware/common.permissionflag.enum");
const common_routes_config_1 = require("../../common/common.routes.config");
const jwt_middleware_1 = __importDefault(require("../auth/middleware/jwt.middleware"));
const albums_controller_1 = __importDefault(require("./controllers/albums.controller"));
class AlbumRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'AlbumRoutes');
    }
    configureRoutes() {
        this.app.route(`/albums`)
            .get((req, res) => {
            albums_controller_1.default.listAlbums(req, res);
        })
            .post(jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION), albums_controller_1.default.createAlbum);
        return this.app;
    }
}
exports.AlbumRoutes = AlbumRoutes;
//# sourceMappingURL=albums.routes.config.js.map