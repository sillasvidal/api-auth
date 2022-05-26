import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  response.status(200).json({ message: 'api-auth' });
});

export default routes;