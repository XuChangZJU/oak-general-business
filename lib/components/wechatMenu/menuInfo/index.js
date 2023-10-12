"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    properties: {
        id: '',
        config: null,
        menuIndex: 0,
        changeConfig: (config) => undefined,
        publish: (iState) => undefined,
        getErrorIndex: (errorIndex) => undefined,
        createMenu: () => undefined,
        selectedBtn: 0,
        selectedSubBtn: 0,
        currentIndex: 1,
        changeIsPreview: (isPreview) => undefined,
        getOpen: (open) => undefined,
        menuType: '',
        applicationId: '',
        changeMenuId: (menuId) => undefined,
        deleteMenu: () => undefined,
        menuId: null,
        actions: [],
        wechatId: '',
        iState: '',
    },
    data: {},
    methods: {
        setConfig(index, content, currentIndex) {
            const { config, changeConfig } = this.props;
            if (typeof currentIndex === 'number') {
                content.name =
                    config.button[currentIndex].sub_button[index].name;
                config.button[currentIndex].sub_button[index] = content;
                changeConfig(config);
            }
            else {
                content.name = config.button[index].name;
                content.sub_button = [...config.button[index].sub_button];
                config.button[index] = content;
                changeConfig(config);
            }
        },
        confirmName(menuName) {
            if (Object.prototype.toString
                .call(menuName)
                .slice(8, -1)
                .toLowerCase() !== 'string') {
                throw Error('param str type error ');
            }
            else if (!menuName) {
                return '请输入菜单名称';
            }
            else if (!/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(menuName)) {
                return '字符串中包含除中文、数字、英文以外的字符！';
            }
            else if (menuName.replace(/[\u4e00-\u9fa5]/g, '**').length > 8) {
                return '字符串长度超过限制！';
            }
            return '';
        },
        confirmSubName(menuName) {
            if (Object.prototype.toString
                .call(menuName)
                .slice(8, -1)
                .toLowerCase() !== 'string') {
                throw Error('param str type error ');
            }
            else if (!menuName) {
                return '请输入子菜单名称';
            }
            else if (!/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(menuName)) {
                return '字符串中包含除中文、数字、英文以外的字符！';
            }
            else if (menuName.replace(/[\u4e00-\u9fa5]/g, '**').length > 16) {
                return '字符串长度超过限制！';
            }
            return '';
        },
        confirmUrl(url) {
            const pattern = /^(https:\/\/|http:\/\/)/;
            if (!pattern.test(url)) {
                return '公众号链接需要以https://或http://开头';
            }
        },
        editMenuName(index, name, currentIndex) {
            const { config, changeConfig } = this.props;
            if (typeof currentIndex === 'number') {
                config.button[currentIndex].sub_button[index].name = name;
                changeConfig(config);
            }
            else {
                config.button[index].name = name;
                changeConfig(config);
            }
        },
        deleteMenuContent(index, currentIndex) {
            const { config, changeConfig } = this.props;
            if (typeof currentIndex === 'number') {
                config.button[currentIndex].sub_button[index] = {
                    name: config.button[currentIndex].sub_button[index].name,
                };
                changeConfig(config);
            }
            else {
                config.button[index] = {
                    name: config.button[index].name,
                    sub_button: [...config.button[index].sub_button],
                };
                changeConfig(config);
            }
        },
        async getMaterialImgAndVoice(type, mediaId) {
            const { applicationId } = this.props;
            return new Promise((resolve, reject) => {
                this.features.wechatMenu
                    .getMaterial({
                    applicationId: applicationId,
                    type,
                    mediaId,
                })
                    .then((file) => {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function (e) {
                        resolve(e.target?.result);
                    };
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        },
        async getMaterialVideo(mediaId) {
            const { applicationId } = this.props;
            const result = await this.features.wechatMenu.getMaterial({
                applicationId: applicationId,
                type: 'video',
                mediaId,
            });
            if (result && result.down_url) {
                return { url: result.down_url, media_id: mediaId };
            }
        },
        decideMenuContentLabel(decidedMenuContent, type) {
            if (!decidedMenuContent && type !== 'text') {
                return '菜单内容';
            }
            else if (decidedMenuContent) {
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
            }
            else {
                return '文字'; // 默认值
            }
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
        checkError(arr) {
            const { getErrorIndex } = this.props;
            const errorIndex = [];
            arr.map((ele, index) => {
                if (ele.sub_button && ele.sub_button.length > 0) {
                    ele.sub_button.map((ele, index2) => {
                        if (Object.keys(ele).length === 1 &&
                            ele.hasOwnProperty('name')) {
                            errorIndex.push((index + 1) * 10 + index2);
                        }
                    });
                }
                else {
                    if (Object.keys(ele).length === 2 &&
                        ele.hasOwnProperty('name')) {
                        errorIndex.push(index);
                    }
                }
            });
            this.setState({
                errorIndex,
            });
            getErrorIndex(errorIndex);
            return errorIndex;
        },
        async createMenu(errorInfo, errorUrlInfo) {
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
            const { applicationId, config, changeConfig, publish, createMenu, menuType, changeMenuId, } = this.props;
            if (this.checkError(config.button).length === 0 &&
                config.button.length > 0) {
                changeConfig(config);
                createMenu();
            }
            else {
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
            const { deleteMenu } = this.props;
            deleteMenu();
        }
    },
});
