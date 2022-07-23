import { OpSchema as ExtraFile } from 'general-app-domain/ExtraFile/Schema';
import { SystemConfig } from 'general-app-domain/System/Schema';
export declare function composeFileUrl(extraFile: Pick<ExtraFile, 'type' | 'bucket' | 'filename' | 'origin' | 'extra1' | 'objectId' | 'extension' | 'entity'>, systemConfig?: SystemConfig): any;
export declare function decomposeFileUrl(url: string): Pick<ExtraFile, 'bucket' | 'filename' | 'origin' | 'type' | 'extra1'>;
export declare function getFileURL(file: File): any;
