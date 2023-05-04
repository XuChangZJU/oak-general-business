import { CreateOperationData as UserCreate } from '../general-app-domain/User/Schema';
import { CreateOperationData as MobileCreate } from '../general-app-domain/Mobile/Schema';
import { CreateOperationData as TokenCreate } from '../general-app-domain/Token/Schema';
import { ROOT_MOBILE_ID, ROOT_ROLE_ID, ROOT_TOKEN_ID, ROOT_USER_ID } from '../constants';
import { DEV_SYSTEM_ID } from './DEV-CONFIG';
export const users: Array<UserCreate> = [
    {
        password: 'oak@2022',
        nickname: 'root',
        name: 'root',
        isRoot: true,
        id: ROOT_USER_ID,
    }
];

export const mobiles: Array<MobileCreate> = [
    {
        mobile: '13000000000',
        id: ROOT_MOBILE_ID,
        userId: ROOT_USER_ID,
    }
];

export const tokens: Array<TokenCreate> = [
    {
        entity: 'mobile',
        entityId: ROOT_MOBILE_ID,
        id: ROOT_TOKEN_ID,
        env: {
            type: 'server',
        },
        userId: ROOT_USER_ID,
        playerId: ROOT_USER_ID,
    }
]
