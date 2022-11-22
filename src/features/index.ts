import { CommonAspectDict } from 'oak-common-aspect';
import { Token } from './token';
import { ExtraFile } from './extraFile';
import { Application } from './application';
import { Config } from './config';
import { BasicFeatures } from 'oak-frontend-base/lib/features';
import { AspectDict } from '../aspects/AspectDict';
import { AspectWrapper } from 'oak-domain/lib/types';
import { AppType } from '../general-app-domain/Application/Schema';
import { EntityDict } from '../general-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';

export function initialize<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
>(
    basicFeatures: BasicFeatures<ED, Cxt, FrontCxt, AD>,
    type: AppType
): GeneralFeatures<ED, Cxt, FrontCxt, AD> {
    const application = new Application<ED, Cxt, FrontCxt, AD>(
        type, basicFeatures.cache, basicFeatures.localStorage);
    const token = new Token<ED, Cxt, FrontCxt, AD>(basicFeatures.cache, basicFeatures.localStorage);
    const extraFile = new ExtraFile<ED, Cxt, FrontCxt, AD>(basicFeatures.cache);
    const config = new Config<ED, Cxt, FrontCxt, AD>(basicFeatures.cache);
    return {
        token,
        extraFile,
        application,
        config,
    };
}

export type GeneralFeatures<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
    > = {
        token: Token<ED, Cxt, FrontCxt, AD>;
        extraFile: ExtraFile<ED, Cxt, FrontCxt, AD>;
        application: Application<ED, Cxt, FrontCxt, AD>;
        config: Config<ED, Cxt, FrontCxt, AD>;
    };
