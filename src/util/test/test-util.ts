import { series } from 'async';
const { exec } = require('child_process');

export const runMigrations = (callback: any) => {
    series([
        exec('npx sequelize-cli db:migrate:undo:all'),
        exec('npx sequelize-cli db:migrate'),
        exec('npx sequelize-cli db:seed:all'),
    ], callback);
    
}