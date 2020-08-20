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
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        const genresMapped = genres.map(title => ({ title }));
        yield queryInterface.bulkInsert("genres", genresMapped);
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete("genres", {}, {});
    }),
};
const genres = [
    "ACTION",
    "ADVENTURE",
    "COMEDY",
    "CRIME",
    "DRAMA",
    "FANTASY",
    "HISTORICAL",
    "HORROR",
    "ROMANCE",
    "SAGA",
    "SOCIAL",
    "THRILLER",
    "URBAN",
    "MYSTERY",
    "POLITICAL",
    "MAGICAL_REALISM",
    "PHILOSOPHICAL",
    "SPECULATIVE",
    "WESTERN",
    "PARANOID_FICTION",
    "HISTORICAL_FICTION",
    "ABSURDIST",
    "SURREAL",
    "WHIMSICAL"
];
