"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const actorService_1 = __importDefault(require("../services/actorService"));
const util_1 = require("../util/util");
const Router = express_1.default.Router();
Router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield actorService_1.default.getActors();
    util_1.handleCommonResponse(response, res);
}));
Router.post("/", authMiddleware_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield actorService_1.default.createActor(req.body);
    util_1.handleCommonResponse(response, res);
}));
Router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const response = yield actorService_1.default.getActorById(id);
    util_1.handleCommonResponse(response, res);
}));
Router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const response = yield actorService_1.default.deleteActorById(id);
    util_1.handleCommonResponse(response, res);
}));
exports.default = Router;
