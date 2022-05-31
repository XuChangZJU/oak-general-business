import { OpSchema as ExtraFile } from 'oak-app-domain/ExtraFile/Schema';
import { SystemConfig } from 'oak-app-domain/System/Schema';
export declare function composeFileUrl(extraFile: Pick<ExtraFile, 'type' | 'bucket' | 'filename' | 'origin' | 'extra1' | 'objectId' | 'extension' | 'entity'>, systemConfig?: SystemConfig): string;
export declare function decomposeFileUrl(url: string): Pick<ExtraFile, 'bucket' | 'filename' | 'origin' | 'type' | 'extra1'>;
