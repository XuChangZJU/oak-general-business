import { Token } from './token';
import { ExtraFile } from './extraFile';
import { Application } from './application';
import { Config } from './config';
import { WeiXinJsSdk } from './weiXinJsSdk';
import Theme from './theme';
export function initialize(basicFeatures, type, domain) {
    const application = new Application(type, domain, basicFeatures.cache, basicFeatures.localStorage);
    const token = new Token(basicFeatures.cache, basicFeatures.localStorage, basicFeatures.environment);
    // 临时代码，合并后再删
    const extraFile = new ExtraFile(basicFeatures.cache, application, basicFeatures.locales);
    const config = new Config(basicFeatures.cache);
    const weiXinJsSdk = new WeiXinJsSdk(basicFeatures.cache, basicFeatures.localStorage, basicFeatures.environment);
    const theme = new Theme(basicFeatures.cache, basicFeatures.localStorage);
    return {
        token,
        extraFile,
        application,
        config,
        weiXinJsSdk,
        theme,
    };
}
