import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users';
import moviesRoutes from './routes/movies';
import directorsRoutes from './routes/directors';
import actorsRoutes from './routes/actors';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDoc from './swagger.json'
import dotenv from 'dotenv';
dotenv.config();

const app: express.Application = express();

const port = process.env.port || 3000;

app.use(bodyParser.json());

app.use("/movies", moviesRoutes);
app.use("/actors", actorsRoutes);
app.use("/directors", directorsRoutes);
app.use("/users", userRoutes);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/", async (req, res) => {
  res.send("Welcome to MyMovieDB!");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

export default app;