import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import routes from './routes';

import { AppDataSource } from './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server running on port 3333');
});

AppDataSource.initialize()
  .then(() => {

  })
  .catch((error) => console.log(error));