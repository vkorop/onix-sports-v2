"use strict";
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var RequestUser = common_1.createParamDecorator(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    return request.user;
});
exports["default"] = RequestUser;
