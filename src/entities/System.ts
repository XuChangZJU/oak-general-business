import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Schema as Platform } from './Platform';

export type QiniuConfig = {
    accessKey: string;
    secretKey: string;
    uploadHost: string; // 七牛上传域名
    liveHost?: string; // 七牛直播云接口域名
    puhlishDomain?: string; // 推流域名
    playDomain?: string; // 拉流域名
    playBackDomain?: string; // 直播回放存储域名
    hub?: string; // 直播空间名,
    publisthKey?: string; // 直播空间限时鉴权密钥
    playKey?: string; // 拉流密钥
    bucket: string;
    domain: string; // 域名
    protocol: string | string[];
};

export type SystemConfig = {
    Cos?: {
        qiniu?: QiniuConfig;
    };
    Map?: {
        amap?: {
            webApiKey: string; // 高德访问rest服务接口的key
        };
    };
    UserEntityGrant?: {
        lifetimeLength: number; // 授权的过期时间（ms）
    };
};

export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    config: SystemConfig;
    platform: Platform;
    super?: Boolean;        // super表示是这个platform本身的系统，可以操作application/system这些数据，也可以访问超出本system的其它数据。
};


const locale: LocaleDef<Schema, '', '', {}> = {
    zh_CN: {
        attr: {
            name: '名称',
            description: '描述',
            config: '设置',
            platform: '平台',
            super: '超级系统',
        },
    },
 };