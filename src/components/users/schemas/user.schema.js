"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSchema = exports.UserEntity = void 0;
var mongoose_1 = require("mongoose");
var swagger_1 = require("@nestjs/swagger");
var mongodb_1 = require("mongodb");
var roles_decorator_1 = require("@decorators/roles.decorator");
var user_constants_1 = require("../user-constants");
var UserEntity = /** @class */ (function (_super) {
    __extends(UserEntity, _super);
    function UserEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._id = new mongodb_1.ObjectId();
        _this.name = '';
        _this.email = '';
        _this.password = '';
        _this.verified = true;
        _this.role = roles_decorator_1.RolesEnum.user;
        return _this;
    }
    __decorate([
        swagger_1.ApiProperty({ type: String })
    ], UserEntity.prototype, "_id");
    __decorate([
        swagger_1.ApiProperty({ type: String })
    ], UserEntity.prototype, "name");
    __decorate([
        swagger_1.ApiProperty({ type: String })
    ], UserEntity.prototype, "email");
    __decorate([
        swagger_1.ApiProperty({ type: String })
    ], UserEntity.prototype, "password");
    __decorate([
        swagger_1.ApiProperty({ type: Boolean })
    ], UserEntity.prototype, "verified");
    __decorate([
        swagger_1.ApiProperty({ type: 'enum', "enum": roles_decorator_1.RolesEnum })
    ], UserEntity.prototype, "role");
    return UserEntity;
}(mongoose_1.Document));
exports.UserEntity = UserEntity;
exports.UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verifed: {
        type: Boolean,
        "default": true,
        required: true
    },
    role: {
        type: roles_decorator_1.RolesEnum,
        "default": roles_decorator_1.RolesEnum.user,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: user_constants_1["default"].models.users
});
