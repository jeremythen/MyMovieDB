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
const Actor_1 = __importDefault(require("../models/movie/Actor"));
const seeds = envConfig_1.default.seqSeeds;
module.exports = {
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        const actors = [];
        for (let i = 0; i < seeds; i++) {
            actors.push({
                firstName: faker_1.default.name.firstName(),
                lastName: faker_1.default.name.lastName(),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        yield queryInterface.bulkInsert(Actor_1.default.tableName, actors);
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete(Actor_1.default.tableName, {}, {});
    }),
};
