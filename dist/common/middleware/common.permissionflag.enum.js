"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionFlag = void 0;
var PermissionFlag;
(function (PermissionFlag) {
    PermissionFlag[PermissionFlag["FREE_PERMISSION"] = 1] = "FREE_PERMISSION";
    PermissionFlag[PermissionFlag["PAID_PERMISSION"] = 2] = "PAID_PERMISSION";
    PermissionFlag[PermissionFlag["ANOTHER_PAID_PERMISSION"] = 4] = "ANOTHER_PAID_PERMISSION";
    PermissionFlag[PermissionFlag["ADMIN_PERMISSION"] = 8] = "ADMIN_PERMISSION";
    PermissionFlag[PermissionFlag["ALL_PERMISSIONS"] = 2147483647] = "ALL_PERMISSIONS";
})(PermissionFlag || (exports.PermissionFlag = PermissionFlag = {}));
//# sourceMappingURL=common.permissionflag.enum.js.map