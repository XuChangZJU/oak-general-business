import { OpSchema as ExtraFile } from '../general-app-domain/ExtraFile/Schema';
import { Config } from '../types/Config';
export declare function composeFileUrl(extraFile: Pick<ExtraFile, 'type' | 'bucket' | 'filename' | 'origin' | 'extra1' | 'objectId' | 'extension' | 'entity'>, config?: Config, style?: string): any;
export declare function decomposeFileUrl(url: string): Pick<ExtraFile, 'bucket' | 'filename' | 'origin' | 'type' | 'extra1'>;
export declare function getFileURL(file: File): any;
export declare function bytesToSize(sizes: any): any;
