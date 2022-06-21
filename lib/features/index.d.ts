import { EntityDict } from 'general-app-domain';
import { Token } from './token';
import { ExtraFile } from './extraFile';
import { Application } from './application';
import { GeneralRuntimeContext } from '..';
import { BasicFeatures } from 'oak-frontend-base';
import { AspectDict } from '../aspects/aspectDict';
import { AspectWrapper } from 'oak-domain/lib/types';
export declare function initialize<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>, AD extends AspectDict<ED, Cxt>>(aspectWrapper: AspectWrapper<ED, Cxt, AD>, basicFeatures: BasicFeatures<ED, Cxt, AD>, applicationId: string, context: Cxt): {
    token: Token<ED, Cxt, AD>;
    extraFile: ExtraFile<ED, Cxt, AD>;
    application: Application<ED, Cxt, AD>;
};
