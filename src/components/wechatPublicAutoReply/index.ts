
import { EntityDict } from '../../oak-app-domain';
import { ReplyType } from '../../types/WeChat';
export default OakComponent({
    isList: true,
    entity: 'wechatPublicAutoReply',
    projection: {
        id: 1,
        applicationId: 1,
        content: 1,
        type: 1,
        event: 1,
    },
    formData({ data: rows }) {
        return {
            id: rows?.[0]?.id,
            content: rows?.[0]?.content,
            type: rows?.[0]?.type,
        };
    },
    filters: [
        {
            filter() {
                const { applicationId } = this.props
                return {
                    applicationId
                }
            },
        }
    ],
    properties: {
        applicationId: '',
    },
    data: {
        id: '',
    },
    lifetimes: {
        async ready() {
            const { applicationId } = this.props;
            const { data: wechatPublicAutoReply } = await this.features.cache.refresh(
                'wechatPublicAutoReply',
                {
                    data: {
                        id: 1,
                        applicationId: 1,
                    },
                    filter: {
                        applicationId,
                    }
                }
            );
            if (wechatPublicAutoReply.length < 1) {
                this.addItem({
                    applicationId: applicationId!,
                    type: 'text',
                    event: 'subscribe',
                })
            }
        },
    },
    methods: {
        changeType(type: ReplyType) {
            const { id } = this.state;
            this.updateItem({
                type,
            }, id);
        },
        async save() {
            await this.execute();
        },
        async getMaterialImgAndVoice(type: 'image' | 'voice', mediaId: string) {
            const { applicationId } = this.props;
            return new Promise<
                | string
                | ArrayBuffer
                | PromiseLike<string | ArrayBuffer | null>
                | null
                | undefined
            >((resolve, reject) => {
                this.features.wechatMenu
                    .getMaterial({
                        applicationId: applicationId!,
                        type,
                        mediaId,
                    })
                    .then((file) => {
                        let reader = new FileReader();
                        reader.readAsDataURL(file as unknown as Blob);
                        reader.onload = function (e) {
                            resolve(e.target?.result);
                        };
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        async getMaterialVideo(mediaId: string) {
            const { applicationId } = this.props;
            const result = await this.features.wechatMenu.getMaterial({
                applicationId: applicationId!,
                type: 'video',
                mediaId,
            });
            if (result && result.down_url) {
                return { title: result.title, description: result.title, mediaId: mediaId , url: result.down_url };
            }
        },
    },
});
