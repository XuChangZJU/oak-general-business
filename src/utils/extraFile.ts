import { OpSchema as ExtraFile } from '../general-app-domain/ExtraFile/Schema';
import { SystemConfig } from '../general-app-domain/System/Schema';

export function composeFileUrl(
    extraFile: Pick<
        ExtraFile,
        | 'type'
        | 'bucket'
        | 'filename'
        | 'origin'
        | 'extra1'
        | 'objectId'
        | 'extension'
        | 'entity'
    >,
    systemConfig?: SystemConfig
) {
    const { type, bucket, filename, origin, extra1, objectId, extension, entity } =
        extraFile;
    if (extra1) {
        // 有extra1就用extra1 可能File对象
        if (typeof extra1 === 'string') {
            return extra1;
        }
        if ((extra1 as any) instanceof File) {
            return getFileURL(extra1);
        }
        return extra1;
    }
    if (systemConfig && systemConfig.Cos) {
        const { domain, protocol } =
            systemConfig.Cos[origin as keyof typeof systemConfig.Cos]!;
        let protocol2 = protocol;    
        if (protocol instanceof Array) {
            // protocol存在https 说明域名有证书
            const index = (protocol as ['http', 'https']).includes('https')
                ? protocol.findIndex((ele) => ele === 'https')
                : 0;
            protocol2 = protocol[index];
        }
        return `${protocol2}://${domain}/${entity}/${objectId}.${extension}`;
    }
    return '';
}

export function decomposeFileUrl(url: string): Pick<ExtraFile, 'bucket' | 'filename' | 'origin' | 'type' | 'extra1'> {
    return {
        origin: 'unknown',
        extra1: url,
        type: 'file',
        filename: '',
        bucket: '',
    };
}

//获取file文件url
export function getFileURL(file: File) {
    let getUrl = null;

    // @ts-ignore
    if (window.createObjectURL !== undefined) {
        // basic
        // @ts-ignore
        getUrl = window.createObjectURL(file);
    } else if (window.URL !== undefined) {
        // mozilla(firefox)
        getUrl = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        getUrl = window.webkitURL.createObjectURL(file);
    }
    return getUrl;
}

export function bytesToSize(sizes: any) {
    let mYsize = sizes;
    if (mYsize === 0) return 0 + 'B';
    if (mYsize < 0.1) { // 小于0.1KB转换为B
        mYsize = parseFloat((mYsize * 1024).toFixed(2)) + 'B'
    } else if (mYsize > (0.1 * 1024)) { // 大于0.1MB转换为MB
        mYsize = parseFloat((mYsize / 1024).toFixed(2)) + 'MB'
    } else if (mYsize > (0.1 * 1024 * 1024)) {// 大于0.1GB转换为GB
        mYsize = parseFloat((mYsize / 1024 / 1024).toFixed(2)) + 'GB'
    } else {
        mYsize = (mYsize).toFixed(2) + 'KB'
    }

    return mYsize;
}