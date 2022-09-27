import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export declare type QiniuConfig = {
    accessKey: string;
    secretKey: string;
    uploadHost: string;
    liveHost?: string;
    puhlishDomain?: string;
    playDomain?: string;
    playBackDomain?: string;
    hub?: string;
    publisthKey?: string;
    playKey?: string;
    bucket: string;
    domain: string;
    protocol: string | string[];
};
export declare type PlatformConfig = {
    Cos?: {
        qiniu?: QiniuConfig;
    };
    Map?: {
        amap?: {
            webApiKey: string;
        };
    };
    UserEntityGrant?: {
        lifetimeLength: number;
    };
};
export interface Schema extends EntityShape {
    name: String<32>;
    description: Text;
    config: PlatformConfig;
}
