"use strict";
exports.__esModule = true;
exports.Roles = exports.RolesEnum = void 0;
var common_1 = require("@nestjs/common");
// eslint-disable-next-line no-shadow
var RolesEnum;
(function (RolesEnum) {
    RolesEnum["admin"] = "admin";
    RolesEnum["user"] = "user";
})(RolesEnum = exports.RolesEnum || (exports.RolesEnum = {}));
var Roles = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return common_1.SetMetadata('roles', roles);
};
exports.Roles = Roles;
