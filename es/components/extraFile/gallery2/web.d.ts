import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
type ExtraFile = EntityDict['extraFile']['OpSchema'];
interface EnhancedExtraFile extends ExtraFile {
    url: string;
    thumbUrl: string;
    fileFullName: string;
}
export default function render(props: WebComponentProps<EntityDict, 'extraFile', true, {
    files: EnhancedExtraFile[];
    style?: Record<string, string>;
    className?: string;
    onDownload?: (file: EnhancedExtraFile) => void;
    showUploadList?: boolean;
    disableDownload?: boolean;
    disablePreview?: boolean;
}, {}>): import("react/jsx-runtime").JSX.Element;
export {};
