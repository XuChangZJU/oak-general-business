import { DATA_SUBSCRIBER_KEYS } from '../../../config/constants';
import assert from 'assert';
export default OakComponent({
    entity: 'session',
    projection() {
        const { entityProjection } = this.props;
        const proj = {
            id: 1,
            entity: 1,
            entityId: 1,
            lmts: 1,
            openId: 1,
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
        if (entityProjection &&
            entityDisplay &&
            sessions &&
            sessions.length > 0) {
            const newSessions = entityDisplay(sessions);
            return {
                sessions: newSessions,
            };
        }
        //排序待框架实现
        return {
            sessions: sessions?.sort((a, b) => b.lmts - a.lmts),
        };
    },
    lifetimes: {
        async attached() {
            const token = this.features.token.getTokenValue();
            if (!token) {
                this.redirectTo({
                    url: '/login',
                    backUrl: encodeURIComponent(window.location.href),
                }, undefined, true);
                return;
            }
            const { sessionId } = this.props;
            // 父层传入sessionId 默认聊天
            if (sessionId) {
                this.setSelectedSessionId(sessionId);
            }
        },
        async ready() {
            const { entityFilter, entityFilterSubStr } = this.props;
            if (entityFilter) {
                assert(entityFilterSubStr);
                this.subDataEvents([entityFilterSubStr]);
            }
            else {
                const userId = this.features.token.getUserId();
                this.subDataEvents([`${DATA_SUBSCRIBER_KEYS.sessionList}-u-${userId}`]);
            }
        },
        detached() {
            const { entityFilter, entityFilterSubStr } = this.props;
            if (entityFilter) {
                assert(entityFilterSubStr);
                this.unsubDataEvents([entityFilterSubStr]);
            }
            else {
                const userId = this.features.token.getUserId();
                this.unsubDataEvents([`${DATA_SUBSCRIBER_KEYS.sessionList}-u-${userId}`]);
            }
        },
    },
    data: {
        unReadLength: 0,
        selectedSessionId: '',
    },
    properties: {
        entity: '',
        entityFilter: null,
        entityFilterSubStr: '',
        entityDisplay: (data) => [],
        entityProjection: null,
        sessionId: '',
        dialog: false,
        onItemClick: null,
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
            if (typeof this.props.onItemClick === 'function') {
                this.props.onItemClick(sessionId);
                return;
            }
            this.navigateTo({
                url: '/session/sessionMessage',
                sessionId,
            }, undefined, true);
        },
    },
});
