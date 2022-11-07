import assert from 'assert';
import { DeduceCreateOperationData, OakException, OakUnloggedInException } from 'oak-domain/lib/types';
import Dialog from '../../../utils/dialog/index';
import { EntityDict } from '../../../general-app-domain';
import { composeFileUrl } from '../../../utils/extraFile';

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
    },
    async formData({ data: originalFiles, features }) {
        const application = await features.application.getApplication();
        let files = originalFiles as Array<EntityDict['extraFile']['OpSchema']>;
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
            systemConfig: application?.system?.config,
        };
    },
    data: {
        selected: -1,
        // 根据 size 不同，计算的图片显示大小不同
        itemSizePercentage: '',
        newUploadFiles: [],
    },
    wechatMp: {
        externalClasses: ['l-class', 'l-item-class'],
    },
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
        // 图片显示模式
        mode: {
            //小程序独有
            type: String,
            value: 'aspectFit',
        },
        // 图片是否可预览
        preview: {
            type: Boolean,
            value: true,
        },
        // 每行可显示的个数
        size: {
            // 小程序独有
            type: Number,
            value: 3,
        },
        // 图片是否可删除
        disableDelete: {
            type: Boolean,
            value: false,
        },
        type: String,
        origin: String,
        tag1: String,
        tag2: String,
        entity: String,
        entityId: String,
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
        async onPickByMp() {
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
                            this.pushExtraFile({
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
        async onPickByWeb(
            uploadFiles: any[],
            callback?: (file: any, status: string) => void
        ) {
            await Promise.all(
                uploadFiles.map(async (uploadFile) => {
                    const {
                        name,
                        type: fileType,
                        size,
                        raw,
                        originFileObj,
                    } = uploadFile;
                    await this.pushExtraFile(
                        {
                            name,
                            fileType,
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
                objectId: await generateNewId(),
                entity,
                filename,
                size,
                extension,
                fileType,
                id: await generateNewId(),
                entityId,
            } as DeduceCreateOperationData<EntityDict['extraFile']['Schema']>;
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

                await this.addOperation({
                    action: 'create',
                    data: updateData,
                });
                await this.execute();
            } else {
                await this.addOperation(
                    {
                        action: 'create',
                        data: updateData,
                    },
                    async () => {
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
                    }
                );
            }
        },
        async onItemTapped(event: WechatMiniprogram.Touch) {
            const { files, systemConfig } = this.state;
            const { index } = event.currentTarget.dataset;
            const imageUrl = composeFileUrl(files[index]!, systemConfig);
            const urls = files
                ?.filter((ele: EntityDict['extraFile']['Schema']) => !!ele)
                .map((ele: EntityDict['extraFile']['Schema']) =>
                    composeFileUrl(ele!, systemConfig)
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
            const { id, bucket } = value;

            if (this.props.removeLater || (origin !== 'unknown' && !bucket)) {
                await this.addOperation({
                    action: 'remove',
                    data: {},
                    filter: {
                        id,
                    },
                });
            } else {
                const result = await wx.showModal({
                    title: '确认删除吗',
                    content: '删除现有文件',
                });
                const { confirm } = result;
                if (confirm) {
                    await this.addOperation({
                        action: 'remove',
                        data: {},
                        filter: {
                            id,
                        },
                    });
                    await this.execute();
                }
            }
        },
        async onDeleteByWeb(value: any) {
            const { id, bucket } = value;
            // 如果 removeLater为true 或 origin === 'qiniu' 且 bucket不存在
            if (this.props.removeLater || (origin !== 'unknown' && !bucket)) {
                await this.addOperation({
                    action: 'remove',
                    data: {},
                    filter: {
                        id,
                    },
                });
            } else {
                const confirm = Dialog.confirm({
                    title: '确认删除当前文件？',
                    content: '删除后，文件不可恢复',
                    cancelText: '取消',
                    okText: '确定',
                    onOk: async (e: any) => {
                        await this.addOperation({
                            action: 'remove',
                            data: {},
                            filter: {
                                id,
                            },
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
        setNewUploadFiles(file: any, status: string) {
            const { filename, size, id } = file;
            const { newUploadFiles } = this.state;
            const file2 = newUploadFiles.find(
                (ele: any) => (ele.filename = filename && ele.size === size)
            ) as any;
            Object.assign(file2, {
                status,
                id,
            });
            this.setState({
                newUploadFiles,
            });
        },
        async customDelete(index: number) {
            const { newUploadFiles } = this.state;
            const arr = [...newUploadFiles];
            arr.splice(index, 1);
            this.setState({
                newUploadFiles: arr,
            });
        },
    },

    observers: {
        maxNumber: function () {
            this.reRender();
        },
        /**
         * size 属性变化时，重新调整图片大小
         * @param size 新值
         */
        size: async function (size: number) {
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
            this.setState({ itemSizePercentage: itemSizePercentage });
        },
    },
});
