import { UploadFile } from "antd";
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../oak-app-domain";
interface NewUploadFile extends UploadFile {
    id?: string;
}
type Theme = "file" | "image" | "image-flow" | "custom";
export default function render(props: WebComponentProps<EntityDict, 'extraFile', true, {
    accept?: string;
    maxNumber?: number;
    multiple?: boolean;
    draggable?: boolean;
    theme?: Theme;
    tips?: string;
    beforeUpload?: (file: File) => Promise<boolean> | boolean;
    disabled?: boolean;
    style?: Record<string, string>;
    className?: string;
    directory?: boolean;
    onPreview?: (file: UploadFile<any>) => void;
    onDownload?: (file: UploadFile<any>) => void;
    showUploadList?: boolean;
    children?: JSX.Element;
    files?: EntityDict['extraFile']['OpSchema'][];
    disableInsert?: boolean;
    disableAdd?: boolean;
    disableDownload?: boolean;
    disableDelete?: boolean;
    disablePreview?: boolean;
}, {
    onPickByWeb: (files: UploadFile[], callback?: (file: NewUploadFile, status: string) => void) => void;
    onDeleteByWeb: (file: UploadFile) => void;
    getUrl: (extraFile: EntityDict['extraFile']['OpSchema']) => string;
    getFileName: (extraFile: EntityDict['extraFile']['OpSchema']) => string;
    formatBytes: (value: number) => string;
}>): import("react/jsx-runtime").JSX.Element;
export {};
