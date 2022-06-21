import { EntityDict } from 'general-app-domain';
import { AspectDict as CommonAspectDict } from 'oak-common-aspect/lib/aspectDict';
import { Token } from './token';
import { ExtraFile } from './extraFile';
import { Application } from './application';
import { GeneralRuntimeContext } from '..';
import { BasicFeatures } from 'oak-frontend-base';
import { AspectDict } from '../aspects/aspectDict';
import { AspectWrapper } from 'oak-domain/lib/types';

export function initialize<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>, AD extends AspectDict<ED, Cxt>>(
    aspectWrapper: AspectWrapper<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>,
    basicFeatures: BasicFeatures<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>,
    applicationId: string,
    context: Cxt,
) {
    const token = new Token<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>(aspectWrapper, basicFeatures.cache, context);
    const extraFile = new ExtraFile<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>(aspectWrapper);
    const application = new Application<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>(aspectWrapper, applicationId, basicFeatures.cache);
    return {
        token,
        extraFile,
        application,
    };
}
