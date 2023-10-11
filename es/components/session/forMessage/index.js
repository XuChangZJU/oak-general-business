export default OakComponent({
    // entity: 'session',
    // projection: {
    //     id: 1,
    //     userId: 1,
    //     entity: 1,
    //     entityId: 1,
    //     lmts: 1,
    //     user: {
    //         id: 1,
    //         name: 1,
    //         nickname: 1,
    //         mobile$user: {
    //             $entity: 'mobile',
    //             data: {
    //                 id: 1,
    //                 mobile: 1,
    //                 userId: 1,
    //             },
    //         },
    //         extraFile$entity: {
    //             $entity: 'extraFile',
    //             data: {
    //                 id: 1,
    //                 tag1: 1,
    //                 origin: 1,
    //                 bucket: 1,
    //                 objectId: 1,
    //                 filename: 1,
    //                 extra1: 1,
    //                 extension: 1,
    //                 type: 1,
    //                 entity: 1,
    //             },
    //             filter: {
    //                 tag1: {
    //                     $in: ['avatar'],
    //                 },
    //             },
    //         },
    //     },
    // },
    isList: false,
    formData({ data, features }) {
        const { sessionId } = this.props;
        if (sessionId) {
            this.getSession(sessionId);
        }
        return {};
    },
    // filters: [
    //     {
    //         filter() {
    //             const { sessionId } = this.props;
    //             if (sessionId) {
    //                 return {
    //                     id: sessionId,
    //                 };
    //             }
    //         },
    //     },
    // ],
    lifetimes: {
        ready() {
            const { sessionId } = this.props;
            // if (sessionId) {
            //     this.getSession(sessionId)
            // }
        },
    },
    listeners: {
        sessionId(prev, next) {
            if (prev.sessionId !== next.sessionId) {
                this.getSession(next.sessionId);
            }
        },
    },
    properties: {
        sessionId: '',
        isEntity: false,
        entityDisplay: (data) => [],
        entityProjection: {}, // user端，指示需要取哪些entity的属性来显示entityDisplay
    },
    methods: {
        getSession(sessionId) {
            const { entityProjection } = this.props;
            const [session] = this.features.cache.get('session', {
                data: {
                    id: 1,
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
                    ...entityProjection,
                },
                filter: {
                    id: sessionId
                }
            });
            this.setState({ session });
        },
        getAvatarUrl() {
            const { userUrl, entity } = this.state;
            const { isEntity } = this.props;
            const defaultUrl = 'http://qiniu.gecomebox.com/static/defaultAvatar.png';
            if (isEntity) {
                return userUrl || defaultUrl;
            }
            else {
                return defaultUrl;
            }
        },
        getName() {
            const { session, entity } = this.state;
            const { isEntity, entityDisplay } = this.props;
            if (isEntity) {
                const userName = session?.user?.name;
                const userNickname = session?.user?.name || session?.user?.nickname;
                const userMobile = session?.user?.mobile$user &&
                    session?.user?.mobile$user[0]?.mobile;
                if (userName) {
                    return userName;
                }
                if (userMobile) {
                    return '用户' + userMobile;
                }
                return userNickname;
            }
            else {
                if (entityDisplay && session) {
                    const sessions = entityDisplay([session]);
                    return sessions[0]?.name;
                }
                return '未知';
            }
        },
    },
});
