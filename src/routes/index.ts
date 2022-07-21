import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';

const routes = Router();

const userController = new UserController();

routes.post('/users', userController.create);

routes.post('/users/login', userController.authenticate);

routes.get('/users', userController.listAll);

export default routes;