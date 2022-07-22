import React from 'react';
import { Upload, UploadFile } from 'tdesign-mobile-react';
import { composeFileUrl } from '../../../../lib/utils/extraFile';

function extraFileToUploadFile(extraFile, systemConfig) {
    return Object.assign({}, extraFile, {
        url: composeFileUrl(extraFile, systemConfig),
        name: extraFile.filename,
    });
}

interface ExtraFile extends UploadFile {
    id?: string;
}

export default function render() {
    const { mediaType, maxNumber = 100, multiple = true } = this.props;
    const { files, systemConfig } = this.state;

    return (
        <Upload
            multiple={multiple}
            autoUpload={false}
            max={maxNumber}
            accept={mediaType}
            files={(files || []).map((ele) =>
                extraFileToUploadFile(ele, systemConfig)
            )}
            onChange={(value) => {
                const value2 = value?.filter((ele: ExtraFile) => !ele.id) || [];
                this.onWebPick(value2);
            }}
            onRemove={({ file, index, e }) => {
                this.onWebDelete(file, index);
            }}
            onPreview={({ file, e }) => {
                // this.onWebDelete(file, e);
            }}
        />
    );
}
