export type MessagePropsToSms = (type: string, props: Record<string, any>, systemId?: string) => {
    signName?: string;      // 可能的签名
    params?: Record<string, string>;        // 模板参数,需要替换的参数名和 value 的键值对
    paramsArray?: Array<string>;            // 数组形式的模板参数，按序传入服务商接口
} | undefined;

type WechatPublicTemplateMsgKeyword = 'keyword1' | 'keyword2' | 'keyword3'| 'keyword4'| 'keyword5'| 'keyword6'| 'keyword7';

export type MessagePropsToWechatPublic = (type: string, props: Record<string, any>, appId?: string) => ({
    first?: {
        value: string;
        color?: string;
    };
    remark?: {
        value: string;
        color?: string;
    };
} & {    
    [K in WechatPublicTemplateMsgKeyword]?: {
        value: string;
        color?: string;        
    };
}) | undefined;

// 通过小程序订阅接口下发消息的格式。https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-message-management/subscribe-message/sendMessage.html
export type MessagePropsToWechatMp = (type: string, props: Record<string, any>, appId?: string) => ({
    [K : string]: {
        value: string;
    }
}) | undefined;

export type Channel = 'wechatPublic' | 'jPush' | 'jim' | 'mp' | 'sms';
export type Weight = 'high' | 'medium' | 'low';
