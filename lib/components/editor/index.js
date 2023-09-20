"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("oak-domain/lib/utils/uuid");
const types_1 = require("oak-domain/lib/types");
exports.default = OakComponent({
    isList: true,
    properties: {
        html: '',
        delta: '',
        readOnly: false,
        showImgSize: false,
        showImgResize: false,
        editorStyle: '',
        placeholder: '请输入',
        showTabBar: true,
        entity: '',
        entityId: '',
        tag1: '',
        tag2: '',
    },
    methods: {
        onEditReady(e) {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                const { html, delta } = this.props;
                this
                    .createSelectorQuery()
                    .select('#editor')
                    .context((res) => {
                    this.editorCtx = res.context;
                    this.editorCtx.setContents({
                        html,
                        delta,
                    });
                })
                    .exec();
                this.triggerEvent('ready', e);
            }
        },
        onEditFocus(e) {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                this.triggerEvent('focus', e);
            }
        },
        onEditBlur(e) {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                this.triggerEvent('blur', e);
            }
        },
        onEditStatuschange(e) {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                this.triggerEvent('statuschange', e);
            }
        },
        async addExtraFile(extraFile) {
            try {
                const result = await this.features.cache.operate('extraFile', {
                    action: 'create',
                    data: extraFile,
                    id: (0, uuid_1.generateNewId)(),
                });
                return result;
            }
            catch (error) {
                if (error.constructor.name ===
                    types_1.OakUnloggedInException.name) {
                    this.navigateTo({
                        url: '/login',
                    });
                    return;
                }
                throw error;
            }
        },
        async onPickMp(event) {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                const { mediaType } = event.currentTarget.dataset;
                try {
                    const { errMsg, tempFiles } = await wx.chooseMedia({
                        count: 1,
                        mediaType: ['image'],
                        sourceType: ['album', 'camera'],
                        camera: 'back',
                    });
                    if (errMsg !== 'chooseMedia:ok') {
                        this.triggerEvent('error', {
                            level: 'warning',
                            msg: errMsg,
                        });
                    }
                    else {
                        const { fileType, size, tempFilePath } = tempFiles[0];
                        const extension = tempFilePath.substring(tempFilePath.lastIndexOf('.') + 1);
                        const filename = tempFilePath.substring(0, tempFilePath.lastIndexOf('.'));
                        const extraFile = {
                            extra1: tempFilePath,
                            origin: 'qiniu',
                            type: 'image',
                            tag1: this.props.tag1 || 'editorImg',
                            tag2: this.props.tag2,
                            objectId: (0, uuid_1.generateNewId)(),
                            filename,
                            size,
                            fileType,
                            extension,
                            entity: this.props.entity,
                            entityId: this.props.entityId,
                            bucket: '',
                            id: (0, uuid_1.generateNewId)(),
                        };
                        const { url } = await this.features.extraFile.createAndUpload(extraFile, extraFile.extra1);
                        // await this.addExtraFile(extraFile);
                        this.editorCtx.insertImage({
                            src: 'http://' + url,
                        });
                    }
                }
                catch (err) {
                    console.error(err);
                    if (err.errMsg !== 'chooseMedia:fail cancel') {
                        this.triggerEvent('error', {
                            level: 'error',
                            msg: err.errMsg,
                        });
                    }
                }
            }
        },
        onInput(e) {
            const html = e.detail.html;
            const text = e.detail.text;
            this.triggerEvent('input', { html, text }, {});
        },
        addUnderline() {
            this.editorCtx.format('underline');
        },
        addItalic() {
            this.editorCtx.format('italic');
        },
        addBold() {
            this.editorCtx.format('bold');
        },
        addHeader(e) {
            const headerType = e.currentTarget.dataset.header;
            this.editorCtx.format('header', headerType);
        },
        addAlign(e) {
            const alignType = e.currentTarget.dataset.align;
            this.editorCtx.format('align', alignType);
        },
        addList(e) {
            const listType = e.currentTarget.dataset.list;
            this.editorCtx.format('list', listType);
        },
        undo() {
            this.editorCtx.undo();
        },
    },
});
