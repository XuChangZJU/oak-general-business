export default OakComponent({
    entity: 'sessionMessage',
    isList: false,
    projection: {
        id: 1,
        text: 1,
        type: 1,
        createTime: 1,
        userId: 1,
        wechatUserId: 1,
        $$createAt$$: 1,
        sessionId: 1,
        session: {
            id: 1,
            entity: 1,
            entityId: 1,
            userId: 1,
            user: {
                id: 1,
                name: 1,
                mobile$user: {
                    $entity: 'mobile',
                    data: {
                        id: 1,
                        mobile: 1,
                    },
                },
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
                        extension: 1,
                        type: 1,
                        entity: 1,
                    },
                    filter: {
                        tag1: {
                            $in: ['avatar'],
                        },
                    },
                },
            },
        },
        aaoe: 1,
        extraFile$entity: {
            $entity: 'extraFile',
            data: {
                id: 1,
                tag1: 1,
                tag2: 1,
                origin: 1,
                bucket: 1,
                objectId: 1,
                filename: 1,
                extra1: 1,
                extension: 1,
                type: 1,
                entity: 1,
            },
            filter: {
                tag1: {
                    $in: ['image'],
                },
            },
        },
    },
    formData({ data: sessionMessage, features }) {
        const type = sessionMessage?.type;
        const session = sessionMessage?.session;
        const newSessionMessage = {
            type,
            aaoe: sessionMessage?.aaoe,
            text: sessionMessage?.text,
            id: sessionMessage?.id,
            $$createAt$$: sessionMessage?.$$createAt$$,
            sessionId: sessionMessage?.sessionId,
            userId: session?.userId,
            userMobile: session?.user?.mobile$user &&
                session?.user?.mobile$user[0]?.mobile,
            userAvatar: features.extraFile2.getUrl(session?.user?.extraFile$entity &&
                session?.user?.extraFile$entity[0]),
        };
        if (type === 'image') {
            const extraFile$entity = sessionMessage?.extraFile$entity;
            Object.assign(newSessionMessage, {
                picUrl: features.extraFile2.getUrl(extraFile$entity && extraFile$entity[0]),
            });
        }
        return newSessionMessage;
    },
    properties: {
        isEntity: false,
    },
    methods: {
        getAvatarUrl(aaoe) {
            const defaultUrl = 'data:image/png;base64,UklGRoICAABXRUJQVlA4IHYCAADwKACdASosASwBPrVarU8nJiUiJJjIEOAWiWlu4XShG/NX+q91/WYL37Uns/lNhNG6y8oBCkjJGSMkZIyRkjJGSMkZIyRkjJGSMkZIyRkjJGR8IMX6z+YtjIoxEY3KVOOQSyXEuJcR/ZAAHyQcUpZRWfL4lxLiXBnkSU0B4NcCHWSK4CBdk6WS4PC/jULN2pAeRlwRqF2xCZ400cTnW2ogZi8OtcthRiMouvr2dYEgJARhbEb+09k94h/a5mFkC7J2To60i1IWmYHR5OLiXEuJcSAK9Xk4C8ve/Uq7iBoiHvSAkBH4KrcZKm3UErOOpxquA3X2PWjC2wI/Dz57QAZ5J2Tsl6p+Eiy4BhYvDwpoChtMjLgEdPjq37JfS+Rm/7niuhE0jzkyk7jDjACsogklFiMtpkZfbolR4QRN7J2TsnZOydk7J2TsnZOydk7J0YAA/v67qQMAOmxdZAbD1n8UzeBoApiFopfRVxPpEh3G4wAp0EwQD6kJbi6xm8OOhiuS4WeYZ8hxC45E4PZfT56WVnzaLLWW1i9XLyz05YJhxQ6iT5aOk5J1rNnENlAzf+i/0WpEd/edFMYu+q2U4pBjLEoLPE0DGVeHtS7zt4vTVCiXBfibW0mgqhbRQhDrr5ctACqSBsx+8f/HDobGN621bjYch19yGQegV6eUMGNu9bVQi+vQdZvTK4d7MtISka7dqmVYfuI3Z6nUBA/Nzg0ApEhQ+CAmDvSRrKCjxbJBYdc+MsQpTv0DdUkoDVa18rZrKyIeUT4pYRFJcnsT+OoAJGGIdRGn6A4NtB3woJnI/x3d+Rgibkn5GcX4oAfaVqkvAAAAAAA=';
            const { userAvatar } = this.state;
            if (aaoe) {
                return defaultUrl;
            }
            else {
                return userAvatar || defaultUrl;
            }
        },
    },
});
