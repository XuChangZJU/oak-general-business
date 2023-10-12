import { CommonAspectDict } from 'oak-common-aspect';
import { Token } from './token';
import { ExtraFile } from './extraFile';
import { ExtraFile2 } from './extraFile2';
import { Application } from './application';
import { Config } from './config';
import { Style2 } from './style2';
import { Template } from './template';
import { WeiXinJsSdk } from './weiXinJsSdk';
import { WechatMenu } from './wechatMenu';
import { WechatPublicTag } from './wechatPublicTag';
import { UserWechatPublicTag } from './userWechatPublicTag';
import { BasicFeatures } from 'oak-frontend-base';
import AspectDict from '../aspects/AspectDict';
import { AppType } from '../oak-app-domain/Application/Schema';
import { EntityDict } from '../oak-app-domain';
import Theme from './theme';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
export declare function initialize<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>>(basicFeatures: BasicFeatures<ED, Cxt, FrontCxt, AD>, type: AppType, domain: string): GeneralFeatures<ED, Cxt, FrontCxt, AD>;
export type GeneralFeatures<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> = {
    token: Token<ED, Cxt, FrontCxt, AD>;
    extraFile: ExtraFile<ED, Cxt, FrontCxt, AD>;
    extraFile2: ExtraFile2<ED, Cxt, FrontCxt, AD>;
    application: Application<ED, Cxt, FrontCxt, AD>;
    config: Config<ED, Cxt, FrontCxt, AD>;
    style2: Style2<ED, Cxt, FrontCxt, AD>;
    template: Template<ED, Cxt, FrontCxt, AD>;
    weiXinJsSdk: WeiXinJsSdk<ED, Cxt, FrontCxt, AD>;
    theme: Theme<ED, Cxt, FrontCxt, AD>;
    wechatMenu: WechatMenu<ED, Cxt, FrontCxt, AD>;
    wechatPublicTag: WechatPublicTag<ED, Cxt, FrontCxt, AD>;
    userWechatPublicTag: UserWechatPublicTag<ED, Cxt, FrontCxt, AD>;
};
