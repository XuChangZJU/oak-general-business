import React from 'react';
import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { EntityDict } from '../../oak-app-domain';
import { OakException, OakUnloggedInException } from 'oak-domain/lib/types';
export default OakComponent({
    isList: true,
    properties: {
        html: '' as string,
        delta: '' as string,
        readOnly: false as boolean,
        showImgSize: false as boolean,
        showImgResize: false as boolean,
        editorStyle: '' as string,
        placeholder: '请输入' as string,
        showTabBar: true as boolean,
        entity: '',
        entityId: '',
        tag1: '',
        tag2: '',
    },
    methods: {
        onEditReady(e: WechatMiniprogram.EventCallback) {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                const { html, delta } = this.props;
                (this as any)
                    .createSelectorQuery()
                    .select('#editor')
                    .context((res: any) => {
                        (this as any).editorCtx = res.context;
                        (this as any).editorCtx.setContents({
                            html,
                            delta,
                        });
                    })
                    .exec();
                this.triggerEvent('ready', e);
            }
        },
        onEditFocus(e: WechatMiniprogram.EventCallback) {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                this.triggerEvent('focus', e);
            }
        },
        onEditBlur(e: WechatMiniprogram.EventCallback) {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                this.triggerEvent('blur', e);
            }
        },
        onEditStatuschange(e: WechatMiniprogram.EventCallback) {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                this.triggerEvent('statuschange', e);
            }
        },

        async onPickMp(event: WechatMiniprogram.Touch) {
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
                    } else {
                        const { fileType, size, tempFilePath } = tempFiles[0];
                        const extension = tempFilePath.substring(
                            tempFilePath.lastIndexOf('.') + 1
                        );
                        const filename = tempFilePath.substring(
                            0,
                            tempFilePath.lastIndexOf('.')
                        );
                        const extraFile = {
                            origin: 'qiniu',
                            type: 'image',
                            tag1: this.props.tag1 || 'editorImg',
                            tag2: this.props.tag2,
                            objectId: generateNewId(),
                            filename,
                            size,
                            fileType,
                            extension,
                            entity: this.props.entity,
                            entityId: this.props.entityId,
                            bucket: '',
                            id: generateNewId(),
                            uploadState: 'uploading'
                        } as EntityDict['extraFile']['CreateSingle']['data'];
                        const url = await this.features.extraFile.autoUpload(
                            extraFile as EntityDict['extraFile']['OpSchema'],
                            tempFilePath!
                        );

                        (this as any).editorCtx.insertImage({
                            src: url,
                        });
                    }
                } catch (err: any) {
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
        onInput(e: WechatMiniprogram.TouchEvent) {
            const html = e.detail.html;
            const text = e.detail.text;
            this.triggerEvent('input', { html, text }, {});
        },
        addUnderline() {
            (this as any).editorCtx.format('underline');
        },
        addItalic() {
            (this as any).editorCtx.format('italic');
        },
        addBold() {
            (this as any).editorCtx.format('bold');
        },
        addHeader(e: WechatMiniprogram.TouchEvent) {
            const headerType = e.currentTarget.dataset.header;
            (this as any).editorCtx.format('header', headerType);
        },
        addAlign(e: WechatMiniprogram.TouchEvent) {
            const alignType = e.currentTarget.dataset.align;
            (this as any).editorCtx.format('align', alignType);
        },
        addList(e: WechatMiniprogram.TouchEvent) {
            const listType = e.currentTarget.dataset.list;
            (this as any).editorCtx.format('list', listType);
        },
        undo() {
            (this as any).editorCtx.undo();
        },
    },
});
