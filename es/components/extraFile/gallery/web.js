import React, { useState, useRef } from 'react';
import { Image, ImageViewer, Space } from 'antd-mobile';
export default function render(props) {
    const { style, className, onDownload, files = [], disableDownload = false, disablePreview = false, } = props.data;
    const { t } = props.methods;
    const [visible, setVisible] = useState(false);
    const imageViewerMultiRef = useRef(null);
    return (<>
            <Space>
                {files?.map((ele, index) => (<Image src={ele.thumbUrl} width={100} height={100} fit="contain" onClick={!disablePreview ? () => {
                setVisible(true);
                imageViewerMultiRef.current.swipeTo(index);
            } : undefined}/>))}
            </Space>

            <ImageViewer.Multi ref={imageViewerMultiRef} images={files?.map((ele) => ele.url) || []} visible={visible} onClose={() => {
            setVisible(false);
        }}/>
        </>);
}
