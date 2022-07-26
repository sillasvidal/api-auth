import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';
import AppError from './errors/AppError';

import swaggerUi from 'swagger-ui-express';

import routes from './routes';

import { AppDataSource } from './database';

import './container';

const openapi = require('./docs/openapi.json');
const paths = require('./docs/paths.json');
const schemas = require('./docs/schemas.json');
const responses = require('./docs/responses.json');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

openapi.paths = { ...paths };
openapi.components.schemas = { ...schemas };
openapi.components.responses = { ...responses };

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.use((err: Error, _: Request, response: Response, __: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      code: err.code,
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: err.message,
  });
});

app.listen(3333, () => {
  console.log('Server running on port 3333');
});

AppDataSource.initialize()
  .then()
  .catch((error) => console.log(error));