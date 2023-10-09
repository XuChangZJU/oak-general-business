export default OakComponent({
    entity: 'session',
    projection() {
        const { entityProjection } = this.props;
        const proj = {
            id: 1,
            entity: 1,
            entityId: 1,
            userId: 1,
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
                        entityId: 1,
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
            $$createAt$$: 1,
        };
        if (entityProjection) {
            Object.assign(proj, { ...entityProjection });
        }
        return proj;
    },
    isList: true,
    formData: function ({ data: sessions, features, props }) {
        const { entityDisplay, entityProjection } = this.props;
        if (entityProjection && entityDisplay && sessions && sessions.length > 0) {
            const sessions1 = entityDisplay(sessions);
            return {
                sessions: sessions1,
            };
        }
        // const unReadLength = wechatSessions?.filter(
        //     (ele) => ele.isRead
        // )
        return {
            sessions,
        };
    },
    lifetimes: {
        async attached() {
            const userId = this.features.token.getUserId(true);
            // if (!userId) {
            //     this.redirectTo(
            //         {
            //             url: '/login',
            //             backUrl: encodeURIComponent(window.location.href),
            //         },
            //         undefined,
            //         true
            //     );
            //     return;
            // }
            const { sessionId } = this.props;
            // 父层传入conversationId 默认聊天
            if (sessionId) {
                this.setSelectedSessionId(sessionId);
            }
        },
    },
    data: {
        unReadLength: 0,
        selectedSessionId: '',
    },
    properties: {
        entity: '',
        entityFilter: undefined,
        entityDisplay: (data) => '',
        entityProjection: {},
        sessionId: '',
        dialog: false,
    },
    filters: [
        {
            filter() {
                const { entityFilter, sessionId } = this.props;
                if (entityFilter) {
                    // 说明来源于entity
                    return {
                        ...entityFilter,
                        /* $or: [
                            {
                                userId: {
                                    $exists: false,
                                },
                            },
                            {
                                '#id': 'node-1',
                                user: {
                                    session$user: {
                                        '#sqp': 'not in',
                                        '$expr1': {
                                            $ne: [
                                                {
                                                    '#refAttr': 'id',
                                                },
                                                {
                                                    '#refId': 'node-1',
                                                    '#refAttr': 'id',
                                                }
                                            ]
                                        },
                                        $expr2: {
                                            $eq: [
                                                {
                                                    '#refAttr': 'userId',
                                                    '#refId': 'node-1',
                                                },
                                                {
                                                    '#refAttr': 'userId',
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        ], */
                    };
                }
                const userId = this.features.token.getUserId();
                return {
                    userId,
                };
            },
            '#name': 'propsQuery',
        },
    ],
    sorters: [
        {
            sorter: {
                $attr: {
                    lmts: 1,
                },
                $direction: 'desc',
            },
        },
    ],
    methods: {
        setSelectedSessionId(sessionId) {
            this.setState({
                selectedSessionId: sessionId,
            });
        },
        getFilter() {
            const { entity, sessionId } = this.props;
            // 当外层upsert传入id时走这里
            if (sessionId) {
                return {
                    id: sessionId,
                };
            }
            // bypark,byCompany,byplatform走这里
            const userId = this.features.token.getUserId();
        },
        async clearUnRead() {
            //  =框架支持
            // const filter = getFilter();
            // await this.execute({
            //     action: 'update',
            //     data:
            //         this.props.userType === 'employer'
            //             ? {
            //                 isEmployerRead: true,
            //             }
            //             : {
            //                 isEntityRead: true,
            //             },
            //     filter,
            // });
            // await this.refresh();
        },
        // mobile独有
        navigateToMessage(sessionId) {
            this.navigateTo({
                url: '/sessionMessage/list',
                sessionId,
            }, undefined, true);
        },
    },
});
