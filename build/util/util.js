"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareResponse = void 0;
exports.prepareResponse = (data, success, errorCode = "", errorMessage = "") => {
    return { data, success, errorCode, errorMessage };
};
