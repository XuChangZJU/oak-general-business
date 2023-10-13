export default OakComponent({
    isList: false,
    properties: {
        type: '',
        getMenuContent: (menuContent) => undefined,
        applicationId: '',
    },
    lifetimes: {
        async ready() {
            const { type, applicationId } = this.props;
            let result;
            if (type === 'news') {
                result = await this.features.wechatMenu.batchGetArticle({
                    applicationId: applicationId,
                    offset: 0,
                    count: 10,
                    noContent: 0,
                });
                if (result && result.item.length > 0) {
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
                }
            }
            else {
                result = await this.features.wechatMenu.batchGetMaterialList({
                    applicationId: applicationId,
                    type: type,
                    offset: 0,
                    count: 10,
                });
                this.setState({
                    materials: result.item,
                    total: result.total_count,
                });
            }
        },
    },
    methods: {
        async getMaterialList(page) {
            const { applicationId } = this.props;
            const { type } = this.props;
            const offset = (page - 1) * 10;
            const result = await this.features.wechatMenu.batchGetMaterialList({
                applicationId: applicationId,
                type: type,
                offset,
                count: 10,
            });
            this.setState({
                materials: result.item,
                total: result.total_count,
            });
        },
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
        async upload(media, description) {
            const { applicationId } = this.props;
            const { type } = this.props;
            const result = await this.features.wechatMenu.createMaterial({
                appType: 'wechatPublic',
                applicationId: applicationId,
                type: type,
                file: media,
                description,
                isPermanent: true,
            });
            if (result && result.mediaId) {
                this.setMessage({
                    type: 'success',
                    content: '上传成功',
                });
                this.getMaterialList(1);
                return true;
            }
            else {
                return false;
            }
        },
        async getMaterialImg(mediaId) {
            const { applicationId } = this.props;
            const result = await this.features.wechatMenu.getMaterial({
                applicationId: applicationId,
                mediaId,
                isPermanent: true,
            });
            return `data:image/png;base64,${result}`;
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
