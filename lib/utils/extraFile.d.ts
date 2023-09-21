import { OpSchema as ExtraFile } from '../oak-app-domain/ExtraFile/Schema';
import { Config } from '../types/Config';
export declare function composeFileUrl(extraFile: ExtraFile, config?: Config, style?: string): string;
export declare function getFileURL(file: File): string;
export declare function bytesToSize(size: number): string;
