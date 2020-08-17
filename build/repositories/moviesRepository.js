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
const connection_1 = __importDefault(require("../db/connection"));
const GET_ALL_MOVIES_QUERY = "SELECT id, title, year, time, lang, country, created_at FROM movies";
;
class MoviesRepository {
    getMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield new Promise((resolve, reject) => {
                    connection_1.default.query(GET_ALL_MOVIES_QUERY, (err, result) => {
                        if (err) {
                            return reject(new Error(err.message));
                        }
                        resolve(result);
                    });
                });
                return response;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
const moviesRepository = Object.freeze(new MoviesRepository());
exports.default = moviesRepository;
