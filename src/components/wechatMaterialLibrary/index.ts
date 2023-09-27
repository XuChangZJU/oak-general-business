import { MenuType, MediaVideoDescription } from '../../types/WeChat'

export default OakComponent({
    isList: false,
    properties: {
        type: '' as MenuType,
        getMenuContent: (menuContent: any) => undefined as void,
        applicationId: '',
    },
    lifetimes: {
        async ready() {
            const { type, applicationId } = this.props;
            let result;
            if (type === 'news') {
                result = await this.features.wechatMenu.batchGetArticle({ applicationId: applicationId!, offset: 0, count: 10, noContent: 0 });
                const news = JSON.parse(result);
                if (news && news.item.length > 0) {
                    const modifiedResult = await Promise.all(news.item.map(async (ele: any) => {
                        const news_item = await Promise.all(ele.content.news_item.map(async (ele2: any) => {
                            const coverUrl = await this.getMaterialImg(ele2.thumb_media_id);
                            return {
                                ...ele2,
                                coverUrl
                            };
                        }));

                        return {
                            ...ele,
                            content: {
                                ...ele.content,
                                news_item
                            }
                        };
                    }));
                    this.setState({
                        materials: modifiedResult,
                        total: news.total_count,
                    });
                }
            } else {
                result = await this.features.wechatMenu.batchGetMaterialList({ applicationId: applicationId!, type: type!, offset: 0, count: 10 });
                this.setState({
                    materials: result.item,
                    total: result.total_count,
                });
            }
        }
    },
    methods: {
        async getMaterialList(page: number) {
            const { applicationId } = this.props;
            const { type } = this.props;
            const offset = (page - 1) * 10;
            const result = await this.features.wechatMenu.batchGetMaterialList({ applicationId: applicationId!, type: type!, offset, count: 10 });
            this.setState({
                materials: result.item,
                total: result.total_count,
            });
        },
        async getArticleList(page: number) {
            const { applicationId } = this.props;
            const offset = (page - 1) * 10;
            const result = await this.features.wechatMenu.batchGetArticle({ applicationId: applicationId!, offset, count: 10, noContent: 0 });
            const modifiedResult = await Promise.all(result.item.map(async (ele: any) => {
                const news_item = await Promise.all(ele.content.news_item.map(async (ele2: any) => {
                    const coverUrl = await this.getMaterialImg(ele2.thumb_media_id);
                    return {
                        ...ele2,
                        coverUrl
                    };
                }));

                return {
                    ...ele,
                    content: {
                        ...ele.content,
                        news_item
                    }
                };
            }));
            this.setState({
                materials: modifiedResult,
                total: result.total_count,
            });
        },
        async upload(media: File, description?: MediaVideoDescription) {
            const { applicationId } = this.props;
            const { type } = this.props;
            const result = await this.features.wechatMenu.createMaterial({ applicationId: applicationId!, type: type as 'image' | 'voice' | 'video', file: media, description, isPermanent: true });
            if (result && result.mediaId) {
                this.setMessage({
                    type: 'success',
                    content: '上传成功',
                });
                this.getMaterialList(1);
                return true;
            } else {
                return false;
            }
        },
        async getMaterialImg(mediaId: string) {
            const { applicationId } = this.props
            const imgFile = await this.features.wechatMenu.getMaterial({
                applicationId: applicationId!,
                type: 'image',
                mediaId,
            });
            return new Promise<string | ArrayBuffer | PromiseLike<string | ArrayBuffer | null> | null | undefined>((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(imgFile);
                reader.onload = function (e) {
                    resolve(e.target?.result);
                };
            });
        },
        getImg(url: string) {
            return this.features.locales.makeBridgeUrl(url);
        }
    }
});