import { EntityDict } from '../../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base/lib/types/Page';

type ExtraFile = EntityDict['extraFile']['OpSchema'];

interface EnhancedExtraFile extends ExtraFile {
    url: string;
    thumbUrl: string;
    fileName: string;
};

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
    features: ['extraFile2'],
    formData({ data, features }) {
        let files = data?.sort((ele1, ele2) => ele1.sort! - ele2.sort!);
        if (this.props.tag1) {
            files = files?.filter((ele) => ele?.tag1 === this.props.tag1);
        }
        if (this.props.tag2) {
            files = files?.filter((ele) => ele?.tag2 === this.props.tag2);
        }

        const files2 = files.map((ele) => {
            const url = features.extraFile2.getUrl(ele as ExtraFile);
            const thumbUrl = features.extraFile2.getUrl(
                ele as ExtraFile,
                this.props.style
            );
            const fileName = features.extraFile2.getFileName(ele as ExtraFile);
            return {
                url,
                thumbUrl,
                fileName,
                ...ele,
            } as EnhancedExtraFile;
        });
        return {
            files: files2,
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
        mode: 'aspectFit' as ImgMode, // 图片显示模式
        size: 3, // 每行可显示的个数 小程序独有
        disablePreview: false, // 图片是否可预览
        disableDownload: false, // 下载按钮隐藏
        tag1: '',
        tag2: '',
        entity: '' as keyof EntityDict,
        entityId: '',
        style: '',
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
    },
    listeners: {
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
            // 图片显示模式
            mode: ImgMode;
            // 每行可显示的个数
            size: number;
            // 图片是否可预览
            disablePreview: boolean;
            // 下按按钮隐藏
            disableDownload: boolean;
            tag1: string;
            tag2: string;
            entity: keyof ED2;
            entityId: string;
            style: string;
        }
    >
) => React.ReactElement;
