export default OakComponent({
    entity: 'session',
    projection: {
        id: 1,
        userId: 1,
        entity: 1,
        entityId: 1,
        lmts: 1,
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
    },
    isList: false,
    formData({ data, features }) {
        const session = Object.assign(
            {},
            data
        ) as any;
        Object.assign(session, {
            userUrl: features.extraFile.getUrl(
                session?.user?.extraFile$entity &&
                session?.user?.extraFile$entity[0]
            ),
        });
        if (session?.sessionMessage$session) {
            Object.assign(session, {
                wechatMessages: session?.sessionMessage$session,
                // unreadLength: session?.sessionMessage$session?.filter(
                //     (ele: any) => ele.isRead === false
                // )?.length,
            });
        }
        return session;
    },
    lifetimes: {
        async detached() {
            const { oakId } = this.props;
            const { session } = this.state;
            const userId = this.features.token.getUserId(true);
            const { data: readRemark } = await this.features.cache.refresh(
                'readRemark',
                {
                    data: {
                        id: 1,
                        sessionId: 1,
                        userId: 1,
                        $$createAt$$: 1,
                    },
                    filter: {
                        session: {
                            id: oakId
                        },
                        userId,
                    },
                    sorter: [
                        {
                            $attr: {
                                $$createAt$$: 1,
                            },
                            $direction: 'desc',
                        },
                    ],
                    count: 1,
                }
            );
            const { data: sessionMessage } = await this.features.cache.refresh(
                'sessionMessage',
                {
                    data: {
                        id: 1,
                        sessionId: 1,
                        userId: 1,
                        $$createAt$$: 1,
                    },
                    filter: {
                        session: {
                            id: oakId
                        },
                    },
                    sorter: [
                        {
                            $attr: {
                                $$createAt$$: 1,
                            },
                            $direction: 'desc',
                        },
                    ],
                    count: 1,
                }
            );
            if (readRemark && readRemark?.length > 0) {
                if (session?.lmst > readRemark && sessionMessage[0]?.userId !== userId) {

                }
            } else {
                if (sessionMessage[0]?.userId !== userId) {

                }
            }
        },
    },
    properties: {
        selectedId: '' as string,
        onSelect: (id: string) => { },
        key: '' as string,
        entityFilter: {},
    },
    methods: {
        getAvatarUrl() {
            const { userUrl, entity } = this.state;
            const { entityFilter } = this.props;
            const defaultUrl =
                'http://qiniu.gecomebox.com/static/defaultAvatar.png';
            if (entityFilter) {
                return userUrl || defaultUrl;
            } else {
                return defaultUrl;
            }
        },
        getName() {
            const { user, entity } = this.state;
            const { entityFilter } = this.props;

            if (entityFilter) {
                const userName = user?.name;
                const userNickname = user?.name || user?.nickname;
                const userMobile =
                    user?.mobile$user &&
                    user?.mobile$user[0]?.mobile;
                if (userName) {
                    return userName;
                }
                if (userMobile) {
                    return '用户' + userMobile;
                }

                return userNickname;
            } else {
                return '未知';
            }
        },
    },
});
