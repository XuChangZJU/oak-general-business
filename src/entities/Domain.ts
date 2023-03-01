import { String, Int, Datetime, Image, Boolean, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Schema as System } from './System';

export interface Schema extends EntityShape {
    url: String<64>;
    apiPath: String<32>;
    protocol: 'http' | 'https';
    port: Int<2>;
    system: System;
};

const locale: LocaleDef<Schema, '', '', {
    protocol: Required<Schema>['protocol'];
}> = {
    zh_CN: {
        name: '域名',
        attr: {
            url: '域名',
            apiPath: 'api路径',
            protocol: '协议',
            port: '端口',
            system: '系统',
        },
        v: {
            protocol: {
                http: 'http',
                https: 'https',
            }
        }
    },
 };
 