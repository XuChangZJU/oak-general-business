export type MessagePropsToSms = (type: string, props: Record<string, any>) => {
    signName?: string;      // 可能的签名
    params?: Record<string, string>;        // 模板参数,需要替换的参数名和 value 的键值对
} | undefined;

type WechatKeywordNum = 'keyword1' | 'keyword2' | 'keyword3'| 'keyword4'| 'keyword5'| 'keyword6'| 'keyword7';

export type MessagePropsToWechat = (type: string, props: Record<string, any>, appId?: string) => ({
    first?: {
        value: string;
        color?: string;
    };
    remark?: {
        value: string;
        color?: string;
    };
} & {    
    [K in WechatKeywordNum]?: {
        value: string;
        color?: string;        
    };
}) | undefined;
