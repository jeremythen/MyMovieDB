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
    UserError["USER_NOT_FOUND"] = "USER_NOT_FOUND";
    UserError["USER_INVALID_ROLE"] = "USER_INVALID_ROLE";
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
    MovieError["ACTOR_INVALID_PAYLOAD"] = "ACTOR_INVALID_PAYLOAD";
    MovieError["ACTOR_INVALID_ID"] = "ACTOR_INVALID_ID";
    MovieError["ACTOR_NOT_FOUND"] = "ACTOR_NOT_FOUND";
    MovieError["DIRECTOR_INVALID_PAYLOAD"] = "DIRECTOR_INVALID_PAYLOAD";
    MovieError["DIRECTOR_INVALID_ID"] = "DIRECTOR_INVALID_ID";
    MovieError["DIRECTOR_NOT_FOUND"] = "DIRECTOR_NOT_FOUND";
    MovieError["MOVIE_INVALID_GET_REVIEW_PAYLOAD"] = "MOVIE_INVALID_GET_REVIEW_PAYLOAD";
    MovieError["REVIEW_INVALID_ID"] = "REVIEW_INVALID_ID";
})(MovieError = exports.MovieError || (exports.MovieError = {}));
