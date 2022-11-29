import { CommonAspectDict } from 'oak-common-aspect';
import { Token } from './token';
import { ExtraFile } from './extraFile';
import { Application } from './application';
import { Config } from './config';
import { BasicFeatures } from 'oak-frontend-base/lib/features';
import { AspectDict } from '../aspects/AspectDict';
import { AppType } from '../general-app-domain/Application/Schema';
import { EntityDict } from '../general-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
export declare function initialize<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>>(basicFeatures: BasicFeatures<ED, Cxt, FrontCxt, AD>, type: AppType, domain: string): GeneralFeatures<ED, Cxt, FrontCxt, AD>;
export declare type GeneralFeatures<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> = {
    token: Token<ED, Cxt, FrontCxt, AD>;
    extraFile: ExtraFile<ED, Cxt, FrontCxt, AD>;
    application: Application<ED, Cxt, FrontCxt, AD>;
    config: Config<ED, Cxt, FrontCxt, AD>;
};
