import { Token } from './token';
import { ExtraFile } from './extraFile';
import { Application } from './application';
import { Config } from './config';
import { Template } from './template';
import { WeiXinJsSdk } from './weiXinJsSdk';
import { WechatMenu } from './wechatMenu';
import { WechatPublicTag } from './wechatPublicTag';
import { UserWechatPublicTag } from './userWechatPublicTag';
import Theme from './theme';
export function initialize(basicFeatures, type, domain) {
    const token = new Token(basicFeatures.cache, basicFeatures.localStorage, basicFeatures.environment);
    const application = new Application(type, domain, basicFeatures.cache, basicFeatures.localStorage);
    const wechatMenu = new WechatMenu(basicFeatures.cache, basicFeatures.localStorage);
    const wechatPublicTag = new WechatPublicTag(basicFeatures.cache, basicFeatures.localStorage);
    const userWechatPublicTag = new UserWechatPublicTag(basicFeatures.cache, basicFeatures.localStorage);
    const extraFile = new ExtraFile(basicFeatures.cache, application, basicFeatures.locales, basicFeatures.runningTree);
    const config = new Config(basicFeatures.cache);
    const template = new Template(basicFeatures.cache);
    const weiXinJsSdk = new WeiXinJsSdk(basicFeatures.cache, basicFeatures.localStorage, basicFeatures.environment);
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
