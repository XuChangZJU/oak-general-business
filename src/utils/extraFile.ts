import { OpSchema as ExtraFile } from 'general-app-domain/ExtraFile/Schema';
import { SystemConfig } from 'general-app-domain/System/Schema';

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
        // 有extra1就用extra1
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