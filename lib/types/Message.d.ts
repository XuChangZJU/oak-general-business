export declare type MessagePropsToSms = (type: string, props: Record<string, any>, systemId?: string) => {
    signName?: string;
    params?: Record<string, string>;
    paramsArray?: Array<string>;
} | undefined;
declare type WechatPublicTemplateMsgKeyword = 'keyword1' | 'keyword2' | 'keyword3' | 'keyword4' | 'keyword5' | 'keyword6' | 'keyword7';
export declare type MessagePropsToWechatPublic = (type: string, props: Record<string, any>, appId?: string) => ({
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
export declare type MessagePropsToWechatMp = (type: string, props: Record<string, any>, appId?: string) => ({
    [K: string]: {
        value: string;
    };
}) | undefined;
export declare type Channel = 'wechatPublic' | 'jPush' | 'jim' | 'mp' | 'sms';
export declare type Weight = 'high' | 'medium' | 'low';
export {};
