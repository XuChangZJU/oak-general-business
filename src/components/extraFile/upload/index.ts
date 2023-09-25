import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { pull } from 'oak-domain/lib/utils/lodash';
import assert from 'assert';
import Dialog from '../../../utils/dialog/index';
import { EntityDict } from '../../../oak-app-domain';
import { FileState } from '../../../features/extraFile2';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base/lib/types/Page';

type ExtraFile = EntityDict['extraFile']['OpSchema'];
export interface EnhancedExtraFile extends ExtraFile {
    url: string;
    thumbUrl: string;
    filename: string;
    fileState?: FileState;
    percentage?: number;
};

type SourceType = 'album' | 'camera';
export type Theme = 'file' | 'image' | 'image-flow' | 'custom';
type FileType = 'all' | 'video' | 'image' | 'file';
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
        extension: [] as string[],
        fileType: 'all' as FileType,
        selectCount: 1,
        sourceType: ['album', 'camera'] as SourceType[],
        mediaType: ['image'] as ('image' | 'video')[],
        // 图片显示模式
        mode: 'aspectFit' as ImgMode,
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
        type: 'file' as ExtraFile['type'],
        origin: 'qiniu' as ExtraFile['origin'],
        tag1: '',
        tag2: '',
        entity: '' as keyof EntityDict,
        entityId: '',
        theme: 'image' as Theme,
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
    features: ['extraFile2'],
    formData({ data, features }) {
        const files = data.map(
            ele => {
                const url = features.extraFile2.getUrl(ele as ExtraFile);
                const thumbUrl = features.extraFile2.getUrl(ele as ExtraFile, 'thumbnail');
                const fileState = features.extraFile2.getFileState(ele.id!);
                const filename = features.extraFile2.getFileName(ele as ExtraFile);
                return {
                    url,
                    thumbUrl,
                    filename,
                    fileState: fileState?.state,
                    percentage: fileState?.percentage,
                    ...ele,
                } as EnhancedExtraFile;
            }
        );
        return {
            files,
        };
    },
    methods: {
        onRemove(file: EnhancedExtraFile) {            
            this.removeItem(file.id);
            this.features.extraFile2.removeLocalFiles([file.id]);
        },
        addExtraFileInner(options: {
            name: string;
            fileType: string;
            size: number;
        }, file: File | string) {
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
                sort,
                uploadState: 'uploading',
            });
            this.features.extraFile2.addLocalFile(id, file);
        },
        addFileByWeb(file: File) {
            const { size, type, name } = file;
            this.addExtraFileInner({
                name,
                fileType: type,
                size,
            }, file);
        }
    }
}) as <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(
    props: ReactComponentProps<
        ED2,
        T2,
        true,
        {
            bucket: string,     // 上传的存储桶位置
            removeLater: boolean,
            autoUpload: boolean,
            maxNumber: number,
            extension: string[],
            fileType: FileType,
            selectCount: number,
            sourceType: SourceType[],
            mediaType: ('image' | 'video')[],
            // 图片显示模式
            mode: ImgMode,
            // 每行可显示的个数
            size: number,
            showUploadList: boolean,
            accept: string,
            // 图片是否可预览
            preview: boolean,
            // 图片是否可删除
            disableDelete: boolean,
            // 上传按钮隐藏
            disableAdd: boolean,
            // 下按按钮隐藏
            disableDownload: boolean,
            disabled: boolean,
            type: string,
            origin: string,
            tag1: string,
            tag2: string,
            entity: keyof ED2,
            entityId: string,
            theme: Theme,
            showUploadProgress: boolean,
            children?: React.ReactNode,
        }
    >
) => React.ReactElement;