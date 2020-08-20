"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.UserError = void 0;
var UserError;
(function (UserError) {
    UserError["USER_INVALID_PAYLOAD"] = "USER_INVALID_PAYLOAD";
    UserError["USER_EMAIL_EXISTS"] = "USER_EMAIL_EXISTS";
    UserError["USER_USERNAME_EXISTS"] = "USER_USERNAME_EXISTS";
    UserError["USER_CREATE_ERROR"] = "USER_CREATE_ERROR";
    UserError["USER_INVALID_CREDENTIALS"] = "USER_INVALID_CREDENTIALS";
    UserError["USER_UNKNOWN_ERROR"] = "USER_UNKNOWN_ERROR";
})(UserError = exports.UserError || (exports.UserError = {}));
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
})(Role = exports.Role || (exports.Role = {}));
