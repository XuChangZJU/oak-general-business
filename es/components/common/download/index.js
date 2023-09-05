import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
const onDownload = (arrayBuffer, filename) => {
    const blob = new Blob(arrayBuffer ? [arrayBuffer] : []);
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(blobUrl);
};
const base64ToBlob = (base64String) => {
    const parts = base64String.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {
        type: contentType,
    });
};
const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};
const base64ToArrayBuffer = (base64String) => {
    const parts = base64String.split(';base64,');
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const bytes = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
        bytes[i] = raw.charCodeAt(i);
    }
    return bytes.buffer;
};
function Download(props) {
    const { children, beforeDownload, filename = 'download.xlsx', className, style, } = props;
    return (_jsx(_Fragment, { children: React.createElement('div', {
            onClick: async () => {
                let arrayBuffer;
                if (typeof beforeDownload === 'function') {
                    arrayBuffer = await beforeDownload();
                }
                onDownload(arrayBuffer, filename);
            },
            className,
            style,
        }, children) }));
}
Download.onDownload = onDownload;
Download.base64ToBlob = base64ToBlob;
Download.arrayBufferToBase64 = arrayBufferToBase64;
Download.base64ToArrayBuffer = base64ToArrayBuffer;
export default Download;
