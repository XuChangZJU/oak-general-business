export default OakComponent({
    entity: 'session',
    projection: {
        id: 1,
        userId: 1,
        entity: 1,
        entityId: 1,
        lmts: 1,
        openId: 1,
        user: {
            id: 1,
            name: 1,
            nickname: 1,
            mobile$user: {
                $entity: 'mobile',
                data: {
                    id: 1,
                    mobile: 1,
                    userId: 1,
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
        sessionMessage$session: {
            $entity: 'sessionMessage',
            data: {
                id: 1,
                text: 1,
                type: 1,
                userId: 1,
                wechatUserId: 1,
                createTime: 1,
                $$createAt$$: 1,
                aaoe: 1,
            },
            sorter: [
                {
                    $attr: {
                        $$createAt$$: 1,
                    },
                    $direction: 'desc',
                },
            ],
            indexFrom: 0,
            count: 1,
        },
    },
    isList: false,
    formData({ data, features }) {
        const session = Object.assign({}, data) as any;
        Object.assign(session, {
            userUrl: features.extraFile.getUrl(
                session?.user?.extraFile$entity &&
                    session?.user?.extraFile$entity[0]
            ),
        });
        if (session?.sessionMessage$session) {
            Object.assign(session, {
                sessionMessages: session?.sessionMessage$session,
            });
        }
        return session;
    },
    lifetimes: {
        async detached() {
            const { oakId } = this.props;
            const { session } = this.state;
            const userId = this.features.token.getUserId(true);
            // TODO readRemark未实现
            // const { data: readRemark } = await this.features.cache.refresh(
            //     'readRemark',
            //     {
            //         data: {
            //             id: 1,
            //             sessionId: 1,
            //             userId: 1,
            //             $$createAt$$: 1,
            //         },
            //         filter: {
            //             sessionId: oakId,
            //             userId,
            //         },
            //         sorter: [
            //             {
            //                 $attr: {
            //                     $$createAt$$: 1,
            //                 },
            //                 $direction: 'desc',
            //             },
            //         ],
            //         count: 1,
            //     }
            // );
            // const { data: sessionMessage } = await this.features.cache.refresh(
            //     'sessionMessage',
            //     {
            //         data: {
            //             id: 1,
            //             sessionId: 1,
            //             userId: 1,
            //             $$createAt$$: 1,
            //         },
            //         filter: {
            //             sessionId: oakId,
            //         },
            //         sorter: [
            //             {
            //                 $attr: {
            //                     $$createAt$$: 1,
            //                 },
            //                 $direction: 'desc',
            //             },
            //         ],
            //         count: 1,
            //     }
            // );
            // if (readRemark && readRemark?.length > 0) {
            //     if (
            //         session?.lmst > readRemark &&
            //         sessionMessage[0]?.userId !== userId
            //     ) {
            //     }
            // } else {
            //     if (sessionMessage[0]?.userId !== userId) {
            //     }
            // }
        },
    },
    properties: {
        selectedId: '',
        onSelect: (id: string) => {},
        isEntity: false,
        name: '',
    },
    methods: {
        getAvatarUrl() {
            const { userUrl, entity } = this.state;
            const { isEntity } = this.props;
            const defaultUrl =
                'data:image/png;base64,UklGRoICAABXRUJQVlA4IHYCAADwKACdASosASwBPrVarU8nJiUiJJjIEOAWiWlu4XShG/NX+q91/WYL37Uns/lNhNG6y8oBCkjJGSMkZIyRkjJGSMkZIyRkjJGSMkZIyRkjJGR8IMX6z+YtjIoxEY3KVOOQSyXEuJcR/ZAAHyQcUpZRWfL4lxLiXBnkSU0B4NcCHWSK4CBdk6WS4PC/jULN2pAeRlwRqF2xCZ400cTnW2ogZi8OtcthRiMouvr2dYEgJARhbEb+09k94h/a5mFkC7J2To60i1IWmYHR5OLiXEuJcSAK9Xk4C8ve/Uq7iBoiHvSAkBH4KrcZKm3UErOOpxquA3X2PWjC2wI/Dz57QAZ5J2Tsl6p+Eiy4BhYvDwpoChtMjLgEdPjq37JfS+Rm/7niuhE0jzkyk7jDjACsogklFiMtpkZfbolR4QRN7J2TsnZOydk7J2TsnZOydk7J0YAA/v67qQMAOmxdZAbD1n8UzeBoApiFopfRVxPpEh3G4wAp0EwQD6kJbi6xm8OOhiuS4WeYZ8hxC45E4PZfT56WVnzaLLWW1i9XLyz05YJhxQ6iT5aOk5J1rNnENlAzf+i/0WpEd/edFMYu+q2U4pBjLEoLPE0DGVeHtS7zt4vTVCiXBfibW0mgqhbRQhDrr5ctACqSBsx+8f/HDobGN621bjYch19yGQegV6eUMGNu9bVQi+vQdZvTK4d7MtISka7dqmVYfuI3Z6nUBA/Nzg0ApEhQ+CAmDvSRrKCjxbJBYdc+MsQpTv0DdUkoDVa18rZrKyIeUT4pYRFJcnsT+OoAJGGIdRGn6A4NtB3woJnI/x3d+Rgibkn5GcX4oAfaVqkvAAAAAAA=';
            if (isEntity) {
                return userUrl || defaultUrl;
            } else {
                return defaultUrl;
            }
        },
        getName() {
            const { user, entity, openId } = this.state;
            const { isEntity } = this.props;

            if (isEntity) {
                const userName = user?.name;
                const userNickname = user?.name || user?.nickname;
                const userMobile =
                    user?.mobile$user && user?.mobile$user[0]?.mobile;
                if (userName) {
                    return userName;
                }
                if (userMobile) {
                    return '用户' + userMobile;
                }
                if (openId) {
                    return '微信用户' + openId;
                }
                return userNickname;
            } else {
                return '未知';
            }
        },
    },
});
