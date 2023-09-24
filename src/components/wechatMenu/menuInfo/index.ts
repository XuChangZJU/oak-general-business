
export default OakComponent({
    isList: false,
    properties: {
        id: '',
        config: null as any,
        menuIndex: 0,
        changeConfig: (config: any) => undefined as void,
        changePublishState: (publish: 'wait' | 'success' | 'fail') =>
            undefined as void,
        getErrorIndex: (errorIndex: number[]) => undefined as void,
        createMenu: async () => undefined as void,
        selectedBtn: 0,
        selectedSubBtn: 0,
        currentIndex: 1,
        changeIsPreview: (isPreview: boolean) => undefined as void,
        getOpen: (open: boolean) => undefined as void,
        menuType: '',
        applicationId: '',
        changeMenuId: (menuId: number) => undefined as void,
        deleteMenu: () => undefined as void,
        menuId: null as unknown as number,
    },
    data: {},
    methods: {
        setConfig(index: number, content: any, currentIndex?: number) {
            const { config, changeConfig } = this.props;
            if (typeof currentIndex === 'number') {
                content.name =
                    config!.button![currentIndex].sub_button[index].name;
                config!.button![currentIndex].sub_button[index] = content;
                changeConfig!(config);
            } else {
                content.name = config!.button![index].name;
                content.sub_button = [...config!.button![index].sub_button];
                config!.button![index] = content;
                changeConfig!(config);
            }
        },
        confirmName(menuName: string) {
            if (
                Object.prototype.toString
                    .call(menuName)
                    .slice(8, -1)
                    .toLowerCase() !== 'string'
            ) {
                throw Error('param str type error ');
            } else if (!menuName) {
                return '请输入菜单名称';
            } else if (!/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(menuName)) {
                return '字符串中包含除中文、数字、英文以外的字符！';
            } else if (menuName.replace(/[\u4e00-\u9fa5]/g, '**').length > 8) {
                return '字符串长度超过限制！';
            }
            return '';
        },
        confirmSubName(menuName: string) {
            if (
                Object.prototype.toString
                    .call(menuName)
                    .slice(8, -1)
                    .toLowerCase() !== 'string'
            ) {
                throw Error('param str type error ');
            } else if (!menuName) {
                return '请输入子菜单名称';
            } else if (!/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(menuName)) {
                return '字符串中包含除中文、数字、英文以外的字符！';
            } else if (menuName.replace(/[\u4e00-\u9fa5]/g, '**').length > 16) {
                return '字符串长度超过限制！';
            }
            return '';
        },
        confirmUrl(url: string) {
            const pattern = /^(https:\/\/|http:\/\/)/;
            if (!pattern.test(url)) {
                return '公众号链接需要以https://或http://开头';
            }
        },
        editMenuName(index: number, name: string, currentIndex?: number) {
            const { config, changeConfig } = this.props;
            if (typeof currentIndex === 'number') {
                config!.button![currentIndex].sub_button[index].name = name;
                changeConfig!(config);
            } else {
                config!.button![index].name = name;
                changeConfig!(config);
            }
        },
        deleteMenuContent(index: number, currentIndex?: number) {
            const { config, changeConfig } = this.props;
            if (typeof currentIndex === 'number') {
                config!.button![currentIndex].sub_button[index] = {
                    name: config!.button![currentIndex].sub_button[index].name,
                };
                changeConfig!(config);
            } else {
                config!.button![index] = {
                    name: config!.button![index].name,
                    sub_button: [...config!.button![index].sub_button],
                };
                changeConfig!(config);
            }
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
                return { url: result.down_url, media_id: mediaId };
            }
        },
        decideMenuContentLabel(
            decidedMenuContent: any,
            type: 'news' | 'image' | 'voice' | 'video' | 'text'
        ) {
            if (!decidedMenuContent && type !== 'text') {
                return '菜单内容';
            } else if (decidedMenuContent) {
                switch (type) {
                    case 'news':
                        return '图文信息';
                    case 'image':
                        return '图片';
                    case 'voice':
                        return '音频';
                    case 'video':
                        return '视频';
                    default:
                        return '文字';
                }
            } else {
                return '文字'; // 默认值
            }
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
        checkError(arr: any[]) {
            const { getErrorIndex } = this.props;
            const errorIndex = [] as number[];
            arr.map((ele, index: number) => {
                if (ele.sub_button && ele.sub_button.length > 0) {
                    ele.sub_button.map((ele: any, index2: number) => {
                        if (
                            Object.keys(ele).length === 1 &&
                            ele.hasOwnProperty('name')
                        ) {
                            errorIndex.push((index + 1) * 10 + index2);
                        }
                    });
                } else {
                    if (
                        Object.keys(ele).length === 2 &&
                        ele.hasOwnProperty('name')
                    ) {
                        console.log(index);
                        errorIndex.push(index);
                    }
                }
            });
            this.setState({
                errorIndex,
            });
            getErrorIndex!(errorIndex);
            return errorIndex;
        },
        async createMenu(errorInfo: string, errorUrlInfo: string) {
            if (errorInfo) {
                this.setMessage({
                    type: 'warning',
                    content: '菜单名称有误',
                });
                return;
            }
            if (errorUrlInfo) {
                this.setMessage({
                    type: 'warning',
                    content: '公众号链接有误',
                });
                return;
            }
            const {
                applicationId,
                config,
                changeConfig,
                changePublishState,
                createMenu,
                menuType,
                changeMenuId,
            } = this.props;
            if (
                this.checkError(config.button).length === 0 &&
                config.button.length > 0
            ) {
                changeConfig!(config);
                const removeSubTypeAndContent = (obj: any) => {
                    const { subType, content, ...newObj } = obj;
                    return newObj;
                };
                const menuConfig = config.button.map((item: any) => {
                    if (item.sub_button && item.sub_button.length > 0) {
                        const sub_button = item.sub_button.map(
                            removeSubTypeAndContent
                        );
                        return { ...removeSubTypeAndContent(item), sub_button };
                    } else {
                        return removeSubTypeAndContent(item);
                    }
                });
                if (menuType === 'common') {
                    const result = await this.features.wechatMenu.createMenu({
                        applicationId: applicationId!,
                        menuConfig: { button: menuConfig },
                    });
                    if (result.success) {
                        changePublishState!('success');
                    } else {
                        changePublishState!('fail');
                    }
                    await createMenu!();
                } else {
                    const button = {
                        button: menuConfig,
                        matchrule: config.matchrule,
                    };
                    const result =
                        await this.features.wechatMenu.createConditionalMenu({
                            applicationId: applicationId!,
                            menuConfig: button,
                        });
                    if (result.success) {
                        changeMenuId!(result.menuid);
                        changePublishState!('success');
                    } else {
                        changePublishState!('fail');
                    }
                    await createMenu!();
                }
            } else {
                if (config.button.length === 0) {
                    this.setMessage({
                        content: '请添加自定义菜单',
                        type: 'warning',
                    });
                    return;
                }
                if (this.checkError(config.button).length > 0) {
                    this.setMessage({
                        content: '请添加菜单消息',
                        type: 'warning',
                    });
                    return;
                }
            }
        },
        async deleteConditionalMenu() {
            const { applicationId, deleteMenu, menuIndex, menuId, createMenu } =
                this.props;
            const result = await this.features.wechatMenu.deleteConditionalMenu(
                { applicationId: applicationId!, menuId: menuId! }
            );
            if (result.success) {
                deleteMenu!();
                await createMenu!();
            } else {
                this.setMessage({
                    type: 'error',
                    content: result.errmsg,
                });
            }
        },
    },
});