import { Token } from './token';
import { ExtraFile } from './extraFile';
import { ExtraFile2 } from './extraFile2';
import { Application } from './application';
import { Config } from './config';
import { Style2 } from './style2';
import { WeiXinJsSdk } from './weiXinJsSdk';
import { WechatMenu } from './wechatMenu';
import { WechatPublicTag } from './wechatPublicTag';
import { UserWechatPublicTag } from './userWechatPublicTag';
import Theme from './theme';
export function initialize(basicFeatures, type, domain) {
    const application = new Application(type, domain, basicFeatures.cache, basicFeatures.localStorage);
    const token = new Token(basicFeatures.cache, basicFeatures.localStorage, basicFeatures.environment);
    const wechatMenu = new WechatMenu(basicFeatures.cache, basicFeatures.localStorage);
    const wechatPublicTag = new WechatPublicTag(basicFeatures.cache, basicFeatures.localStorage);
    const userWechatPublicTag = new UserWechatPublicTag(basicFeatures.cache, basicFeatures.localStorage);
    // 临时代码，合并后再删
    const extraFile = new ExtraFile(basicFeatures.cache, application, basicFeatures.locales);
    const extraFile2 = new ExtraFile2(basicFeatures.cache, application, basicFeatures.locales);
    const config = new Config(basicFeatures.cache);
    const style2 = new Style2(basicFeatures.cache);
    const weiXinJsSdk = new WeiXinJsSdk(basicFeatures.cache, basicFeatures.localStorage, basicFeatures.environment);
    const theme = new Theme(basicFeatures.cache, basicFeatures.localStorage);
    return {
        token,
        extraFile,
        extraFile2,
        application,
        config,
        style2,
        weiXinJsSdk,
        theme,
        wechatMenu,
        wechatPublicTag,
        userWechatPublicTag,
    };
}
