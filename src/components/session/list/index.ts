import { DATA_SUBSCRIBER_KEYS } from '../../../config/constants';
import { EntityDict } from '../../../oak-app-domain';
import { RowWithActions } from 'oak-frontend-base';

interface BaseAttrDict {
    [E: string]: any;
}


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
        if (
            entityProjection &&
            entityDisplay &&
            sessions &&
            sessions.length > 0
        ) {
            const newSessions = entityDisplay(sessions);

            return {
                sessions: newSessions,
            };
        }

        //排序待框架实现
        return {
            sessions: sessions?.sort(
                (a, b) => (b!.lmts as number) - (a!.lmts as number)
            ),
        };
    },
    lifetimes: {
        async attached() {
            const token = this.features.token.getTokenValue();
            if (!token) {
                this.redirectTo(
                    {
                        url: '/login',
                        backUrl: encodeURIComponent(window.location.href),
                    },
                    undefined,
                    true
                );
                return;
            }
            const { sessionId } = this.props;
            // 父层传入sessionId 默认聊天
            if (sessionId) {
                this.setSelectedSessionId(sessionId);
            }
        },
        async ready() {
            const { entityFilter } = this.props;
            const userId = this.features.token.getUserId();
            await this.subData([
                {
                    entity: 'session',
                    filter: entityFilter ? { ...entityFilter } : { userId },
                    id: `${DATA_SUBSCRIBER_KEYS.sessionList}`,
                },
            ]);
        },
        detached() {
            this.unSubData([`${DATA_SUBSCRIBER_KEYS.sessionList}`]);
        },
    },
    data: {
        unReadLength: 0,
        selectedSessionId: '' as string,
    },
    properties: {
        entity: '' as string, // entity端，指示相应的entity
        entityFilter: null as any, // entity端，指示相应的entity查询条件
        entityDisplay: (
            data:
                | EntityDict['session']['Schema'][]
                | RowWithActions<EntityDict, 'session'>[]
        ) => [] as Array<any>, // user端，指示如何显示entity对象名称
        entityProjection: null as any, // user端，指示需要取哪些entity的属性来显示entityDisplay
        sessionId: '' as string, // 指示需要打开的默认session
        dialog: false as boolean,
        onItemClick: null as ((sessionId: string) => {}) | undefined | null,
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
        setSelectedSessionId(sessionId: string) {
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
        navigateToMessage(sessionId: string) {
            if (typeof this.props.onItemClick === 'function') {
                this.props.onItemClick(sessionId);
                return;
            }
            this.navigateTo(
                {
                    url: '/session/sessionMessage',
                    sessionId,
                },
                undefined,
                true
            );
        },
    },
});
