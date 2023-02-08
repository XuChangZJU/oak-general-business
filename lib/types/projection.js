"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationProjection = exports.tokenProjection = exports.userProjection = void 0;
exports.userProjection = {
    id: 1,
    nickname: 1,
    name: 1,
    userState: 1,
    idState: 1,
    gender: 1,
    birth: 1,
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
    userRole$user: {
        $entity: 'userRole',
        data: {
            id: 1,
            userId: 1,
            roleId: 1,
        },
    },
};
exports.tokenProjection = {
    id: 1,
    userId: 1,
    user: exports.userProjection,
    ableState: 1,
    playerId: 1,
    player: {
        id: 1,
        userRole$user: {
            $entity: 'userRole',
            data: {
                id: 1,
                userId: 1,
                roleId: 1,
            },
        },
    },
    entity: 1,
    entityId: 1,
};
exports.applicationProjection = {
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
