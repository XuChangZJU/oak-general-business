import assert from 'assert';
import { DeduceCreateOperationData, OakException, OakUnloggedInException } from 'oak-domain/lib/types';
import { isMockId } from "oak-frontend-base/lib/utils/mockId";
import Dialog from '../../../utils/dialog/index';
import { EntityDict } from '../../../general-app-domain';
import { composeFileUrl } from '../../../utils/extraFile';

export default OakComponent({
    entity: 'extraFile',
    isList: true,
    async formData({ data: files, features }) {
        const application = await features.application.getApplication();
        const number2 = this.props.maxNumber;
        let files2 = files;
        if (this.props.tag1) {
            files2 = files2.filter(
                ele => ele?.tag1 === this.props.tag1
            );
        }
        if (this.props.tag2) {
            files2 = files2.filter(
                ele => ele?.tag2 === this.props.tag2
            );
        }
        if (
            typeof number2 === 'number' &&
            (number2 === 0 || files?.length >= number2)
        ) {
            return {
                files: files2,
                disableInsert: true,
                systemConfig: application?.system?.config,
            };
        }
        return {
            files: files2,
            disableInsert: false,
            systemConfig: application?.system?.config,
        };
    },
    data: {
        selected: -1,
        // 根据 size 不同，计算的图片显示大小不同
        itemSizePercentage: '',
        newUploadFiles: [],
    },
    externalClasses: ['l-class', 'l-item-class'],
    properties: {
        oakFullpath: String,
        oakParent: String,
        oakPath: String,
        autoUpload: {
            type: Boolean,
            value: false,
        },
        maxNumber: {
            type: Number,
            value: 100,
        },
        selectCount: {
            type: Number,
            value: 1,
        },
        sourceType: {
            type: Array,
            value: ['album', 'camera'],
        },
        mediaType: {
            type: Array,
            value: ['image'],
        },
        // 图片显示模式
        mode: {
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
            type: Number,
            value: 3,
        },
        // 图片是否可预览
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
        async onPick() {
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
        async onWebPick(uploadFiles: any[], callback?: (file: any) => void) {
            await Promise.all(
                uploadFiles.map(async (uploadFile) => {
                    const { name, type: fileType, size, raw } = uploadFile;
                    this.pushExtraFile({
                        name,
                        fileType,
                        size,
                        extra1: raw,
                    }, callback);
                })
            );
        },
        async pushExtraFile(options: {
            name: string;
            extra1: any;
            fileType: string;
            size: number;
        }, callback?: (file:any) => void) {
            const { type, origin, tag1, tag2, entity, entityId, autoUpload } = this.props;
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
            } as DeduceCreateOperationData<EntityDict['extraFile']['Schema']>;
            // autoUpload为true, 选择直接上传七牛，再提交extraFile
            if (autoUpload) {
                try {
                    const { bucket } =
                        await this.features.extraFile.upload(updateData);
                    try {
                        Object.assign(updateData, {
                            bucket,
                            extra1: null,
                            id: await generateNewId(),
                            entityId,
                        });
                        await this.addExtraFile(updateData);
                        if (callback) {
                            callback(updateData);
                        };
                        const ele: Parameters<typeof this['pushNode']>[1] = {
                            updateData,
                        };
                        this.pushNode(undefined, ele);
                    } catch (error) {
                        //todo 保存extraFile失败 需要remove七牛图片
                    }
                } catch (err) {
                    //上传七牛失败
                }
            } else {
                const ele: Parameters<typeof this['pushNode']>[1] = {
                    updateData,
                    beforeExecute: async (updateData) => {
                        const { bucket } =
                            await this.features.extraFile.upload(updateData);
                        Object.assign(updateData, {
                            bucket,
                            extra1: null,
                        });
                    },
                };

                this.pushNode(undefined, ele);
            }
        },
        setNewUploadFiles(file: any) {
            const { filename, size, id } = file;
            const { newUploadFiles } = this.state;
            const file2 = newUploadFiles.find((ele: any) => ele.filename = filename && ele.size === size) as any;
            Object.assign(file2, {
                status: 'success',
                id,
            })
            this.setState({
                newUploadFiles: [...newUploadFiles],
            })
        },
        async onItemTapped(event: WechatMiniprogram.Touch) {
            const { files, systemConfig } = this.state;
            const { index } = event.currentTarget.dataset;
            const imageUrl = composeFileUrl(files[index]!, systemConfig);
            const urls = files
                ?.filter((ele) => !!ele)
                .map((ele) => composeFileUrl(ele!, systemConfig));

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
        async onDelete(event: WechatMiniprogram.Touch) {
            const { value, index } = event.currentTarget.dataset;
            const { id } = value;
            if (isMockId(id)) {
                this.removeNode('', `${index}`);
            } else {
                const result = await wx.showModal({
                    title: '确认删除吗',
                    content: '删除现有文件',
                });
                const { confirm } = result;
                if (confirm) {
                    this.removeNode('', `${index}`);
                }
            }
        },
        async customDelete(index: number) {
            const { newUploadFiles } = this.state;
            const arr = [...newUploadFiles];
            arr.splice(index, 1);
            this.setState({
                newUploadFiles: arr,
            })
        },
        async onWebDelete(value: any, index: number) {
            const { id } = value;
            if (isMockId(id)) {
                this.removeNode('', `${index}`);
            } else {
                const confirm = Dialog.confirm({
                    header: '确认删除当前文件？',
                    body: '删除后，文件不可恢复',
                    title: '确认删除当前文件？',
                    content: '删除后，文件不可恢复',
                    cancelBtn: '取消',
                    confirmBtn: '确定',
                    onConfirm: () => {
                        this.removeNode('', `${index}`);
                        confirm.hide();
                    },
                    onCancel: () => {
                        confirm.hide();
                    },
                    onClose: () => {
                        confirm.hide();
                    },
                });
            }
        },
        async addExtraFile(
            extraFile: DeduceCreateOperationData<
                EntityDict['extraFile']['Schema']
            >
        ) {
            try {
                const result = await this.features.cache.operate('extraFile', {
                    action: 'create',
                    data: extraFile,
                    id: await generateNewId(),
                });
                return result;
            } catch (error) {
                if (
                    (<OakException>error).constructor.name ===
                    OakUnloggedInException.name
                ) {
                    this.navigateTo({
                        url: '/login',
                    });
                    return;
                }
                throw error;
            }
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
