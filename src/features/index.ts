import { CommonAspectDict } from 'oak-common-aspect';
import { Token } from './token';
import { ExtraFile } from './extraFile';
import { Application } from './application';
import { Config } from './config';
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

export function initialize<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
>(
    basicFeatures: BasicFeatures<ED, Cxt, FrontCxt, AD>,
    type: AppType,
    domain: string,
): GeneralFeatures<ED, Cxt, FrontCxt, AD> {
    const application = new Application<ED, Cxt, FrontCxt, AD>(
        type,
        domain,
        basicFeatures.cache,
        basicFeatures.localStorage
    );
    const token = new Token<ED, Cxt, FrontCxt, AD>(
        basicFeatures.cache,
        basicFeatures.localStorage,
        basicFeatures.environment
    );

    const wechatMenu = new WechatMenu<ED, Cxt, FrontCxt, AD>(
        basicFeatures.cache,
        basicFeatures.localStorage,
    )

    const wechatPublicTag = new WechatPublicTag<ED, Cxt, FrontCxt, AD>(
        basicFeatures.cache,
        basicFeatures.localStorage,
    )

    const userWechatPublicTag = new UserWechatPublicTag<ED, Cxt, FrontCxt, AD>(
        basicFeatures.cache,
        basicFeatures.localStorage,
    )

    const extraFile = new ExtraFile<ED, Cxt, FrontCxt, AD>(
        basicFeatures.cache,
        application,
        basicFeatures.locales,
        basicFeatures.runningTree
    );
    const config = new Config<ED, Cxt, FrontCxt, AD>(basicFeatures.cache);
    const template = new Template<ED, Cxt, FrontCxt, AD>(basicFeatures.cache);
    const weiXinJsSdk = new WeiXinJsSdk<ED, Cxt, FrontCxt, AD>(
        basicFeatures.cache,
        basicFeatures.localStorage,
        basicFeatures.environment
    );
    const theme = new Theme(basicFeatures.cache, basicFeatures.localStorage);

    return {
        token,
        extraFile,
        application,
        config,
        template,
        weiXinJsSdk,
        theme,
        wechatMenu,
        wechatPublicTag,
        userWechatPublicTag,
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
    template: Template<ED, Cxt, FrontCxt, AD>;
    weiXinJsSdk: WeiXinJsSdk<ED, Cxt, FrontCxt, AD>;
    theme: Theme<ED, Cxt, FrontCxt, AD>;
    wechatMenu: WechatMenu<ED, Cxt, FrontCxt, AD>;
    wechatPublicTag: WechatPublicTag<ED, Cxt, FrontCxt, AD>;
    userWechatPublicTag: UserWechatPublicTag<ED, Cxt, FrontCxt, AD>;
};
