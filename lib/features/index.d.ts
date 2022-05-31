import { EntityDict } from 'oak-app-domain';
import { Aspect, Context } from 'oak-domain/lib/types';
import { Token } from './token';
import { ExtraFile } from './extraFile';
import { Application } from './application';
export declare function initialize<ED extends EntityDict, Cxt extends Context<ED>, AD extends Record<string, Aspect<ED, Cxt>>>(): {
    token: Token<ED, Cxt, AD>;
    extraFile: ExtraFile<ED, Cxt, AD>;
    application: Application<ED, Cxt, AD>;
};
