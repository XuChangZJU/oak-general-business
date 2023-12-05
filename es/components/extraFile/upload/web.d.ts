import React from 'react';
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
    beforeUpload?: (file: File) => Promise<boolean> | boolean;
    style?: Record<string, string>;
    className?: string;
    directory?: boolean;
    onPreview?: (file: UploadFile<any>) => void;
    onDownload?: (file: UploadFile<any>) => void;
    showUploadList?: boolean;
    children?: JSX.Element;
    disableInsert?: boolean;
    disableDownload?: boolean;
    disableDelete?: boolean;
    disablePreview?: boolean;
}, {
    onRemove: (file: UploadFile) => void;
    addFileByWeb: (file: UploadFile) => void;
    checkSort: (sort: number) => boolean;
}>): React.JSX.Element;
