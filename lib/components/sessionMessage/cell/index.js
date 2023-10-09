"use strict";
// import { Schema as ExtraFile } from '../../../
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'sessionMessage',
    isList: false,
    projection: {
        id: 1,
        text: 1,
        type: 1,
        createTime: 1,
        userId: 1,
        wechatUserId: 1,
        // isRead: 1,
        $$createAt$$: 1,
        sessionId: 1,
        session: {
            id: 1,
            entity: 1,
            entityId: 1,
            userId: 1,
            user: {
                id: 1,
                name: 1,
                mobile$user: {
                    $entity: 'mobile',
                    data: {
                        id: 1,
                        mobile: 1,
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
        aaoe: 1,
        extraFile$entity: {
            $entity: 'extraFile',
            data: {
                id: 1,
                tag1: 1,
                tag2: 1,
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
                    $in: ['image'],
                },
            },
        },
    },
    formData({ data: sessionMessage, features }) {
        const type = sessionMessage?.type;
        // const data = wechatMessage?.data;
        const session = sessionMessage?.session;
        const newSessionMessage = {
            type,
            aaoe: sessionMessage?.aaoe,
            // data,
            text: sessionMessage?.text,
            id: sessionMessage?.id,
            $$createAt$$: sessionMessage?.$$createAt$$,
            sessionId: sessionMessage?.sessionId,
            userId: session?.userId,
            userMobile: session?.user?.mobile$user &&
                session?.user?.mobile$user[0]?.mobile,
            // companyName: conversation?.company?.name,
            userAvatar: this.features.extraFile.getUrl(session?.user?.extraFile$entity &&
                session?.user?.extraFile$entity[0]),
        };
        // if (type === 'image') {
        //     const extraFile$entity =
        //         wechatMessage?.extraFile$entity as ExtraFile[];
        //     Object.assign(newWechatMessage, {
        //         picUrl: features.extraFile.getUrl(extraFile$entity[0]),
        //     });
        // }
        return newSessionMessage;
    },
    properties: {
        key: '',
        isEntity: false,
        isUser: false,
    },
    methods: {
        getAvatarUrl(aaoe) {
            const defaultUrl = 'http://qiniu.gecomebox.com/static/defaultAvatar.png';
            const { companyLogoUrl, userAvatar, parkLogoUrl } = this.state;
            if (aaoe) {
                return defaultUrl;
            }
            else {
                return userAvatar || defaultUrl;
            }
            // switch (type) {
            //     case 'company': {
            //         return companyLogoUrl || defaultUrl;
            //     }
            //     case 'user': {
            //         return userAvatar || defaultUrl;
            //     }
            //     case 'platformProvider': {
            //         return process.env.PUBLIC_URL + '/logo192.png';
            //     }
            //     case 'park': {
            //         return parkLogoUrl || defaultUrl;
            //     }
            //     default: {
            //         return defaultUrl
            //     }
            // }
        },
    },
});
