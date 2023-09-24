import {
    WechatMpInstance,
    WechatPublicInstance,
    WechatSDK,
} from 'oak-external-sdk';
import {
    WechatMpConfig,
    WechatPublicConfig,
} from '../../../oak-app-domain/Application/Schema';
export default OakComponent({
    isList: false,
    properties: {
        button: [] as any[],
        news: [] as any[],
        applicationId: '',
    },
    data: {},
    methods: {
        async getMaterialImgAndVoice(
            type: 'image' | 'voice',
            mediaId: string
        ) {
            const { applicationId } = this.props;
            const imgFile = await this.features.wechatMenu.getMaterial({
                applicationId: applicationId!,
                type,
                mediaId,
            });
            return new Promise<
                | string
                | ArrayBuffer
                | PromiseLike<string | ArrayBuffer | null>
                | null
                | undefined
            >((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(imgFile);
                reader.onload = function (e) {
                    resolve(e.target?.result);
                };
            });
        },
        async getArticle(articleId: string) {
            const { applicationId } = this.props;
            const result = await this.features.wechatMenu.getArticle({
                applicationId: applicationId!,
                articleId,
            });
            if (result && result.news_item) {
                const modifiedResult = await Promise.all(
                    result.news_item.map(async (ele: any) => {
                        const coverUrl = await this.getMaterialImgAndVoice(
                            'image',
                            ele.thumb_media_id
                        );
                        return {
                            ...ele,
                            coverUrl,
                        };
                    })
                );
                return modifiedResult;
            }
        },
        async getMaterialVideo(mediaId: string) {
            const { applicationId } = this.props;
            const result = await this.features.wechatMenu.getMaterial({
                applicationId: applicationId!,
                type: 'video',
                mediaId,
            });
            if (result && result.down_url) {
                return { url: result.down_url, media_id: mediaId };
            }
        },
    },
});
