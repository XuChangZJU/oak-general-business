// index.ts

import { composeFileUrl } from "../../../../src/utils/extraFile";

OakPage({
    path: 'user:manage',
    entity: 'user',
    projection: {
        id: 1,
        nickname: 1,
        name: 1,
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
    isList: true,
    formData: async (users) => {
        const userData = users.map(
            (user) => {
                const { id, nickname, name, mobile$user, extraFile$entity } = user;
                const mobile = mobile$user && mobile$user[0]?.mobile;
                const avatar = extraFile$entity && extraFile$entity[0] && composeFileUrl(extraFile$entity[0]);
                return {
                    id,
                    nickname,
                    name,
                    mobile,
                    avatar,
                };
            }
        );
        return {
            userData,
        };
    },
}, {
    methods: {
    }
});