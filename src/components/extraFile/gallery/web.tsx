import React from 'react';
import { Upload, UploadFile } from 'tdesign-react';
import { composeFileUrl } from '../../../utils/extraFile';

function extraFileToUploadFile(extraFile: any, systemConfig: any) {
    return Object.assign({}, extraFile, {
        url: composeFileUrl(extraFile, systemConfig),
        name: extraFile.filename,
    });
}

interface ExtraFile extends UploadFile {
    id?: string;
}

export default function render(this: any) {
    const {
        mediaType,
        maxNumber = 100,
        multiple = true,
        useMockProgress = false,
        draggable = false,
        showUploadProgress = false,
        theme = 'image',
        tips,
        placeholder,
        beforeUpload,
        disabled,
        style,
        className,
        sizeLimit,
    } = this.props;
    const { files, systemConfig } = this.state;

    return (
        <Upload
            sizeLimit={sizeLimit}
            className={className}
            style={style}
            disabled={disabled}
            beforeUpload={beforeUpload}
            placeholder={placeholder}
            tips={tips}
            multiple={multiple}
            autoUpload={false}
            draggable={draggable}
            useMockProgress={useMockProgress}
            max={maxNumber}
            accept={mediaType}
            showUploadProgress={showUploadProgress}
            theme={theme}
            files={(files || []).map((ele: any) =>
                extraFileToUploadFile(ele, systemConfig)
            )}
            onChange={(uploadFiles) => {
                const newUploadFiles =
                    uploadFiles?.filter((ele: ExtraFile) => !ele.id) || [];
                this.onWebPick(newUploadFiles);
            }}
            onRemove={({ file, index, e }) => {
                this.onWebDelete(file, index);
            }}
            onPreview={({ file, e }) => {}}
        />
    );
}
