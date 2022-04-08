import { CreateOperationData as UserCreate } from '../base-ed/User/Schema';
import { CreateOperationData as RoleCreate } from '../base-ed/Role/Schema';
import { CreateOperationData as UserRoleCreate } from '../base-ed/UserRole/Schema';
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
