"use strict";

import { QueryInterface } from "sequelize";
import Genre from '../models/movie/Genre';

module.exports = {
  up: async (queryInterface: QueryInterface) => {

    const genresMapped = genres.map(title => {
      return {
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    await queryInterface.bulkInsert(Genre.tableName, genresMapped);
  
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete(Genre.tableName, {}, {});
  },
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