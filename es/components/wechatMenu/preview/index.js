export default OakComponent({
    isList: false,
    properties: {
        button: [],
        news: [],
        applicationId: '',
    },
    data: {},
    methods: {
        async getMaterialImgAndVoice(type, media_id) {
            const { applicationId } = this.props;
            const imgFile = await this.features.wechatMenu.getMaterial({ applicationId: applicationId, type, media_id });
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(imgFile);
                reader.onload = function (e) {
                    resolve(e.target?.result);
                };
            });
        },
        async getArticle(article_id) {
            const { applicationId } = this.props;
            const result = await this.features.wechatMenu.getArticle({ applicationId: applicationId, article_id });
            if (result && result.news_item) {
                const modifiedResult = await Promise.all(result.news_item.map(async (ele) => {
                    const coverUrl = await this.getMaterialImgAndVoice('image', ele.thumb_media_id);
                    return {
                        ...ele,
                        coverUrl
                    };
                }));
                return modifiedResult;
            }
        },
        async getMaterialVideo(media_id) {
            const { applicationId } = this.props;
            const result = await this.features.wechatMenu.getMaterial({ applicationId: applicationId, type: 'video', media_id });
            if (result && result.down_url) {
                return { url: result.down_url, media_id };
            }
        },
    }
});
