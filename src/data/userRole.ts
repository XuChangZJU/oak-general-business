import { CreateOperationData as UserCreate } from '../oak-app-domain/User/Schema';
import { CreateOperationData as MobileCreate } from '../oak-app-domain/Mobile/Schema';
import { CreateOperationData as TokenCreate } from '../oak-app-domain/Token/Schema';
import { ROOT_MOBILE_ID, ROOT_ROLE_ID, ROOT_TOKEN_ID, ROOT_USER_ID } from '../constants';

export const users: Array<UserCreate> = [
    {
        password: '',
        nickname: 'root',
        name: 'root',
        isRoot: true,
        id: ROOT_USER_ID,
        userState: 'shadow',
        idState: 'unverified',
    },
];

export const mobiles: Array<MobileCreate> = [
    {
        mobile: 'root_mobile',
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
        refreshedAt: Date.now(),
        value: ROOT_TOKEN_ID,
    }
]
