import { FormCreateData } from 'oak-domain/lib/types/Entity';
import { OpSchema as User } from 'oak-domain/lib/base-domain/User/Schema';
import { OpSchema as Role } from 'oak-domain/lib/base-domain/Role/Schema';
import { OpSchema as UserRole } from 'oak-domain/lib/base-domain/UserRole/Schema';
import { ROOT_ROLE_ID, ROOT_USER_ID } from '../constants';
export const users: Array<FormCreateData<User>> = [
    {
        password: 'oak@2022',
        name: 'root',
        id: ROOT_USER_ID,
    }
];

export const roles: Array<FormCreateData<Role>> = [
    {
        name: 'root',
        id: ROOT_ROLE_ID,
    }
];

export const userRoles: Array<FormCreateData<UserRole>> = [
    {
        userId: ROOT_USER_ID,
        roleId: ROOT_ROLE_ID,
        relation: 'owner',
        id: 'root_user_role',
    }
];
