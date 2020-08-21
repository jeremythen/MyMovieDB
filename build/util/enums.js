"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieError = exports.Role = exports.UserError = void 0;
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
var MovieError;
(function (MovieError) {
    MovieError["MOVIE_INVALID_PAYLOAD"] = "MOVIE_INVALID_PAYLOAD";
    MovieError["MOVIE_INVALID_REVIEW_PAYLOAD"] = "MOVIE_INVALID_REVIEW_PAYLOAD";
    MovieError["MOVIE_NOT_FOUND"] = "MOVIE_NOT_FOUND";
    MovieError["REVIEWER_NOT_FOUND"] = "REVIEWER_NOT_FOUND";
    MovieError["MOVIE_INVALID_ID"] = "MOVIE_INVALID_ID";
    MovieError["MOVIE_INVALID_OFFSET_LIMIT"] = "MOVIE_INVALID_OFFSET_LIMIT";
})(MovieError = exports.MovieError || (exports.MovieError = {}));
