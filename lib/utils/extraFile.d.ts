import { OpSchema as ExtraFile } from '../general-app-domain/ExtraFile/Schema';
import { Config } from '../types/Config';
export declare function composeFileUrl(extraFile: ExtraFile, config?: Config, style?: string): string;
export declare function decomposeFileUrl(url: string): Pick<ExtraFile, 'bucket' | 'filename' | 'origin' | 'type' | 'extra1'>;
export declare function getFileURL(file: File): any;
export declare function bytesToSize(size: number): string;
