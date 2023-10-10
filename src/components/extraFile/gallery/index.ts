import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { assert } from 'oak-domain/lib/utils/assert';
import Dialog from '../../../utils/dialog/index';
import { EntityDict } from '../../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base/lib/types/Page';

type SourceType = 'album' | 'camera';
type Theme = 'file' | 'image' | 'image-flow' | 'custom';
type ImgMode = 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | "heightFix" | 'top' | 'bottom' | 'left'
    | 'right' | 'center' | 'top left' | 'top right' | 'bottom left' | 'bottom right';

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
        sort: 1,
        isBridge: 1,
        uploadState: 1,
    },
    formData({ data: originalFiles, features }) {
        let files = (
            originalFiles as Array<EntityDict['extraFile']['OpSchema']>
        )
            ?.filter((ele) => !ele.$$deleteAt$$)
            .sort((ele1, ele2) => ele1.sort! - ele2.sort!);
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
                files?.length >= this.props.maxNumber!,
        };
    },
    data: {
        // 根据 size 不同，计算的图片显示大小不同
        itemSizePercentage: '',
        fileList: {} as Record<string, File | string>,
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
        removeLater: true,
        autoUpload: false,
        maxNumber: 20,
        extension: [] as string[], //小程序独有 chooseMessageFile
        selectCount: 1, // 每次打开图片时，可选中的数量 小程序独有
        sourceType: ['album', 'camera'] as SourceType[], // 小程序独有 chooseMedia
        mediaType: ['image'] as ('image' | 'video')[], // 小程序独有 chooseMedia
        mode: 'aspectFit' as ImgMode, // 图片显示模式
        size: 3, // 每行可显示的个数 小程序独有
        showUploadList: true, //web独有
        showUploadProgress: false, // web独有
        accept: 'image/*', // web独有
        disablePreview: false, // 图片是否可预览
        disableDelete: false, // 图片是否可删除
        disableAdd: false, // 上传按钮隐藏
        disableDownload: false, // 下载按钮隐藏
        disabled: false,
        type: '',
        origin: '',
        tag1: '',
        tag2: '',
        entity: '' as keyof EntityDict,
        entityId: '',
        theme: 'image' as Theme,
    },

    methods: {
        getUrl(extraFile: EntityDict['extraFile']['OpSchema']) {
            const { fileList } = this.state;
            if (fileList[extraFile?.id]) {
                const url = this.features.extraFile.getUrl(
                    Object.assign({}, extraFile, {
                        extra1: fileList[extraFile?.id],
                    })
                );
                return url;
            }
            return this.features.extraFile.getUrl(extraFile);
        },
        getFileName(extraFile: EntityDict['extraFile']['OpSchema']) {
            return this.features.extraFile.getFileName(extraFile);
        },
        formatBytes(value: number) {
            return this.features.extraFile.formatBytes(value);
        },
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
            const { selectCount, extension } = this.props;
            try {
                const { errMsg, tempFiles } = await wx.chooseMessageFile({
                    count: selectCount!,
                    type: 'all',
                    extension,
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
            if (['image', 'image-flow'].includes(theme!)) {
                this.chooseMediaByMp();
            } else {
                this.chooseFileByMp();
            }
        },
        async onPickByWeb(
            uploadFiles: any[],
            callback?: (file: any, status: string) => void
        ) {
            const { files } = this.state;
            const currentSort = files?.length
                ? files[files.length - 1].sort
                : 0;
            await Promise.all(
                uploadFiles.map(async (uploadFile, index) => {
                    const { name, type, size, originFileObj } = uploadFile;
                    await this.pushExtraFile(
                        {
                            name,
                            fileType: type,
                            size,
                            extra1: originFileObj,
                            sort: currentSort + (index + 1) * 100,
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
                sort: number;
            },
            callback?: (file: any, status: string) => void
        ) {
            const { type, origin, tag1, tag2, entity, entityId, autoUpload } =
                this.props;
            const { name, extra1, fileType, size, sort } = options;
            const extension = name.substring(name.lastIndexOf('.') + 1);
            const filename = name.substring(0, name.lastIndexOf('.'));
            assert(entity, '必须传入entity');
            assert(origin === 'qiniu', '目前只支持七牛上传'); // 目前只支持七牛上传
            const updateData = {
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
                entityId,
                sort,
            } as EntityDict['extraFile']['CreateSingle']['data'];
            // autoUpload为true, 选择直接上传七牛，再提交extraFile
            if (autoUpload) {
                if (callback) {
                    callback(updateData, 'uploading');
                }
                try {
                    this.addItem(updateData, undefined, async () => {
                        await this.features.extraFile.upload(
                            updateData,
                            extra1
                        );
                    });
                    await this.execute();
                    if (callback) {
                        callback(updateData, 'success');
                    }
                } catch (error) {
                    if (callback) {
                        callback(updateData, 'failed');
                    }
                    throw error;
                }
            } else {
                const id = this.addItem(updateData, undefined, async () => {
                    await this.features.extraFile.upload(updateData, extra1);
                });
                this.setState({
                    fileList: Object.assign(this.state.fileList, {
                        [id]: extra1,
                    }),
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
            if (!this.props.disablePreview) {
                const result = await wx.previewImage({
                    urls: urls,
                    current: imageUrl,
                });
                this.triggerEvent('preview', detail);
            }
        },
        async onDeleteByMp(event: WechatMiniprogram.Touch) {
            const { value } = event.currentTarget.dataset;
            const { id, bucket, origin, uploadState } = value;
            const { removeLater } = this.props;
            const { fileList } = this.state;
            if (removeLater || !uploadState) {
                this.removeItem(id);
                Object.assign(fileList, {
                    [id]: null,
                });
                this.setState({
                    fileList,
                });
            } else {
                const result = await wx.showModal({
                    title: '确认删除吗',
                    content: '删除现有文件',
                });
                const { confirm } = result;
                if (confirm) {
                    this.removeItem(id);
                    Object.assign(fileList, {
                        id: null,
                    });
                    this.setState({
                        fileList,
                    });
                    await this.execute();
                }
            }
        },
        async onDeleteByWeb(value: any) {
            const { id, bucket, origin, uploadState } = value;
            const { removeLater = true } = this.props;
            const { fileList } = this.state;
            // 如果 removeLater为true 或 origin === 'qiniu' 且 bucket不存在
            if (removeLater || !uploadState) {
                this.removeItem(id);
                Object.assign(fileList, {
                    id: null,
                });
                this.setState({
                    fileList,
                });
            } else {
                const confirm = Dialog.confirm({
                    title: '确认删除当前文件？',
                    content: '删除后，文件不可恢复',
                    cancelText: '取消',
                    okText: '确定',
                    onOk: async (e: any) => {
                        this.removeItem(id);
                        Object.assign(fileList, {
                            id: null,
                        });
                        this.setState({
                            fileList,
                        });
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
            const that = this;
            wx.showLoading({
                title: '下载请求中...',
            });
            wx.downloadFile({
                url: fileUrl,
                success: function (res) {
                    const filePath = res.tempFilePath || res.filePath;
                    const fs = wx.getFileSystemManager();
                    fs.saveFile({
                        tempFilePath: filePath,
                        success: (res) => {
                            wx.hideLoading();
                            const savedFilePath = res.savedFilePath;
                            // 打开文件
                            wx.openDocument({
                                filePath: savedFilePath,
                                showMenu: true,
                                success: function (res) {
                                    // console.log('打开文档成功');
                                },
                                fail: function (res) {
                                    const { errMsg } = res;
                                    if (
                                        errMsg.includes(
                                            'fail filetype not supported'
                                        )
                                    ) {
                                        that.setMessage({
                                            type: 'error',
                                            content: '该文件类型不支持打开',
                                        });
                                        return;
                                    }
                                    that.setMessage({
                                        type: 'error',
                                        content: '该文件类型打开失败',
                                    });
                                },
                            });
                        },
                        fail: function (res) {
                            wx.hideLoading();
                            that.setMessage({
                                type: 'error',
                                content: '保存文件失败',
                            });
                        },
                    });
                },
                fail: function (res) {
                    wx.hideLoading();
                    that.setMessage({
                        type: 'error',
                        content: '下载文件失败',
                    });
                },
                complete: function (res) {},
            });
        },
        async onOpenByMp(event: WechatMiniprogram.Touch) {
            const { value } = event.currentTarget.dataset;
            const fileUrl = this.features.extraFile.getUrl(value);
            const that = this;
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
                title: '下载请求中...',
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
                            //console.log(`打开文件成功`);
                        },
                        fail: function (res) {
                            const { errMsg } = res;
                            if (
                                errMsg.includes('fail filetype not supported')
                            ) {
                                that.setMessage({
                                    type: 'error',
                                    content: '该文件类型不支持打开',
                                });
                                return;
                            }
                            that.setMessage({
                                type: 'error',
                                content: '该文件类型打开失败',
                            });
                        },
                    });
                },
                fail: function (res) {
                    wx.hideLoading();
                    that.setMessage({
                        type: 'error',
                        content: '下载文件失败',
                    });
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
}) as <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(
    props: ReactComponentProps<
        ED2,
        T2,
        true,
        {
            removeLater: boolean;
            autoUpload: boolean;
            maxNumber: number;
            extension: string[];
            selectCount: number;
            sourceType: SourceType[];
            mediaType: ('image' | 'video')[];
            // 图片显示模式
            mode: ImgMode;
            // 每行可显示的个数
            size: number;
            showUploadList: boolean;
            accept: string;
            // 图片是否可预览
            disablePreview: boolean;
            // 图片是否可删除
            disableDelete: boolean;
            // 上传按钮隐藏
            disableAdd: boolean;
            // 下按按钮隐藏
            disableDownload: boolean;
            disabled: boolean;
            type: string;
            origin: string;
            tag1: string;
            tag2: string;
            entity: keyof ED2;
            entityId: string;
            theme: Theme;
            showUploadProgress: boolean;
            children?: React.ReactNode;
        }
    >
) => React.ReactElement;
