export default OakComponent({
    isList: false,
    properties: {
        button: [],
        news: [],
        applicationId: '',
    },
    data: {},
    methods: {
        async getMaterialImgAndVoice(type, mediaId) {
            const { applicationId } = this.props;
            const result = await this.features.wechatMenu.getMaterial({
                applicationId: applicationId,
                mediaId,
                isPermanent: true,
            });
            return `data:image/png;base64,${result}`;
        },
        async getArticle(articleId) {
            const { applicationId } = this.props;
            const result = await this.features.wechatMenu.getArticle({
                applicationId: applicationId,
                articleId,
            });
            if (result && result.news_item) {
                const modifiedResult = await Promise.all(result.news_item.map(async (ele) => {
                    const coverUrl = await this.getMaterialImgAndVoice('image', ele.thumb_media_id);
                    return {
                        ...ele,
                        coverUrl,
                    };
                }));
                return modifiedResult;
            }
        },
        async getMaterialVideo(mediaId) {
            const { applicationId } = this.props;
            const result = await this.features.wechatMenu.getMaterial({
                applicationId: applicationId,
                mediaId,
                isPermanent: true,
            });
            if (result && result.down_url) {
                return { url: result.down_url, media_id: mediaId };
            }
        },
        getImg(str) {
            if (!str) {
                return '';
            }
            if (str.includes('data:image/png;')) {
                return str;
            }
            return this.features.locales.makeBridgeUrl(str);
        },
    },
});
