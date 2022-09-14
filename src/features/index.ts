import { CommonAspectDict } from 'oak-common-aspect';
import { Token } from './token';
import { ExtraFile } from './extraFile';
import { Application } from './application';
import { RuntimeContext } from '../context/RuntimeContext';
import { BasicFeatures } from 'oak-frontend-base/lib/features';
import { AspectDict } from '../aspects/AspectDict';
import { AspectWrapper } from 'oak-domain/lib/types';
import { AppType } from '../general-app-domain/Application/Schema';
import { EntityDict } from '../general-app-domain';

export function initialize<ED extends EntityDict, Cxt extends RuntimeContext<ED>, AD extends AspectDict<ED, Cxt>>(
    aspectWrapper: AspectWrapper<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>,
    basicFeatures: BasicFeatures<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>,
    type: AppType
): GeneralFeatures<ED, Cxt, AD> {
    const application = new Application<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>(
        aspectWrapper, type, basicFeatures.cache, basicFeatures.localStorage);
    const token = new Token<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>(aspectWrapper, basicFeatures.cache, basicFeatures.localStorage);
    const extraFile = new ExtraFile<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>(aspectWrapper);
    return {
        token,
        extraFile,
        application,
    };
}

export type GeneralFeatures<ED extends EntityDict, Cxt extends RuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> = {
    token: Token<ED, Cxt, AD>;
    extraFile: ExtraFile<ED, Cxt, AD>;
    application: Application<ED, Cxt, AD>;
};
