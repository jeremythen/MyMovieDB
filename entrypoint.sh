npm install
export NODE_ENV=docker
npx tsc
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start