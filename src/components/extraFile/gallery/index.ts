import { generateNewId } from 'oak-domain/lib/utils/uuid';
import assert from 'assert';
import Dialog from '../../../utils/dialog/index';
import { EntityDict } from '../../../general-app-domain';

export default OakComponent({
    entity: 'extraFile',
    isList: true,
    projection: {
        id: 1,
        tag1: 1,
        tag2: 1,
        origin: 1,
        bucket: 1,
        objectId: 1,
        filename: 1,
        extra1: 1,
        extension: 1,
        type: 1,
        entity: 1,
        entityId: 1,
        fileType: 1,
    },
    formData({ data: originalFiles, features }) {
        let files = (
            originalFiles as Array<EntityDict['extraFile']['OpSchema']>
        )?.filter((ele) => !ele.$$deleteAt$$);
        if (this.props.tag1) {
            files = files?.filter((ele) => ele?.tag1 === this.props.tag1);
        }
        if (this.props.tag2) {
            files = files?.filter((ele) => ele?.tag2 === this.props.tag2);
        }
        return {
            files,
            disableInsert:
                this.props.maxNumber === 0 ||
                files?.length >= this.props.maxNumber,
        };
    },
    data: {
        // 根据 size 不同，计算的图片显示大小不同
        itemSizePercentage: '',
    },
    wechatMp: {
        externalClasses: ['oak-class', 'oak-item-class'],
    },
    filters: [
        {
            filter() {
                const { tag1, tag2 } = this.props;
                const filter1 = {};
                if (tag1) {
                    Object.assign(filter1, { tag1 });
                }
                if (tag2) {
                    Object.assign(filter1, { tag2 });
                }
                return filter1;
            },
        },
    ],
    properties: {
        removeLater: Boolean,
        autoUpload: {
            type: Boolean,
            value: false,
        },
        maxNumber: {
            type: Number,
            value: 20,
        },
        extension: {
            //小程序独有 chooseMessageFile 根据文件拓展名过滤，仅 type==file 时有效。每一项都不能是空字符串。默认不过滤。
            type: Array,
        },
        fileType: {
            //小程序独有 chooseMessageFile 文件type
            type: String,
            value: 'all',
        },
        selectCount: {
            //小程序独有 文件一次选择几个
            type: Number,
            value: 1,
        },
        sourceType: {
            type: Array,
            value: ['album', 'camera'],
        },
        mediaType: {
            //小程序独有 文件上传类型
            type: Array,
            value: ['image'],
        },
        // 图片显示模式
        mode: {
            //小程序独有
            type: String,
            value: 'aspectFit',
        },
        // 每行可显示的个数
        size: {
            // 小程序独有
            type: Number,
            value: 3,
        },
        showUploadList: {
            // web独有 是否展示文件列表, 可设为一个对象
            type: Boolean,
            value: true,
        },
        accept: {
            // web独有 文件上传类型
            type: String,
            value: 'image/*',
        },
        // 图片是否可预览
        preview: {
            type: Boolean,
            value: true,
        },
        // 图片是否可删除
        disableDelete: {
            type: Boolean,
            value: false,
        },
        // 上传按钮隐藏
        disableAdd: {
            type: Boolean,
            value: false,
        },
        // 下按按钮隐藏
        disableDownload: {
            type: Boolean,
            value: false,
        },
        type: String,
        origin: String,
        tag1: String,
        tag2: String,
        entity: String,
        entityId: String,
        theme: {
            type: String,
            value: 'image',
        },
    },

    methods: {
        /**
         * 获取组件内部节点位置信息（单个）
         * @param component 组件实例
         * @param selector {String} css选择器
         * @returns boundingClientRect() 回调函数的值
         */
        async getNodeRectFromComponent(component: any, selector: any) {
            return await new Promise((resolve) => {
                component
                    .createSelectorQuery()
                    .select(selector)
                    .boundingClientRect((res: any) => {
                        resolve(res);
                    })
                    .exec();
            });
        },
        /**
        //  * px 转 rpx
        //  * @param px 像素值
        //  */
        px2rpx(px: number) {
            const windowWidth = wx.getSystemInfoSync().windowWidth;
            return (750 / windowWidth) * px;
        },
        async chooseMediaByMp() {
            const { selectCount, mediaType, sourceType } = this.props;
            try {
                const { errMsg, tempFiles } = await wx.chooseMedia({
                    count: selectCount,
                    mediaType,
                    sourceType,
                });
                if (errMsg !== 'chooseMedia:ok') {
                    this.triggerEvent('error', {
                        level: 'warning',
                        msg: errMsg,
                    });
                } else {
                    await Promise.all(
                        tempFiles.map(async (tempExtraFile) => {
                            const {
                                tempFilePath,
                                thumbTempFilePath,
                                fileType,
                                size,
                            } = tempExtraFile;
                            const filePath = tempFilePath || thumbTempFilePath;
                            const fileFullName =
                                filePath.match(/[^/]+(?!.*\/)/g)![0];
                            await this.pushExtraFile({
                                name: fileFullName,
                                fileType,
                                size,
                                extra1: filePath,
                            });
                        })
                    );
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
        },
        async chooseFileByMp() {
            const { selectCount, extension, fileType } = this.props;
            try {
                const { errMsg, tempFiles } = await wx.chooseMessageFile({
                    count: selectCount,
                    type: 'all',
                    ...(fileType === 'file' ? { extension } : {}),
                });
                if (errMsg !== 'chooseMessageFile:ok') {
                    this.triggerEvent('error', {
                        level: 'warning',
                        msg: errMsg,
                    });
                } else {
                    await Promise.all(
                        tempFiles.map(async (tempExtraFile) => {
                            const { path, type, size, name } = tempExtraFile;
                            await this.pushExtraFile({
                                name,
                                fileType: type,
                                size,
                                extra1: path,
                            });
                        })
                    );
                }
            } catch (err: any) {
                console.error(err);
                if (err.errMsg !== 'chooseMessageFile:fail cancel') {
                    this.triggerEvent('error', {
                        level: 'error',
                        msg: err.errMsg,
                    });
                }
            }
        },
        onPickByMp() {
            const { theme } = this.props;
            if (['image', 'image-flow'].includes(theme)) {
                this.chooseMediaByMp();
            } else {
                this.chooseFileByMp();
            }
        },
        async onPickByWeb(
            uploadFiles: any[],
            callback?: (file: any, status: string) => void
        ) {
            await Promise.all(
                uploadFiles.map(async (uploadFile) => {
                    const { name, type, size, originFileObj } = uploadFile;
                    await this.pushExtraFile(
                        {
                            name,
                            fileType: type,
                            size,
                            extra1: originFileObj,
                        },
                        callback
                    );
                })
            );
        },
        async pushExtraFile(
            options: {
                name: string;
                extra1: any;
                fileType: string;
                size: number;
            },
            callback?: (file: any, status: string) => void
        ) {
            const { type, origin, tag1, tag2, entity, entityId, autoUpload } =
                this.props;
            const { name, extra1, fileType, size } = options;
            const extension = name.substring(name.lastIndexOf('.') + 1);
            const filename = name.substring(0, name.lastIndexOf('.'));
            assert(entity, '必须传入entity');
            assert(origin === 'qiniu', '目前只支持七牛上传'); // 目前只支持七牛上传
            const updateData = {
                extra1,
                origin,
                type: type || 'file',
                tag1,
                tag2,
                objectId: generateNewId(),
                entity,
                filename,
                size,
                extension,
                fileType,
                id: generateNewId(),
                entityId,
            } as EntityDict['extraFile']['CreateSingle']['data'];
            // autoUpload为true, 选择直接上传七牛，再提交extraFile
            if (autoUpload) {
                if (callback) {
                    callback(updateData, 'uploading');
                }
                try {
                    const { bucket } = await this.features.extraFile.upload(
                        updateData
                    );
                    Object.assign(updateData, {
                        bucket,
                        extra1: null,
                    });
                    if (callback) {
                        callback(updateData, 'success');
                    }
                } catch (error) {
                    if (callback) {
                        callback(updateData, 'failed');
                    }
                    //todo 保存extraFile失败 需要remove七牛图片

                    throw error;
                }

                this.addItem(updateData);
                await this.execute();
            } else {
                this.addItem(updateData, async () => {
                    if (updateData.bucket) {
                        // 说明本函数已经执行过了
                        return;
                    }
                    const { bucket } = await this.features.extraFile.upload(
                        updateData
                    );
                    Object.assign(updateData, {
                        bucket,
                        extra1: null,
                    });
                });
            }
        },
        async onItemTapped(event: WechatMiniprogram.Touch) {
            const { files } = this.state;
            const { index } = event.currentTarget.dataset;
            const imageUrl = this.features.extraFile.getUrl(files[index]);
            const urls = files
                ?.filter((ele: EntityDict['extraFile']['Schema']) => !!ele)
                .map((ele: EntityDict['extraFile']['Schema']) =>
                    this.features.extraFile.getUrl(ele)
                );

            const detail = {
                all: files,
                index,
                urls,
                current: imageUrl,
            };
            this.triggerEvent('tap', detail);
            // 预览图片
            if (this.props.preview) {
                const result = await wx.previewImage({
                    urls: urls,
                    current: imageUrl,
                });
                this.triggerEvent('preview', detail);
            }
        },
        async onDeleteByMp(event: WechatMiniprogram.Touch) {
            const { value } = event.currentTarget.dataset;
            const { id, bucket, origin } = value;

            if (this.props.removeLater || (origin !== 'unknown' && !bucket)) {
                this.removeItem(id);
            } else {
                const result = await wx.showModal({
                    title: '确认删除吗',
                    content: '删除现有文件',
                });
                const { confirm } = result;
                if (confirm) {
                    this.removeItem(id);
                    await this.execute();
                }
            }
        },
        async onDeleteByWeb(value: any) {
            const { id, bucket, origin } = value;
            // 如果 removeLater为true 或 origin === 'qiniu' 且 bucket不存在
            if (this.props.removeLater || (origin !== 'unknown' && !bucket)) {
                this.removeItem(id);
            } else {
                const confirm = Dialog.confirm({
                    title: '确认删除当前文件？',
                    content: '删除后，文件不可恢复',
                    cancelText: '取消',
                    okText: '确定',
                    onOk: async (e: any) => {
                        this.removeItem(id);
                        await this.execute();
                        confirm.destroy();
                    },
                    onCancel: (e: any) => {
                        confirm.destroy();
                    },
                });
            }
        },
        async onDownloadByMp(event: WechatMiniprogram.Touch) {
            const { value } = event.currentTarget.dataset;
            const fileUrl = this.features.extraFile.getUrl(value);
            const name = this.features.extraFile.getFileName(value);
            wx.showLoading({
                title: '下载请求中，请耐心等待..',
            });
            wx.downloadFile({
                url: fileUrl,
                success: function (res) {
                    const filePath = res.tempFilePath || res.filePath;
                    wx.hideLoading();
                    const fs = wx.getFileSystemManager();
                    const writeFilePath = `${wx.env.USER_DATA_PATH}/${name}`;
                    const res2 = fs.saveFileSync(filePath, writeFilePath);
                },
                fail: function (res) {
                    console.log(res);
                },
                complete: function (res) {},
            });
        },
        async onOpenByMp(event: WechatMiniprogram.Touch) {
            const { value } = event.currentTarget.dataset;
            const fileUrl = this.features.extraFile.getUrl(value);
            let extension = value.extension.toLowerCase();
            let extensions = [
                'doc',
                'docx',
                'xls',
                'xlsx',
                'ppt',
                'pptx',
                'pdf',
            ]; //openDocument fileType目前只支持范围
            if (!extensions.includes(extension)) {
                this.setMessage({
                    type: 'error',
                    content: `目前仅支持打开${extensions.join(',')}类型的文件`,
                });
                return;
            }

            wx.showLoading({
                title: '下载请求中，请耐心等待..',
            });
            wx.downloadFile({
                url: fileUrl,
                success: function (res) {
                    const filePath = res.tempFilePath || res.filePath;
                    wx.hideLoading();
                    wx.openDocument({
                        //打开文件
                        filePath: filePath,
                        fileType: extension,
                        showMenu: true, // 是否显示右上角菜单按钮 默认为false(看自身需求，可要可不要。后期涉及到右上角分享功能)
                        success: function () {
                            console.log(`打开文件成功`);
                        },
                        fail: function (err) {
                            console.log(err);
                        },
                    });
                },
                fail: function (res) {
                    console.log(res);
                },
                complete: function (res) {},
            });
        },
    },
    listeners: {
        maxNumber(prev, next) {
            if (this.state.oakFullpath) {
                if (prev.maxNumber !== next.maxNumber) {
                    this.reRender();
                }
            }
        },
        async size(prev, next) {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                const size = next.size;
                if (!size) {
                    this.setState({ itemSizePercentage: '' });
                    return;
                }

                // 获取 .file-list__container 容器宽度
                const res: any = await this.getNodeRectFromComponent(
                    this,
                    '.file-list__container'
                );
                const widthRpx = this.px2rpx(res.right - res.left);

                // 根据容器宽度计算单张图片宽度百分比
                const itemSizePercentage =
                    (10 / size) * 10 - (20 / widthRpx) * 100 + '%;';
                this.setState({
                    itemSizePercentage: itemSizePercentage,
                });
            }
        },
    },
});
