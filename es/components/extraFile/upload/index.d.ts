import { EntityDict } from '../../../oak-app-domain';
import { FileState } from '../../../features/extraFile';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base/lib/types/Page';
type ExtraFile = EntityDict['extraFile']['OpSchema'];
export interface EnhancedExtraFile extends ExtraFile {
    url: string;
    thumbUrl: string;
    fileName: string;
    fileState?: FileState;
    percentage?: number;
}
export type Theme = 'file' | 'image' | 'image-flow' | 'custom';
type SourceType = 'album' | 'camera';
type ImageMode = 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'left' | 'right' | 'center' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
declare const _default: <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(props: ReactComponentProps<ED2, T2, true, {
    bucket: string;
    removeLater: boolean;
    autoUpload: boolean;
    maxNumber: number;
    extension: string[];
    selectCount: number;
    sourceType: SourceType[];
    mediaType: ('image' | 'video')[];
    mode: ImageMode;
    size: number;
    showUploadList: boolean;
    showUploadProgress: boolean;
    accept: string;
    disablePreview: boolean;
    disableDelete: boolean;
    disableAdd: boolean;
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
}>) => React.ReactElement;
export default _default;
