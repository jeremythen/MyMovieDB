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
const faker_1 = __importDefault(require("faker"));
const envConfig_1 = __importDefault(require("../../config/envConfig"));
const seeds = envConfig_1.default.seqSeeds;
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        const movieCasts = [];
        for (let i = 0; i < seeds; i++) {
            movieCasts.push({
                actorId: i + 1,
                movieId: i + 1,
                role: faker_1.default.name.findName(),
            });
        }
        yield queryInterface.bulkInsert("movie_casts", movieCasts);
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete("movie_casts", {}, {});
    }),
};
