import { OpSchema as ExtraFile } from 'oak-app-domain/ExtraFile/Schema';
export declare function composeFileUrl(extraFile: Pick<ExtraFile, 'type' | 'bucket' | 'filename' | 'origin' | 'extra1' | 'objectId' | 'extension' | 'entity'>): string;
export declare function decomposeFileUrl(url: string): Pick<ExtraFile, 'bucket' | 'filename' | 'origin' | 'type' | 'extra1'>;
