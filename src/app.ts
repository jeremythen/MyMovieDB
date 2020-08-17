import express from 'express';
import MoviesRoutes from './routes/movies';
import bodyParser from 'body-parser';

const app: express.Application = express();

const port = 3000;

app.use(bodyParser.json());
app.use("/movies", MoviesRoutes);


app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
