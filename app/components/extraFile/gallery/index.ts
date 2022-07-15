import assert from 'assert';
import { EntityDict } from 'general-app-domain';
import { DeduceCreateOperationData } from "oak-domain/lib/types";
import { isMockId } from "oak-frontend-base/src/utils/mockId";
import { composeFileUrl } from '../../../../src/utils/extraFile';

export default OakComponent({
    entity: 'extraFile',
    isList: true,
    async formData ({ data: files }) {
        const number2 = this.props.maxNumber;
        if (typeof number2 === 'number' && (number2 === 0 || files?.length >= number2)) {
            return {
                files,
                disableInsert: true,
            };
        }
        return {
            files,
            disableInsert: false,
        };
    },
    data: {
        selected: -1,
        // 根据 size 不同，计算的图片显示大小不同
        itemSizePercentage: '',
    },
    externalClasses: ['l-class', 'l-item-class'],
    properties: {
        oakFullpath: String,
        oakParent: String,
        oakPath: String,
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
            const {
                selectCount,
                mediaType,
                sourceType,
                type,
                origin,
                tag1,
                tag2,
                entity,
            } = this.props;
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
                    await Promise.all(tempFiles.map(
                        async (tempExtraFile) => {
                            const { tempFilePath, thumbTempFilePath, fileType, size } = tempExtraFile;
                            const filePath = tempFilePath || thumbTempFilePath;
                            const fileFullName = filePath.match(/[^/]+(?!.*\/)/g)![0];
                            const extension = fileFullName.substring(
                                fileFullName.lastIndexOf('.') + 1
                            );
                            const filename = fileFullName.substring(
                                0, fileFullName.lastIndexOf('.')
                            );
                            assert(entity, '必须传入entity');
                            assert(origin === 'qiniu', '目前只支持七牛上传');     // 目前只支持七牛上传
                            const ele: Parameters<typeof this['pushNode']>[1] =
                                {
                                    updateData: {
                                        extra1: filePath,
                                        origin,
                                        type: type || fileType,
                                        tag1,
                                        tag2,
                                        objectId: await generateNewId(),
                                        entity,
                                        filename: filename,
                                        size: size,
                                        extension,
                                    },
                                    beforeExecute: async (updateData) => {
                                        const { url, bucket } =
                                            await this.features.extraFile.upload(
                                                updateData as DeduceCreateOperationData<
                                                    EntityDict['extraFile']['Schema']
                                                >
                                            );
                                        Object.assign(updateData, {
                                            bucket,
                                            extra1: null,
                                        });
                                    },
                                };
                            
                            this.pushNode(undefined, ele);
                        }
                    ));
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
        async onItemTapped(event: WechatMiniprogram.Touch) {
            const { files } = this.state;
            const { index } = event.currentTarget.dataset;
            const imageUrl = composeFileUrl(files[index]!);
            const urls = files?.filter(ele => !!ele).map((ele) => composeFileUrl(ele!));

            const detail = {
                all: files,
                index,
                urls: urls,
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
                this.removeNode(this.state.oakFullpath, `${index}`);
            } else {
                const result = await wx.showModal({
                    title: '确认删除吗',
                    content: '删除现有文件',
                });
                const { confirm } = result;
                if (confirm) {
                    this.removeNode(this.state.oakFullpath, `${index}`);
                }
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
