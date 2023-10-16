export default OakComponent({
    entity: 'sessionMessage',
    isList: false,
    projection: {
        id: 1,
        text: 1,
        type: 1,
        createTime: 1,
        userId: 1,
        wechatUserId: 1,
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
        const session = sessionMessage?.session;
        const newSessionMessage = {
            type,
            aaoe: sessionMessage?.aaoe,
            text: sessionMessage?.text,
            id: sessionMessage?.id,
            $$createAt$$: sessionMessage?.$$createAt$$,
            sessionId: sessionMessage?.sessionId,
            userId: session?.userId,
            userMobile: session?.user?.mobile$user &&
                session?.user?.mobile$user[0]?.mobile,
            userAvatar: this.features.extraFile.getUrl(session?.user?.extraFile$entity &&
                session?.user?.extraFile$entity[0]),
        };
        if (type === 'image') {
            const extraFile$entity = sessionMessage?.extraFile$entity;
            Object.assign(newSessionMessage, {
                picUrl: features.extraFile.getUrl(extraFile$entity && extraFile$entity[0]),
            });
        }
        return newSessionMessage;
    },
    properties: {
        isEntity: false,
        customUpload: (file) => { },
        send: () => { },
        setText: (text) => { },
    },
    methods: {
        setContent(text) {
            const { setText } = this.props;
            if (typeof setText === 'function') {
                setText(text);
            }
        },
        async upload(file) {
            const { customUpload } = this.props;
            if (typeof customUpload === 'function') {
                customUpload(file);
            }
        },
        async sendMessage() {
            const { send } = this.props;
            const { text } = this.state;
            if (!text) {
                this.setMessage({
                    type: 'warning',
                    content: this.t('enterContent'),
                });
                return;
            }
            if (typeof send === 'function') {
                send();
            }
        },
    },
});
