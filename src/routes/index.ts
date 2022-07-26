import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';

import PermissionController from '../controllers/PermissionController';
import RoleController from '../controllers/RoleController';
import RolePermissionController from '../controllers/RolePermissionController';
import UserAccessControlController from '../controllers/UserAccessControlController';
import UserController from '../controllers/UserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { is } from '../middlewares/permissions';

const routes = Router();

const userController = new UserController();
const roleController = new RoleController();
const permissionController = new PermissionController();
const userAccessControlController = new UserAccessControlController();
const rolePermissionController = new RolePermissionController();

const regexIsValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

routes.post(
  '/users',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }), 
  userController.create
);

routes.post(
  '/users/login', 
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }), 
  userController.authenticate
);

routes.get(
  '/users', 
  ensureAuthenticated(),
  is(['admin']),
  userController.listAll
);

routes.post(
  '/roles',
  ensureAuthenticated(),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    }
  }), 
  roleController.create
);

routes.post(
  '/permissions',
  ensureAuthenticated(),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    }
  }), 
  permissionController.create
);

routes.post(
  '/users/access-control',
  ensureAuthenticated(),
  celebrate({
    [Segments.BODY]: {
      userId: Joi.string().required(),
      roles: Joi.array().required(),
      permissions: Joi.array().required()
    }
  }), 
  userAccessControlController.create
);

routes.post(
  '/roles/:roleId/permissions',
  ensureAuthenticated(),
  celebrate({
    [Segments.BODY]: {
      permissions: Joi.array().required(),
    },
    [Segments.PARAMS]: {
      roleId: Joi.string().regex(regexIsValidUUID).required()
    }
  }), 
  rolePermissionController.create
);

export default routes;