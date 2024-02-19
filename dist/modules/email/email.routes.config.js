"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRoutes = void 0;
const common_routes_config_1 = require("../../common/common.routes.config");
class EmailRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'EmailRoutes');
    }
    configureRoutes() {
        this.app.get(`/email`, [
        // TODO: add getOperation
        ]);
        return this.app;
    }
}
exports.EmailRoutes = EmailRoutes;
//# sourceMappingURL=email.routes.config.js.map