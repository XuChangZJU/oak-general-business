import { OpSchema as ExtraFile } from '../../../oak-app-domain/ExtraFile/Schema';

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
    // formData({ data, features }) {
    //     const session = Object.assign(
    //         {},
    //         data
    //     ) as any;
    //     console.log(session)

    //     Object.assign(session, {
    //         userUrl: features.extraFile.getUrl(
    //             session?.user?.extraFile$entity &&
    //             session?.user?.extraFile$entity[0]
    //         ),
    //     });
    //     // if (session?.sessionMessage$session) {
    //     //     Object.assign(session, {
    //     //         wechatMessages: session?.sessionMessage$session,
    //     //         // unreadLength: session?.sessionMessage$session?.filter(
    //     //         //     (ele: any) => ele.isRead === false
    //     //         // )?.length,
    //     //     });
    //     // }
    //     return session;
    // },
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
            if (sessionId) {
                this.getSession(sessionId)
            }
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
        sessionId: '' as string,
        isEntity: false,
        entityDisplay: (data: any) => [] as Array<any>,        // user端，指示如何显示entity对象名称
        entityProjection: {} as any,    // user端，指示需要取哪些entity的属性来显示entityDisplay
    },
    methods: {
        getSession(sessionId: string) {
            const { entityProjection } = this.props;
            const [session] = this.features.cache.get(
                'session',
                {
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
                }
            );
            this.setState({ session })
        },
        getAvatarUrl() {
            const { userUrl, entity } = this.state;
            const { isEntity } = this.props;
            const defaultUrl =
                'http://qiniu.gecomebox.com/static/defaultAvatar.png';
            if (isEntity) {
                return userUrl || defaultUrl;
            } else {
                return defaultUrl;
            }
        },
        getName() {
            const { session, entity } = this.state;
            const { isEntity, entityDisplay } = this.props;
            if (isEntity) {
                const userName = session?.user?.name;
                const userNickname = session?.user?.name || session?.user?.nickname;
                const userMobile =
                    session?.user?.mobile$user &&
                    session?.user?.mobile$user[0]?.mobile;
                if (userName) {
                    return userName;
                }
                if (userMobile) {
                    return '用户' + userMobile;
                }

                return userNickname;
            } else {
                if (entityDisplay && session) {
                    const sessions = entityDisplay([session])
                    return sessions[0]?.name
                }


                return '未知';
            }
        },
    },
});

