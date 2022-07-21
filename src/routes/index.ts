import { Router } from 'express';
import RoleController from '../controllers/RoleController';
import UserController from '../controllers/UserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const routes = Router();

const userController = new UserController();
const roleController = new RoleController();

routes.post('/users', userController.create);

routes.post('/users/login', userController.authenticate);

routes.get(
  '/users', 
  ensureAuthenticated(),
  userController.listAll
);

routes.post(
  '/users/roles',
  ensureAuthenticated(),
  roleController.create
);

export default routes;