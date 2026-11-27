export enum Resource {
  users = 'users',
  workspaces = 'workspaces',
  universities = 'universities',
  roles = 'roles',
}

export enum Action {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
  assign_role = 'assign_role',
}

const CRUD = [Action.create, Action.read, Action.update, Action.delete];

export const RESOURCE_ACTIONS: Record<Resource, readonly Action[]> = {
  [Resource.users]: CRUD,
  [Resource.universities]: CRUD,
  [Resource.workspaces]: CRUD,
  [Resource.roles]: [...CRUD, Action.assign_role],
};
