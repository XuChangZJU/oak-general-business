<<<<<<< HEAD
import { OpSchema as ExtraFile } from '../base-app-domain/ExtraFile/Schema';
=======
import { OpSchema as ExtraFile } from 'oak-app-domain/ExtraFile/Schema';
>>>>>>> 29abd56e063b345c3d535d45f7926ddc2d0e7f9f
export declare function composeFileUrl(extraFile: ExtraFile): string;
export declare function decomposeFileUrl(url: string): Pick<ExtraFile, 'bucket' | 'filename' | 'origin' | 'type' | 'extra1'>;
