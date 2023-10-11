import { EntityDict } from '../../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base/lib/types/Page';
type ImgMode = 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | "heightFix" | 'top' | 'bottom' | 'left' | 'right' | 'center' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
declare const _default: <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(props: ReactComponentProps<ED2, T2, true, {
    mode: ImgMode;
    size: number;
    disablePreview: boolean;
    disableDownload: boolean;
    tag1: string;
    tag2: string;
    entity: keyof ED2;
    entityId: string;
    style: string;
}>) => React.ReactElement;
export default _default;
