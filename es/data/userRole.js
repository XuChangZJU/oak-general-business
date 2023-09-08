import { ROOT_MOBILE_ID, ROOT_TOKEN_ID, ROOT_USER_ID } from '../constants';
export const users = [
    {
        password: 'oak@2022',
        nickname: 'root',
        name: 'root',
        isRoot: true,
        id: ROOT_USER_ID,
        userState: 'shadow',
        idState: 'unverified',
    },
];
export const mobiles = [
    {
        mobile: '13000000000',
        id: ROOT_MOBILE_ID,
        userId: ROOT_USER_ID,
    }
];
export const tokens = [
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
];
