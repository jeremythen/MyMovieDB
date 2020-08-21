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
const Director_1 = __importDefault(require("../db/models/movie/Director"));
class DirectorRepository {
    getDirectors() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Director_1.default.findAll();
        });
    }
    getDirectorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Director_1.default.findAll({ where: { id } });
        });
    }
    createDirector(crateDirectorPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName } = crateDirectorPayload;
            // Clean copy of specific properties.
            const directorData = { firstName, lastName };
            return yield Director_1.default.create(directorData);
        });
    }
}
const directorRepository = Object.freeze(new DirectorRepository());
exports.default = directorRepository;
