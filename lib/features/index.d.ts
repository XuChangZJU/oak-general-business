import { CommonAspectDict } from 'oak-common-aspect';
import { Token } from './token';
import { ExtraFile } from './extraFile';
import { Application } from './application';
import { GeneralRuntimeContext } from '../RuntimeContext';
import { BasicFeatures } from 'oak-frontend-base/lib/features';
import { AspectDict } from '../aspects/AspectDict';
import { AspectWrapper } from 'oak-domain/lib/types';
import { AppType } from '../general-app-domain/Application/Schema';
import { EntityDict } from '../general-app-domain';
export declare function initialize<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>, AD extends AspectDict<ED, Cxt>>(aspectWrapper: AspectWrapper<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>, basicFeatures: BasicFeatures<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>, type: AppType, context: Cxt): GeneralFeatures<ED, Cxt, AD>;
export declare type GeneralFeatures<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> = {
    token: Token<ED, Cxt, AD>;
    extraFile: ExtraFile<ED, Cxt, AD>;
    application: Application<ED, Cxt, AD>;
};
