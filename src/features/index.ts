import { EntityDict } from 'oak-app-domain';
import { Aspect, Context } from 'oak-domain/lib/types';
import { Token } from './token';
import { ExtraFile } from './extraFile';

export function initialize<ED extends EntityDict, Cxt extends Context<ED>, AD extends Record<string, Aspect<ED, Cxt>>>() {
    const token = new Token<ED, Cxt, AD>();
    const extraFile = new ExtraFile<ED, Cxt, AD>();
    return {
        token,
        extraFile,
    };
}
