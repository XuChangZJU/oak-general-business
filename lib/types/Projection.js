"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extraFileProjection = exports.applicationProjection = exports.tokenProjection = void 0;
const userProjection = {
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
    user$ref: {
        $entity: 'user',
        data: {
            id: 1,
            userState: 1,
            refId: 1,
            mobile$user: {
                $entity: 'mobile',
                data: {
                    id: 1,
                    mobile: 1,
                    userId: 1,
                    user: {
                        id: 1,
                        userState: 1,
                        refId: 1,
                    },
                },
            },
        },
    },
};
exports.tokenProjection = {
    id: 1,
    applicationId: 1,
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
    refreshedAt: 1,
    value: 1,
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
exports.applicationProjection = {
    id: 1,
    name: 1,
    config: 1,
    type: 1,
    systemId: 1,
    style: 1,
    description: 1,
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
        domain$system: {
            $entity: 'domain',
            data: {
                id: 1,
                systemId: 1,
                url: 1,
                apiPath: 1,
                protocol: 1,
                port: 1,
            }
        }
    },
};
exports.extraFileProjection = {
    id: 1,
    origin: 1,
    type: 1,
    bucket: 1,
    objectId: 1,
    tag1: 1,
    tag2: 1,
    filename: 1,
    md5: 1,
    entity: 1,
    entityId: 1,
    extra1: 1,
    extra2: 1,
    extension: 1,
    size: 1,
    sort: 1,
    fileType: 1,
    isBridge: 1,
    uploadState: 1,
    uploadMeta: 1,
    applicationId: 1,
};
