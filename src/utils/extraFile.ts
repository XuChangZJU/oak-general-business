import { OpSchema as ExtraFile } from 'oak-app-domain/ExtraFile/Schema';

export function composeFileUrl(extraFile: Pick<ExtraFile, 'type' | 'bucket' | 'filename' | 'origin' | 'extra1'>) {
    const { type, bucket, filename, origin, extra1 } = extraFile;
    if (extra1) {
        // 有extra1就用extra1
        return extra1!;
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