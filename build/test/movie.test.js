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
process.env.NODE_ENV = 'test';
const chai_1 = require("chai");
const moviesService_1 = __importDefault(require("../services/moviesService"));
const connection_1 = __importDefault(require("../db/connection"));
before(function () {
    connection_1.default.models.Movie.destroy({ where: {}, truncate: true });
});
describe('Movies tests', () => {
    it('Get movies response has an array of movies', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield moviesService_1.default.getMovies();
        console.log('response', response);
        chai_1.expect(response === null).to.be.false;
        chai_1.expect(response.success).to.be.true;
        chai_1.expect(Array.isArray(response.data.movies)).to.be.true;
    }));
});
describe('Add movie', () => {
    it('Adding a movie', () => __awaiter(void 0, void 0, void 0, function* () {
        const moviePayload = {
            title: "My new movie",
            year: 2018,
            time: 135,
            language: "English",
            country: "RD",
            distributor: "Universal Pictures"
        };
        const response = yield moviesService_1.default.createMovie(moviePayload);
        chai_1.expect(response === null, 'Expecting response to not be null').to.be.false;
        chai_1.expect(response.success, 'Expecting response to be successful').to.be.true;
        chai_1.expect(response.data.movie, 'Expecting new movie to be present in the response').to.not.be.null;
    }));
});
