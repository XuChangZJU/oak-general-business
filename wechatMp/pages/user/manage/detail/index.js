"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
const extraFile_1 = require("../../../../../src/utils/extraFile");
OakPage({
    path: 'user:manage:detail',
    entity: 'user',
    projection: {
        id: 1,
        nickname: 1,
        name: 1,
        userState: 1,
        idState: 1,
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
            },
        },
    },
    isList: false,
    formData: async ([user]) => {
        const { id, nickname, idState, userState, name, mobile$user, extraFile$entity } = user;
        const mobile = mobile$user && mobile$user[0]?.mobile;
        const avatar = extraFile$entity && extraFile$entity[0] && (0, extraFile_1.composeFileUrl)(extraFile$entity[0]);
        return {
            id,
            nickname,
            name,
            mobile,
            avatar,
            userState,
            idState,
        };
    },
    actions: ['accept', 'activate', 'disable', 'enable', 'remove', 'update', 'verify'],
}, {
    methods: {}
});
