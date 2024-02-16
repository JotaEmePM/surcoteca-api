"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistRoutes = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const common_routes_config_1 = require("@/common/common.routes.config");
const common_permission_middleware_1 = __importDefault(require("@/common/middleware/common.permission.middleware"));
const common_permissionflag_enum_1 = require("@/common/middleware/common.permissionflag.enum");
const jwt_middleware_1 = __importDefault(require("../auth/middleware/jwt.middleware"));
const artists_controller_1 = __importDefault(require("./controllers/artists.controller"));
class ArtistRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'ArtistRoutes');
    }
    configureRoutes() {
        this.app.route(`/artists`)
            .get(artists_controller_1.default.listArtists)
            .post(jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION), 
        // TODO: Validation
        artists_controller_1.default.createArtist);
        return this.app;
    }
}
exports.ArtistRoutes = ArtistRoutes;
//# sourceMappingURL=artist.routes.config.js.map