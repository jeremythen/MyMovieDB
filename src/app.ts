import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users';
import moviesRoutes from './routes/movies';
import directorsRoutes from './routes/directors';
import actorsRoutes from './routes/actors';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDoc from './swagger.json'
import dotenv from 'dotenv';
import log4js from 'log4js';

log4js.configure({
  appenders: { fileAppender: { type: 'file', filename: './logs/logs.log' } },
  categories: { default: { appenders: ['fileAppender'], level: 'info' } }
});

const logger = log4js.getLogger();

dotenv.config();

const app: express.Application = express();

const port = process.env.port || 3000;

app.use(bodyParser.json());

app.use("/movies", moviesRoutes);
app.use("/actors", actorsRoutes);
app.use("/directors", directorsRoutes);
app.use("/users", userRoutes);

/**
 * Swagger docs for MyMovieDB app can be visualized at this endpoint:
 */
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/", async (req, res) => {
  res.send("Welcome to MyMovieDB!");
});

app.listen(port, () => {
  logger.info(`Running on port ${port}`);
});

export default app;