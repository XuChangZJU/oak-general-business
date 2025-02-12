"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = require("oak-domain/lib/utils/assert");
const lodash_1 = require("oak-domain/lib/utils/lodash");
const SmsSdk_1 = tslib_1.__importDefault(require("oak-external-sdk/lib/SmsSdk"));
class Ali {
    name = 'ali';
    async getConfig(context, systemId) {
        let system;
        if (systemId) {
            [system] = await context.select('system', {
                data: {
                    id: 1,
                    config: 1,
                },
                filter: {
                    id: systemId,
                },
            }, {
                dontCollect: true,
            });
        }
        else {
            system = context.getApplication().system;
        }
        const { config: systemConfig } = system;
        const aliConfig = (0, lodash_1.get)(systemConfig, 'Sms.ali.0', {});
        const { accessKeyId, accessKeySecret, defaultSignName, endpoint } = aliConfig;
        (0, assert_1.assert)(accessKeyId, 'accessKeyId未配置');
        (0, assert_1.assert)(accessKeySecret, 'accessKeySecret未配置');
        (0, assert_1.assert)(defaultSignName, 'defaultSignName未配置');
        (0, assert_1.assert)(endpoint, 'endpoint未配置');
        return aliConfig;
    }
    async syncTemplate(systemId, context) {
        const { accessKeyId, accessKeySecret, endpoint, apiVersion } = await this.getConfig(context, systemId);
        const aliInstance = SmsSdk_1.default.getInstance('ali', accessKeyId, accessKeySecret, endpoint, undefined, apiVersion);
        const result = await aliInstance.syncTemplate({
            PageIndex: 1,
            PageSize: 100,
        });
        // // todo  templateName: string,
        // templateCode: string,
        // templateContent: string
        const { smsTemplateList } = result;
        if (smsTemplateList) {
            return smsTemplateList.map((ele) => {
                return {
                    templateCode: ele.templateCode,
                    templateName: ele.templateName,
                    templateContent: ele.templateContent,
                };
            });
        }
        return [];
    }
    async sendSms(params, context) {
        const { mobile, templateParam, smsTemplate } = params;
        const { templateCode } = smsTemplate;
        const { accessKeyId, accessKeySecret, defaultSignName, endpoint } = await this.getConfig(context);
        const aliInstance = SmsSdk_1.default.getInstance('ali', accessKeyId, accessKeySecret, endpoint);
        const result = await aliInstance.sendSms({
            phoneNumbers: [mobile],
            templateCode: templateCode,
            templateParam: templateParam,
            signName: defaultSignName,
        });
        const { code, message, requestId } = result;
        if (code === 'OK') {
            return {
                success: true,
                res: result,
            };
        }
        return {
            success: false,
            res: result,
        };
    }
}
exports.default = Ali;
;
