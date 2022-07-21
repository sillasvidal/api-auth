import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateRolePermissionService from "../services/CreateRolePermissionService";

class RolePermissionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { roleId } = request.params;
    const { permissions } = request.body;

    const createRolePermissionService = container.resolve(CreateRolePermissionService);

    const role = await createRolePermissionService.execute({ roleId, permissions });

    return response.status(200).json(role);
  }
}

export default RolePermissionController;