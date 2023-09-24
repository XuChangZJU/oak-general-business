"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    properties: {
        getUrl: (url) => undefined,
        changeOpen: (open) => undefined,
        applicationId: '',
    },
    lifetimes: {
        async ready() {
            const { applicationId } = this.props;
            if (applicationId) {
                this.getArticleList(1);
            }
        },
    },
    methods: {
        async getArticleList(page) {
            const { applicationId } = this.props;
            const offset = (page - 1) * 10;
            const result = await this.features.wechatMenu.batchGetArticle({
                applicationId: applicationId,
                offset,
                count: 10,
                noContent: 0,
            });
            const modifiedResult = await Promise.all(result.item.map(async (ele) => {
                const news_item = await Promise.all(ele.content.news_item.map(async (ele2) => {
                    const coverUrl = await this.getMaterialImg(ele2.thumb_media_id);
                    return {
                        ...ele2,
                        coverUrl,
                    };
                }));
                return {
                    ...ele,
                    content: {
                        ...ele.content,
                        news_item,
                    },
                };
            }));
            this.setState({
                materials: modifiedResult,
                total: result.total_count,
            });
        },
        async getMaterialImg(mediaId) {
            const { applicationId } = this.props;
            const imgFile = await this.features.wechatMenu.getMaterial({
                applicationId: applicationId,
                type: 'image',
                mediaId,
            });
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(imgFile);
                reader.onload = function (e) {
                    resolve(e.target?.result);
                };
            });
        },
    },
});
