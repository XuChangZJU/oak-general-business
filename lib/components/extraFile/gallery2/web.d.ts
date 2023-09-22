import { UploadFile } from "antd";
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../oak-app-domain";
import { EnhancedExtraFile, Theme } from './index';
export default function render(props: WebComponentProps<EntityDict, 'extraFile', true, {
    files: EnhancedExtraFile[];
    accept?: string;
    maxNumber?: number;
    multiple?: boolean;
    draggable?: boolean;
    theme?: Theme;
    tips?: string;
    beforeUpload?: (file: File) => Promise<boolean>;
    disabled?: boolean;
    style?: Record<string, string>;
    className?: string;
    directory?: boolean;
    onPreview?: (file: UploadFile<any>) => void;
    onDownload?: (file: UploadFile<any>) => void;
    showUploadList?: boolean;
    children?: JSX.Element;
    disableInsert?: boolean;
    disableAdd?: boolean;
    disableDownload?: boolean;
    disableDelete?: boolean;
    preview?: boolean;
}, {
    onDeleteByWeb: (file: UploadFile) => void;
    addFileByWeb: (file: UploadFile) => void;
}>): JSX.Element;
