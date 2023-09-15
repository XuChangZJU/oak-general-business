/// <reference types="node" />
import * as React from 'react';
type IDownloadProps = {
    children?: React.ReactNode;
    beforeDownload: () => Promise<ArrayBuffer>;
    className?: string;
    style?: React.CSSProperties;
    filename?: string;
};
declare function Download(props: IDownloadProps): JSX.Element;
declare namespace Download {
    var onDownload: (arrayBuffer: ArrayBuffer, filename: string) => void;
    var base64ToBlob: (base64String: string) => Blob;
    var arrayBufferToBase64: (buffer: Buffer) => string;
    var base64ToArrayBuffer: (base64String: string) => ArrayBufferLike;
}
export default Download;
