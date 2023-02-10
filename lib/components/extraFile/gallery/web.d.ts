/// <reference types="react" />
import { UploadFile } from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
declare type Theme = 'file' | 'image' | 'image-flow' | 'custom';
export default function render(props: WebComponentProps<EntityDict, 'extraFile', true, {
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
    files?: EntityDict['extraFile']['OpSchema'][];
    disableInsert?: boolean;
}, {
    onPickByWeb: (files: UploadFile[], callback?: (file: any, status: string) => void) => void;
    onDeleteByWeb: (file: UploadFile) => void;
}>): JSX.Element;
export {};
