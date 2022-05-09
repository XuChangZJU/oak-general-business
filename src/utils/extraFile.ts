import { OpSchema as ExtraFile } from 'oak-app-domain/ExtraFile/Schema';

export function composeFileUrl(extraFile: ExtraFile) {
    const { type, bucket, filename, origin, extra1 } = extraFile;
    if (origin === 'unknown') {
        // 未知第三方源
        return extra1!;
    }
    throw new Error('not implemented yet');
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