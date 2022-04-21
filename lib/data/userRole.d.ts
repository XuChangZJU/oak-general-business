import { CreateOperationData as UserCreate } from 'oak-app-domain/User/Schema';
import { CreateOperationData as RoleCreate } from 'oak-app-domain/Role/Schema';
import { CreateOperationData as UserRoleCreate } from 'oak-app-domain/UserRole/Schema';
export declare const users: Array<UserCreate>;
export declare const roles: Array<RoleCreate>;
export declare const userRoles: Array<UserRoleCreate>;
