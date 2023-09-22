import { generateNewId } from 'oak-domain/lib/utils/uuid';
;
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
        bucket: '',
        removeLater: true,
        autoUpload: false,
        maxNumber: 20,
        extension: [],
        fileType: 'all',
        selectCount: 1,
        sourceType: ['album', 'camera'],
        mediaType: ['image'],
        // 图片显示模式
        mode: 'aspectFit',
        // 每行可显示的个数
        size: 3,
        showUploadList: true,
        accept: 'image/*',
        // 图片是否可预览
        preview: true,
        // 图片是否可删除
        disableDelete: false,
        // 上传按钮隐藏
        disableAdd: false,
        // 下按按钮隐藏
        disableDownload: false,
        type: 'file',
        origin: 'qiniu',
        tag1: '',
        tag2: '',
        entity: '',
        entityId: '',
        theme: 'image',
        showUploadProgress: false,
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
                const res = await this.getNodeRectFromComponent(this, '.file-list__container');
                const widthRpx = this.px2rpx(res.right - res.left);
                // 根据容器宽度计算单张图片宽度百分比
                const itemSizePercentage = (10 / size) * 10 - (20 / widthRpx) * 100 + '%;';
                this.setState({
                    itemSizePercentage: itemSizePercentage,
                });
            }
        },
    },
    features: ['extraFile2'],
    formData({ data, features }) {
        const files = data.map(ele => {
            const url = features.extraFile2.getUrl(ele);
            const thumbUrl = features.extraFile2.getUrl(ele, 'thumbnail');
            const fileState = features.extraFile2.getFileState(ele.id);
            const filename = features.extraFile2.getFileName(ele);
            return {
                url,
                thumbUrl,
                filename,
                fileState: fileState?.state,
                percentage: fileState?.percentage,
                ...ele,
            };
        });
        return {
            files,
        };
    },
    methods: {
        onRemove(file) {
            this.removeItem(file.id);
            this.features.extraFile2.removeLocalFiles([file.id]);
        },
        addExtraFileInner(options, file) {
            const { type, origin, tag1, tag2, entity, entityId, bucket } = this.props;
            const { name, fileType, size } = options;
            const extension = name.substring(name.lastIndexOf('.') + 1);
            const filename = name.substring(0, name.lastIndexOf('.'));
            const { files } = this.state;
            const sort = files.length * 10000;
            const id = this.addItem({
                bucket,
                origin,
                type,
                tag1,
                tag2,
                objectId: generateNewId(),
                entity,
                filename,
                size,
                extension,
                fileType,
                entityId,
                sort
            });
            this.features.extraFile2.addLocalFile(id, file);
        },
        addFileByWeb(file) {
            const { size, type, name } = file;
            this.addExtraFileInner({
                name,
                fileType: type,
                size,
            }, file);
        }
    }
});
