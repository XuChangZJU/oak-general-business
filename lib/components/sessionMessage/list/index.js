"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("oak-domain/lib/utils/uuid");
const constants_1 = require("../../../config/constants");
exports.default = OakComponent({
    entity: 'sessionMessage',
    projection: {
        id: 1,
        text: 1,
        type: 1,
        userId: 1,
        wechatUserId: 1,
        createTime: 1,
        $$createAt$$: 1,
        aaoe: 1,
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
            // filter: {
            //     tag1: {
            //         $in: ['image'],
            //     },
            // },
        },
        sessionId: 1,
        session: {
            id: 1,
            entity: 1,
            entityId: 1,
        },
    },
    isList: true,
    lifetimes: {
        async ready() {
            const { sessionId } = this.props;
            await this.subData([
                {
                    entity: 'sessionMessage',
                    filter: {
                        sessionId: sessionId,
                    },
                    id: `${constants_1.DATA_SUBSCRIBER_KEYS.sessionMessageList}-${sessionId}`,
                }
            ], async () => { await this.pageScroll('comment'); });
            // const userId = this.features.token.getUserId(true);
            // const applicationId = this.features.application.getApplicationId();
            // if (!sessionId) {
            //     const entity = 'application';
            //     const entityId = applicationId;
            //     const type = 'web';
            //     const { result: newSessionId } = await this.features.cache.exec('createSession', { type, entity, entityId });
            //     this.setState({
            //         newSessionId,
            //     })
            // }
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
            // (this as any).timer = setInterval(() => {
            //     this.refresh();
            // }, 2000);
            this.getConversationInfo();
        },
        detached() {
            if (this.timer) {
                clearInterval(this.timer);
            }
            const { sessionId } = this.props;
            this.unSubData([
                `${constants_1.DATA_SUBSCRIBER_KEYS.sessionMessageList}-${sessionId}`
            ]);
        },
    },
    listeners: {
        num(prev, next) {
            if (prev.num !== next.num) {
                if (next.num > 0 && next.num <= 20) {
                    this.pageScroll('comment');
                }
            }
        },
        sessionId(prev, next) {
            if (this.state.oakFullpath) {
                if (prev.sessionId !== next.sessionId) {
                    if (next.sessionId) {
                        this.getConversationInfo();
                        // 如果sessionId变了需要重新刷新下
                        this.refresh();
                    }
                }
            }
        },
    },
    formData({ data: sessionMessageList = [], features }) {
        return {
            sessionMessageList,
            num: sessionMessageList?.length,
        };
    },
    properties: {
        sessionId: '',
        isEntity: false,
        isUser: false,
        dialog: false,
        entity: '',
        entityId: '',
    },
    filters: [
        {
            filter() {
                const { sessionId } = this.props;
                return {
                    sessionId,
                    // type: {
                    //     $exists: true,
                    // },
                };
            },
        },
    ],
    sorters: [
        {
            sorter: {
                $attr: {
                    $$createAt$$: 1,
                },
                $direction: 'desc',
            },
        },
    ],
    data: {
        content: '',
        buttonHidden: true,
        selectedTradeId: '',
        newSessionId: '',
    },
    methods: {
        setContent(text) {
            this.setState({
                text,
            });
        },
        setButtonHidden(isHidden) {
            this.setState({
                buttonHidden: isHidden,
            });
        },
        async getConversationInfo() {
            const { sessionId } = this.props;
            if (!sessionId) {
                return;
            }
            const { data: [session], } = await this.features.cache.refresh('session', {
                data: {
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
                },
                filter: {
                    id: sessionId,
                },
            });
            this.setState({
                entity: session?.entity,
                entityId: session?.entityId,
            });
        },
        pageScroll(id) {
            const doc = window.document.getElementById(id);
            setTimeout(() => doc.scrollTo(0, 10000), 500);
        },
        async createMessage() {
            const { text, wechatUserId, newSessionId } = this.state;
            const { sessionId, isEntity } = this.props;
            const userId = this.features.token.getUserId();
            const applicationId = this.features.application.getApplicationId();
            if (!this.state.text) {
                this.setMessage({
                    type: 'warning',
                    content: '请输入内容',
                });
                return;
            }
            this.addItem({
                applicationId,
                text,
                userId,
                wechatUserId,
                sessionId: sessionId || newSessionId,
                type: 'text',
                createTime: Date.now(),
                aaoe: isEntity,
            });
            await this.execute(undefined, false);
            this.setState({
                text: '',
            });
            this.pageScroll('comment');
        },
        async customUpload(file) {
            const { sessionId } = this.props;
            // TS 语法
            // file 即选中的文件
            const { name, size, type, originFileObj } = file;
            const extension = name.substring(name.lastIndexOf('.') + 1);
            const filename = name.substring(0, name.lastIndexOf('.'));
            const extraFile = {
                origin: 'qiniu',
                type: 'image',
                tag1: 'image',
                filename,
                fileType: type,
                size,
                extension,
                entity: 'sessionMessage',
                id: (0, uuid_1.generateNewId)(),
            };
            try {
                await this.features.extraFile.upload(extraFile, originFileObj);
                const userId = this.features.token.getUserId();
                this.addItem({
                    id: (0, uuid_1.generateNewId)(),
                    sessionId,
                    type: 'image',
                    extraFile$entity: [
                        {
                            id: (0, uuid_1.generateNewId)(),
                            action: 'create',
                            data: extraFile,
                        },
                    ],
                });
                await this.execute(undefined, false);
            }
            catch (err) {
                throw err;
            }
        },
    },
});
