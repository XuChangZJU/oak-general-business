

import { ROOT_ROLE_ID } from '../constants';
import { EntityDict } from '../oak-app-domain';

export const userProjection: EntityDict['user']['Selection']['data'] = {
    id: 1,
    nickname: 1,
    name: 1,
    userState: 1,
    refId: 1,
    idState: 1,
    gender: 1,
    birth: 1,
    isRoot: 1,
    extraFile$entity: {
        $entity: 'extraFile',
        data: {
            id: 1,
            tag1: 1,
            origin: 1,
            bucket: 1,
            objectId: 1,
            filename: 1,
            extra1: 1,
            type: 1,
            entity: 1,
            entityId: 1,
            extension: 1,
        },
        filter: {
            tag1: 'avatar',
        },
        indexFrom: 0,
        count: 1,
    },
    mobile$user: {
        $entity: 'mobile',
        data: {
            id: 1,
            mobile: 1,
            userId: 1,
        },
    },
};
export const tokenProjection: EntityDict['token']['Selection']['data'] = {
    id: 1,
    userId: 1,
    user: userProjection,
    ableState: 1,
    playerId: 1,
    player: {
        id: 1,
        isRoot: 1,        
    },
    entity: 1,
    entityId: 1,
    mobile: {
        id: 1,
        mobile: 1,
        userId: 1,
        ableState: 1,
        user: {
            id: 1,
            userState: 1,
            refId: 1,
        },
    },
    wechatUser: {
        id: 1,
        userId: 1,
        user: {
            id: 1,
            userState: 1,
            refId: 1,
        },
    },
};

export const applicationProjection: EntityDict['application']['Selection']['data'] = {
    id: 1,
    name: 1,
    config: 1,
    type: 1,
    systemId: 1,
    style: 1,
    system: {
        id: 1,
        name: 1,
        config: 1,
        platformId: 1,
        style: 1,
        folder: 1,
        super: 1,
        entity: 1,
        entityId: 1,
        platform: {
            id: 1,
            config: 1,
            style: 1,
            entity: 1,
            entityId: 1,
        },
    },
};