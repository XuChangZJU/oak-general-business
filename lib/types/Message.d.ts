export declare type MessagePropsToSms = (type: string, props: Record<string, any>) => {
    signName?: string;
    params?: Record<string, string>;
} | undefined;
declare type WechatKeywordNum = 'keyword1' | 'keyword2' | 'keyword3' | 'keyword4' | 'keyword5' | 'keyword6' | 'keyword7';
export declare type MessagePropsToWechat = (type: string, props: Record<string, any>, appId?: string) => ({
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
export {};
