import { EntityDict } from '../../../oak-app-domain';
import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { DATA_SUBSCRIBER_KEYS } from '../../../config/constants';
import { getConfig } from '../../../utils/getContextConfig';
import { QiniuCosConfig } from '../../../types/Config';
export default OakComponent({
    entity: 'sessionMessage',
    projection: {
        id: 1,
        text: 1,
        type: 1,
        userId: 1,
        wechatUserId: 1,
        applicationId: 1,
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

            this.subData([
                {
                    entity: 'sessionMessage',
                    filter: {
                        sessionId: sessionId,
                    },
                    id: `${DATA_SUBSCRIBER_KEYS.sessionMessageList}-${sessionId}`,
                }
            ],
                async () => { await this.pageScroll('comment') }
            )

            this.createItem();
            this.getConversationInfo();
            this.getUserLastMessage();
        },
        detached() {
            if (this.timer) {
                clearInterval((this as any).timer);
            }
            const { sessionId } = this.props;
            this.unSubData([
                `${DATA_SUBSCRIBER_KEYS.sessionMessageList}-${sessionId}`
            ])
        },
    },
    listeners: {
        num(prev, next) {
            if (prev.num !== next.num) {
                this.pageScroll('comment');
            }
        },

        sessionId(prev, next) {
            if (this.state.oakFullpath) {

                if (prev.sessionId !== next.sessionId) {
                    if (next.sessionId) {
                        const { sessionMessageId } = this.state;
                        this.getConversationInfo();

                        // 如果sessionId变了需要重新刷新下
                        this.refresh();
                        this.removeItem(sessionMessageId);
                        this.setState({
                            text: '',
                        });
                        this.createItem();
                        this.pageScroll('comment');
                    }
                }
            }
        },
    },
    formData({ data: sessionMessageList = [], features }) {
        const sessionMessageType = sessionMessageList?.find(
            (ele) => ele.$$createAt$$ === 1
        )?.type;
        return {
            sessionMessageList,
            num: sessionMessageList?.length,
            sessionMessageType,
        };
    },
    properties: {
        sessionId: '' as string,
        isEntity: false as boolean,
        isUser: false as boolean,
        dialog: false as boolean,
        entity: '',
        entityId: '',
    },
    filters: [
        {
            filter() {
                const { sessionId } = this.props;
                return {
                    sessionId,
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
        entityDisplay: (data: any) => [] as Array<any>,        // user端，指示如何显示entity对象名称
        entityProjection: {} as any,    // user端，指示需要取哪些entity的属性来显示entityDisplay
    },
    methods: {
        getUserLastMessage() {
            const { sessionId } = this.props;
            const [lastMessage] = this.features.cache.get(
                'sessionMessage',
                {
                    data: {
                        id: 1,
                        sessionId: 1,
                        text: 1,
                        type: 1,
                        userId: 1,
                        wechatUserId: 1,
                        applicationId: 1,
                        createTime: 1,
                        $$createAt$$: 1,
                        aaoe: 1,
                    },
                    filter: {
                        sessionId,
                        aaoe: false,
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
            const isWeChat = !!lastMessage?.wechatUserId;
            console.log(lastMessage)
            this.setState({ isWeChat })
        },
        setContent(text: string) {
            const { sessionMessageId } = this.state;
            console.log(sessionMessageId)
            this.setState({
                text,
            });
            this.updateItem({
                text,
                type: 'text',
            }, sessionMessageId)
        },
        setButtonHidden(isHidden: boolean) {
            this.setState({
                buttonHidden: isHidden,
            });
        },
        async getConversationInfo() {
            const { sessionId } = this.props;
            if (!sessionId) {
                return;
            }
            const {
                data: [session],
            } = await this.features.cache.refresh('session', {
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
                } as EntityDict['session']['Selection']['data'],
                filter: {
                    id: sessionId,
                },
            });
            this.setState({
                entity: session?.entity,
                entityId: session?.entityId,
            });
        },
        pageScroll(id: string) {
            const doc: any = window.document.getElementById(id);
            setTimeout(() => doc.scrollTo(0, 10000), 500);
        },

        async createItem() {
            const { text, wechatUserId } = this.state;
            const { sessionId, isEntity } = this.props;
            const userId = this.features.token.getUserId();
            const applicationId = this.features.application.getApplicationId();
            const sessionMessageId = this.addItem({
                applicationId,
                userId,
                wechatUserId,
                sessionId: sessionId,
                aaoe: isEntity,
            })
            this.setState({
                sessionMessageId,
            })
        },

        async createMessage() {
            const { text, wechatUserId, newSessionId, sessionMessageId } = this.state;
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
            // this.addItem({
            //     applicationId,
            //     text,
            //     userId,
            //     wechatUserId,
            //     sessionId: sessionId || newSessionId,
            //     type: 'text',
            //     createTime: Date.now(),
            //     aaoe: isEntity,
            // } as EntityDict['sessionMessage']['CreateSingle']['data']);
            this.updateItem({
                createTime: Date.now(),
            }, sessionMessageId)
            await this.execute(undefined, false);
            this.setState({
                text: '',
            });
            this.pageScroll('comment');
            this.createItem();
        },


        async customUpload(file: {
            name: string;
            size: number;
            type: string;
            originFileObj: File;
        }) {
            const { sessionId, isEntity } = this.props;

            // TS 语法
            // file 即选中的文件
            const { name, size, type, originFileObj } = file;
            const applicationId = this.features.application.getApplicationId();
            const extension = name.substring(name.lastIndexOf('.') + 1);
            const filename = name.substring(0, name.lastIndexOf('.'));
            let bucket2 = '';
            if (!bucket2) {
                const context = this.features.cache.begin();
                const { config } = getConfig(context, 'Cos', 'qiniu');
                this.features.cache.commit();

                const { defaultBucket } = config as QiniuCosConfig;
                bucket2 = defaultBucket!;
            }
            const extraFile = {
                applicationId,
                bucket: bucket2,
                origin: 'qiniu',
                type: 'image',
                tag1: 'image',
                filename,
                fileType: type,
                size,
                extension,
                entity: 'sessionMessage',
                id: generateNewId(),
            } as EntityDict['extraFile']['CreateSingle']['data'];

            try {
                // await this.features.extraFile.upload(
                //     extraFile,
                //     originFileObj
                // );
                const userId = this.features.token.getUserId();
                this.addItem({
                    id: generateNewId(),
                    applicationId,
                    sessionId,
                    createTime: Date.now(),
                    aaoe: isEntity,
                    type: 'image',
                    extraFile$entity: [
                        {
                            id: generateNewId(),
                            action: 'create',
                            data: extraFile,
                        },
                    ],
                } as EntityDict['sessionMessage']['CreateSingle']['data']);
                this.features.extraFile2.addLocalFile(extraFile?.id, originFileObj);
                await this.execute(undefined, false);
                this.features.extraFile2.upload(extraFile?.id);
            } catch (err) {
                throw err;
            }
        },
    },
});
