import { OpSchema as ExtraFile } from 'oak-app-domain/ExtraFile/Schema';
export declare function composeFileUrl(extraFile: ExtraFile): string;
export declare function decomposeFileUrl(url: string): Pick<ExtraFile, 'bucket' | 'filename' | 'origin' | 'type' | 'extra1'>;
