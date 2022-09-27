import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Schema as Platform } from './Platform';
import { QiniuConfig } from '../types/Config';

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