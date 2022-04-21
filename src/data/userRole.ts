import { CreateOperationData as UserCreate } from 'oak-app-domain/User/Schema';
import { CreateOperationData as RoleCreate } from 'oak-app-domain/Role/Schema';
import { CreateOperationData as UserRoleCreate } from 'oak-app-domain/UserRole/Schema';
import { ROOT_ROLE_ID, ROOT_USER_ID } from '../constants';
export const users: Array<UserCreate> = [
    {
        password: 'oak@2022',
        name: 'root',
        id: ROOT_USER_ID,
    }
];

export const roles: Array<RoleCreate> = [
    {
        name: 'root',
        id: ROOT_ROLE_ID,
    }
];

export const userRoles: Array<UserRoleCreate> = [
    {
        userId: ROOT_USER_ID,
        roleId: ROOT_ROLE_ID,
        relation: 'owner',
        id: 'root_user_role',
    }
];
