import express from 'express';
import MoviesRoutes from './routes/movies';
import bodyParser from 'body-parser';
import envConfig from './config/envConfig';
import UserRoute from './routes/auth';

const app: express.Application = express();

const port = envConfig.port || 3000;

app.use(bodyParser.json());
app.use("/movies", MoviesRoutes);
app.use(UserRoute);
app.get("/", async (req, res, next) => {
  res.send("Welcome to MyMovieDB!");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
