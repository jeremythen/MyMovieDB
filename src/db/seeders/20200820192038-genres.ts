"use strict";

import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {

    const genresMapped = genres.map(title => ({ title }));

    await queryInterface.bulkInsert("genres", genresMapped);
  
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete("genres", {}, {});
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