import React, { useState, useEffect, useCallback, useRef } from 'react';

import { Image, ImageViewer, Space } from 'antd-mobile';
import classNames from 'classnames';
import Style from './mobile.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';

type ExtraFile = EntityDict['extraFile']['OpSchema'];

interface EnhancedExtraFile extends ExtraFile {
    url: string;
    thumbUrl: string;
    fileFullName: string;
}

export default function render(
    props: WebComponentProps<
        EntityDict,
        'extraFile',
        true,
        {
            files: EnhancedExtraFile[];
            style?: Record<string, string>;
            className?: string;
            onDownload?: (file: EnhancedExtraFile) => void;
            showUploadList?: boolean;
            disableDownload?: boolean;
            disablePreview?: boolean;
        },
        {}
    >
) {
    const {
        style,
        className,
        onDownload,
        files = [],
        disableDownload = false,
        disablePreview = false,
    } = props.data;
    const { t } = props.methods;
    const [visible, setVisible] = useState(false);
    const imageViewerMultiRef = useRef(null);

    return (
        <>
            <Space>
                {files?.map((ele, index) => (
                    <Image
                        src={ele.thumbUrl}
                        width={100}
                        height={100}
                        fit="contain"
                        onClick={!disablePreview ? () => {
                            setVisible(true);
                            (imageViewerMultiRef.current as any).swipeTo(index);
                        } : undefined}
                    />
                ))}
            </Space>

            <ImageViewer.Multi
                ref={imageViewerMultiRef}
                images={files?.map((ele) => ele.url) || []}
                visible={visible}
                onClose={() => {
                    setVisible(false);
                }}
            />
        </>
    );
}
