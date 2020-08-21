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
        const movies = [];
        for (let i = 0; i < seeds; i++) {
            movies.push({
                title: faker_1.default.lorem.words(),
                year: getYear(),
                time: getRandomTime(),
                language: 'English',
                country: faker_1.default.address.country(),
                distributor: 'Universal Pictures',
                disabled: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        yield queryInterface.bulkInsert("movies", movies);
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete("movies", {}, {});
    }),
};
const years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
const getYear = () => {
    return years[Math.floor(Math.random() * years.length)];
};
const getRandomTime = () => {
    const min = 60;
    const max = 160;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
