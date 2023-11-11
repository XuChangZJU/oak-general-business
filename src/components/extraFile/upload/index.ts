import { EntityDict } from '../../../oak-app-domain';
import { FileState } from '../../../features/extraFile';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base/lib/types/Page';
import { generateNewId } from 'oak-domain';
import { assert } from 'oak-domain/lib/utils/assert';

type ExtraFile = EntityDict['extraFile']['OpSchema'];
export interface EnhancedExtraFile extends ExtraFile {
    url: string;
    thumbUrl: string;
    fileName: string;
    fileState?: FileState;
    percentage?: number;
};
export type Theme = 'file' | 'image' | 'image-flow' | 'custom';

type SourceType = 'album' | 'camera';
type ImageMode =
    | 'scaleToFill'
    | 'aspectFit'
    | 'aspectFill'
    | 'widthFix'
    | 'heightFix'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'center'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right';

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
    data: {
        // 根据 size 不同，计算的图片显示大小不同
        itemSizePercentage: '',
    },
    wechatMp: {
        externalClasses: ['oak-class', 'oak-item-class', 'oak-item-add-class'],
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
        bucket: '',
        autoUpload: false,
        maxNumber: 20,
        extension: [] as string[], //小程序独有 chooseMessageFile
        selectCount: 1, // 每次打开图片时，可选中的数量 小程序独有
        sourceType: ['album', 'camera'] as SourceType[], // 小程序独有 chooseMedia
        mediaType: ['image'] as ('image' | 'video')[], // 小程序独有 chooseMedia
        mode: 'aspectFit' as ImageMode, // 图片显示模式
        size: 3, // 每行可显示的个数 小程序独有
        showUploadList: true, //web独有
        showUploadProgress: false, // web独有
        accept: 'image/*', // web独有
        disablePreview: false, // 图片是否可预览
        disableDelete: false, // 图片是否可删除
        disableAdd: false, // 上传按钮隐藏
        disableDownload: false, // 下载按钮隐藏
        type: 'image' as ExtraFile['type'],
        origin: 'qiniu' as ExtraFile['origin'],
        tag1: '',
        tag2: '',
        entity: '' as keyof EntityDict,
        entityId: '',
        theme: 'image' as Theme,
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
    features: ['extraFile'],
    formData({ data, features }) {
        let files = data
            ?.filter((ele) => !ele.$$deleteAt$$)
            .sort((ele1, ele2) => ele1.sort! - ele2.sort!);
        if (this.props.tag1) {
            files = files?.filter((ele) => ele?.tag1 === this.props.tag1);
        }
        if (this.props.tag2) {
            files = files?.filter((ele) => ele?.tag2 === this.props.tag2);
        }

        const files2 = files.map((ele) => {
            const url = features.extraFile.getUrl(ele as ExtraFile);
            const thumbUrl = features.extraFile.getUrl(
                ele as ExtraFile,
                'thumbnail'
            );
            const fileState = features.extraFile.getFileState(ele.id!);
            const fileName = features.extraFile.getFileName(ele as ExtraFile);
            return {
                url,
                thumbUrl,
                fileName,
                fileState: fileState?.state,
                percentage: fileState?.percentage,
                ...ele,
            } as EnhancedExtraFile;
        });
        return {
            files: files2,
        };
    },
    methods: {
        onRemove(file: EnhancedExtraFile) {
            this.removeItem(file.id);
            this.features.extraFile.removeLocalFiles([file.id]);
        },
        async addExtraFileInner(
            options: {
                name: string;
                fileType: string;
                size: number;
                sort: number;
            },
            file: File | string
        ) {
            const {
                type,
                origin = 'qiniu', // 默认qiniu
                tag1,
                tag2,
                entity,
                entityId,
                bucket,
                autoUpload,
            } = this.props;
            const { name, fileType, size, sort } = options;
            const extension = name.substring(name.lastIndexOf('.') + 1);
            const filename = name.substring(0, name.lastIndexOf('.'));
            const { files } = this.state;

            const applicationId = this.features.application.getApplicationId();
            const updateData = {
                applicationId,
                bucket,
                origin,
                type,
                tag1,
                tag2,
                objectId: generateNewId(), // 这个域用来标识唯一性
                entity,
                filename,
                size,
                extension,
                fileType,
                entityId,
                sort,
                uploadState: 'uploading',
            } as EntityDict['extraFile']['CreateSingle']['data'];
            // autoUpload设置为true，直接上传
            if (autoUpload) {
                assert(entityId, 'autoUpload设置为true，entityId必须存在');
                await this.features.extraFile.autoUpload(
                    updateData as EntityDict['extraFile']['OpSchema'],
                    file
                );
            } else {
                const id = this.addItem(updateData);
                this.features.extraFile.addLocalFile(id, file);
            }
        },
        addFileByWeb(file: File) {
            const { size, type, name } = file;
            this.addExtraFileInner(
                {
                    name,
                    fileType: type,
                    size,
                    sort: this.getSort(),
                },
                file
            );
        },
        // 小程序端
        async chooseMediaByMp() {
            //图片和视频使用
            const { selectCount, mediaType, sourceType } = this.props;
            try {
                const { errMsg, tempFiles } = await wx.chooseMedia({
                    count: selectCount,
                    mediaType,
                    sourceType,
                });
                if (errMsg !== 'chooseMedia:ok') {
                    this.triggerEvent('onError', {
                        level: 'warning',
                        msg: errMsg,
                    });
                } else {
                    tempFiles.map((tempExtraFile, index) => {
                        const {
                            tempFilePath,
                            thumbTempFilePath,
                            fileType,
                            size,
                        } = tempExtraFile;
                        const filePath = tempFilePath || thumbTempFilePath;
                        const fileFullName =
                            filePath.match(/[^/]+(?!.*\/)/g)![0];
                        this.addExtraFileInner(
                            {
                                name: fileFullName,
                                fileType,
                                size,
                                sort: this.getSort(index),
                            },
                            filePath
                        );
                    });
                }
            } catch (err: any) {
                if (err.errMsg !== 'chooseMedia:fail cancel') {
                    this.triggerEvent('onError', {
                        level: 'error',
                        msg: err.errMsg,
                    });
                }
            }
        },
        async chooseMessageFileByMp() {
            const { selectCount, extension } = this.props;
            try {
                const { errMsg, tempFiles } = await wx.chooseMessageFile({
                    count: selectCount!,
                    type: 'all',
                    ...(extension && extension.length > 0 ? { extension } : {}),
                });
                if (errMsg !== 'chooseMessageFile:ok') {
                    this.triggerEvent('onError', {
                        level: 'warning',
                        msg: errMsg,
                    });
                } else {
                    tempFiles.map((tempExtraFile, index) => {
                        const { path, type, size, name } = tempExtraFile;
                        this.addExtraFileInner(
                            {
                                name,
                                fileType: type,
                                size,
                                sort: this.getSort(index),
                            },
                            path
                        );
                    });
                }
            } catch (err: any) {
                if (err.errMsg !== 'chooseMessageFile:fail cancel') {
                    this.triggerEvent('onError', {
                        level: 'error',
                        msg: err.errMsg,
                    });
                }
            }
        },
        async addFileByMp(evt: WechatMiniprogram.Touch) {
            const { type } = this.props;
            //小程序 根据type类型调用api
            if (['image', 'video'].includes(type!)) {
                this.chooseMediaByMp();
            } else {
                this.chooseMessageFileByMp();
            }
        },
        onRemoveByMp(event: WechatMiniprogram.Touch) {
            const { value } = event.currentTarget.dataset;
            this.onRemove(value as EnhancedExtraFile);
        },
        async onPreviewByMp(event: WechatMiniprogram.Touch) {
            const files = this.state.files as EnhancedExtraFile[];
            const { index } = event.currentTarget.dataset;
            const imageUrl = files[index].url;
            const urls = files?.filter((ele) => !!ele).map((ele) => ele.url);

            // 预览图片
            if (!this.props.disablePreview) {
                const result = await wx.previewImage({
                    urls: urls,
                    current: imageUrl,
                });
            }
        },
        // async onDownloadByMp(event: WechatMiniprogram.Touch) {
        //     const { value } = event.currentTarget.dataset;
        //     const fileUrl = this.features.extraFile.getUrl(value);
        //     const name = this.features.extraFile.getFileName(value);
        //     const that = this;
        //     wx.showLoading({
        //         title: '下载请求中...',
        //     });
        //     wx.downloadFile({
        //         url: fileUrl,
        //         success: function (res) {
        //             const filePath = res.tempFilePath || res.filePath;
        //             const fs = wx.getFileSystemManager();
        //             fs.saveFile({
        //                 tempFilePath: filePath,
        //                 success: (res) => {
        //                     wx.hideLoading();
        //                     const savedFilePath = res.savedFilePath;
        //                     // 打开文件
        //                     wx.openDocument({
        //                         filePath: savedFilePath,
        //                         showMenu: true,
        //                         success: function (res) {
        //                             // console.log('打开文档成功');
        //                         },
        //                         fail: function (res) {
        //                             const { errMsg } = res;
        //                             if (
        //                                 errMsg.includes(
        //                                     'fail filetype not supported'
        //                                 )
        //                             ) {
        //                                 that.setMessage({
        //                                     type: 'error',
        //                                     content: '该文件类型不支持打开',
        //                                 });
        //                                 return;
        //                             }
        //                             that.setMessage({
        //                                 type: 'error',
        //                                 content: '该文件类型打开失败',
        //                             });
        //                         },
        //                     });
        //                 },
        //                 fail: function (res) {
        //                     wx.hideLoading();
        //                     that.setMessage({
        //                         type: 'error',
        //                         content: '保存文件失败',
        //                     });
        //                 },
        //             });
        //         },
        //         fail: function (res) {
        //             wx.hideLoading();
        //             that.setMessage({
        //                 type: 'error',
        //                 content: '下载文件失败',
        //             });
        //         },
        //         complete: function (res) {},
        //     });
        // },
        // async onOpenByMp(event: WechatMiniprogram.Touch) {
        //     const { value } = event.currentTarget.dataset;
        //     const fileUrl = this.features.extraFile.getUrl(value);
        //     const that = this;
        //     let extension = value.extension.toLowerCase();
        //     let extensions = [
        //         'doc',
        //         'docx',
        //         'xls',
        //         'xlsx',
        //         'ppt',
        //         'pptx',
        //         'pdf',
        //     ]; //openDocument fileType目前只支持范围
        //     if (!extensions.includes(extension)) {
        //         this.setMessage({
        //             type: 'error',
        //             content: `目前仅支持打开${extensions.join(',')}类型的文件`,
        //         });
        //         return;
        //     }

        //     wx.showLoading({
        //         title: '下载请求中...',
        //     });
        //     wx.downloadFile({
        //         url: fileUrl,
        //         success: function (res) {
        //             const filePath = res.tempFilePath || res.filePath;
        //             wx.hideLoading();
        //             wx.openDocument({
        //                 //打开文件
        //                 filePath: filePath,
        //                 fileType: extension,
        //                 showMenu: true, // 是否显示右上角菜单按钮 默认为false(看自身需求，可要可不要。后期涉及到右上角分享功能)
        //                 success: function () {
        //                     //console.log(`打开文件成功`);
        //                 },
        //                 fail: function (res) {
        //                     const { errMsg } = res;
        //                     if (
        //                         errMsg.includes('fail filetype not supported')
        //                     ) {
        //                         that.setMessage({
        //                             type: 'error',
        //                             content: '该文件类型不支持打开',
        //                         });
        //                         return;
        //                     }
        //                     that.setMessage({
        //                         type: 'error',
        //                         content: '该文件类型打开失败',
        //                     });
        //                 },
        //             });
        //         },
        //         fail: function (res) {
        //             wx.hideLoading();
        //             that.setMessage({
        //                 type: 'error',
        //                 content: '下载文件失败',
        //             });
        //         },
        //         complete: function (res) {},
        //     });
        // },
        getSort(index: number = 0) {
            const { files } = this.state;
            const currentSort = files?.length
                ? files[files.length - 1].sort || 0
                : 0;
            const sort = currentSort + (index + 1) * 1000;
            return sort;
        },

        //检查排序是否超过上限
        checkSort(sort: number) {
            const reg = /^\d+\.(?:9+)$/;
            if (reg.test(sort.toString())) {
                this.setMessage({
                    type: 'warning',
                    content: this.t('dragSort'),
                });
                return false;
            }
            return true;
        },
    },
}) as <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(
    props: ReactComponentProps<
        ED2,
        T2,
        true,
        {
            bucket: string; // 上传的存储桶位置
            autoUpload: boolean;
            maxNumber: number;
            extension: string[];
            selectCount: number;
            sourceType: SourceType[];
            mediaType: ('image' | 'video')[];
            // 图片显示模式
            mode: ImageMode;
            // 每行可显示的个数
            size: number;
            showUploadList: boolean;
            showUploadProgress: boolean;
            accept: string;
            // 图片是否可预览
            disablePreview: boolean;
            // 图片是否可删除
            disableDelete: boolean;
            // 上传按钮隐藏
            disableAdd: boolean;
            // 下载按钮隐藏
            disableDownload: boolean;
            disabled: boolean;
            type: string;
            origin: string;
            tag1: string;
            tag2: string;
            entity: keyof ED2;
            entityId: string;
            theme: Theme;
            children?: React.ReactNode;
        }
    >
) => React.ReactElement;