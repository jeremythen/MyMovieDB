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
const Movie_1 = __importDefault(require("../db/models/movie/Movie"));
class MoviesRepository {
    getMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Movie_1.default.findAll();
        });
    }
    getMovieById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Movie_1.default.findOne({ where: { id } });
        });
    }
    createMovie(movieCreationPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, year, country, distributor = '', time = 0, language = '', disabled = false, } = movieCreationPayload;
            const movie = yield Movie_1.default.create({
                title,
                year,
                country,
                distributor,
                time,
                language,
                disabled,
            });
            return movie;
        });
    }
}
const moviesRepository = Object.freeze(new MoviesRepository());
exports.default = moviesRepository;
