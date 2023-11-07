import { EntityDict } from '../../../oak-app-domain';
import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { DATA_SUBSCRIBER_KEYS } from '../../../config/constants';
import { RowWithActions } from 'oak-frontend-base';

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
                extra2: 1,
                extension: 1,
                type: 1,
                entity: 1,
                entityId: 1,
                applicationId: 1,
                uploadState: 1,
                sort: 1,
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

            this.subData(
                [
                    {
                        entity: 'sessionMessage',
                        filter: {
                            sessionId: sessionId,
                        },
                        id: `${DATA_SUBSCRIBER_KEYS.sessionMessageList}-${sessionId}`,
                    },
                ],
                async () => {
                    await this.pageScroll('comment');
                }
            );

            this.createItem();
            this.getSessionInfo();
        },
        detached() {
            const { sessionId } = this.props;
            this.unSubData([
                `${DATA_SUBSCRIBER_KEYS.sessionMessageList}-${sessionId}`,
            ]);
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
                        this.getSessionInfo();

                        // 如果sessionId变了需要重新刷新下
                        this.refresh();
                        this.removeItem(sessionMessageId);
                        this.createItem();
                        this.pageScroll('comment');
                    }
                }
            }
        },
    },
    formData({ data, features }) {
        const sessionMessages = data?.filter((ele) => ele.$$createAt$$ !== 1);

        // 获取用户最后一条sessionMessage
        const userLastMessage = this.getUserLastMessage() as RowWithActions<
            EntityDict,
            'session'
        >[];
        return {
            sessionMessages,
            num: data?.length,
            userLastMessage,
        };
    },
    properties: {
        sessionId: '' as string,
        isEntity: false as boolean,
        dialog: false as boolean,
        entity: '',
        entityId: '',
        entityDisplay: (
            data:
                | EntityDict['session']['Schema'][]
                | RowWithActions<EntityDict, 'session'>[]
        ) => [] as Array<any>, // user端，指示如何显示entity对象名称
        entityProjection: null as any, // user端，指示需要取哪些entity的属性来显示entityDisplay
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
        buttonHidden: true,
    },
    methods: {
        getUserLastMessage() {
            const { sessionId } = this.props;
            const [lastMessage] = this.features.cache.get('sessionMessage', {
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
            });
            return lastMessage;
        },
        setContent(text: string) {
            const { sessionMessageId } = this.state;

            this.updateItem(
                {
                    text,
                    type: 'text',
                },
                sessionMessageId
            );
        },

        async getSessionInfo() {
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
            });
            this.setState({
                sessionMessageId,
            });
        },

        async sendMessage() {
            const { sessionMessageId } = this.state;

            this.updateItem(
                {
                    createTime: Date.now(),
                    type: 'text',
                },
                sessionMessageId
            );
            await this.execute(undefined, false);
            this.pageScroll('comment');
            this.createItem();
        },

        async customUpload(file: {
            name: string;
            size: number;
            type: string;
            originFileObj: File;
        }) {
            const { sessionMessageId, userLastMessage } = this.state;
            const { sessionId, isEntity } = this.props;

            const { name, size, type, originFileObj } = file;
            let applicationId = this.features.application.getApplicationId();
            const extension = name.substring(name.lastIndexOf('.') + 1);
            const filename = name.substring(0, name.lastIndexOf('.'));

            let origin: EntityDict['extraFile']['Schema']['origin'] = 'qiniu';
            //需要获取用户方回复的applicationId，判断用户是否从微信公众号或小程序发起客服消息
            if (isEntity && userLastMessage?.wechatUserId) {
                applicationId = userLastMessage?.applicationId;
                origin = 'wechat';
            }

            const extraFile = {
                applicationId,
                origin,
                type: 'image',
                tag1: 'image',
                filename,
                fileType: type,
                size,
                extension,
                objectId: generateNewId(),
                id: generateNewId(),
                uploadState: 'uploading',
                sort: 1000,
                extra2: {
                    isPermanent: false,
                },
                entity: 'sessionMessage',
                entityId: sessionMessageId,
            } as EntityDict['extraFile']['CreateSingle']['data'];

            await this.features.extraFile.autoUpload(
                extraFile as EntityDict['extraFile']['OpSchema'],
                originFileObj
            );

            try {
                this.updateItem(
                    {
                        createTime: Date.now(),
                        type: 'image',
                        // extraFile$entity: [
                        //     {
                        //         id: generateNewId(),
                        //         action: 'create',
                        //         data: extraFile,
                        //     },
                        // ],
                    },
                    sessionMessageId
                );
                // this.features.extraFile.addLocalFile(
                //     extraFile?.id,
                //     originFileObj
                // );
                await this.execute(undefined, false);
                // this.features.extraFile.upload(extraFile?.id);
                this.pageScroll('comment');
                this.createItem();
            } catch (err) {
                throw err;
            }
        },

        // async createMessage() {
        //     const { text, wechatUserId } = this.state;
        //     const { sessionId, isEntity } = this.props;
        //     const userId = this.features.token.getUserId();
        //     const applicationId = this.features.application.getApplicationId();

        //     this.addItem({
        //         applicationId,
        //         text,
        //         userId,
        //         wechatUserId,
        //         sessionId: sessionId,
        //         type: 'text',
        //         createTime: Date.now(),
        //         aaoe: isEntity,
        //     } as EntityDict['sessionMessage']['CreateSingle']['data']);
        //     await this.execute(undefined, false);
        //     this.pageScroll('comment');
        // },

        // async customUpload(file: {
        //     name: string;
        //     size: number;
        //     type: string;
        //     originFileObj: File;
        // }) {
        //     const { sessionId, isEntity } = this.props;

        //     const { name, size, type, originFileObj } = file;
        //     const applicationId = this.features.application.getApplicationId();
        //     const extension = name.substring(name.lastIndexOf('.') + 1);
        //     const filename = name.substring(0, name.lastIndexOf('.'));

        //     //需要获取用户方回复的applicationId

        //     const extraFile = {
        //         applicationId,
        //         origin: 'qiniu',
        //         type: 'image',
        //         tag1: 'image',
        //         filename,
        //         fileType: type,
        //         size,
        //         extension,
        //         entity: 'sessionMessage',
        //         id: generateNewId(),
        //     } as EntityDict['extraFile']['CreateSingle']['data'];

        //     try {
        //         this.addItem({
        //             applicationId,
        //             sessionId,
        //             createTime: Date.now(),
        //             aaoe: isEntity,
        //             type: 'image',
        //             extraFile$entity: [
        //                 {
        //                     id: generateNewId(),
        //                     action: 'create',
        //                     data: extraFile,
        //                 },
        //             ],
        //         } as EntityDict['sessionMessage']['CreateSingle']['data']);
        //         this.features.extraFile.addLocalFile(
        //             extraFile?.id,
        //             originFileObj
        //         );
        //         await this.execute(undefined, false);
        //         this.features.extraFile.upload(extraFile?.id);
        //     } catch (err) {
        //         throw err;
        //     }
        // },
    },
});
