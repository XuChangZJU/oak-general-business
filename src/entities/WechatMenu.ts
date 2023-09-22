import { String, Text, Datetime, Boolean, Uint, Int } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Application } from './Application';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';
import { Schema as WechatPublicTag } from './WechatPublicTag';

type Config = {
    button: any[],
    matchrule?: {
        tag_id?: string,
    },
};
export interface Schema extends EntityShape {
    menuId?: Int<4>;
    menuConfig: Config;
    application: Application;
    publishState: 'wait' | 'success' | 'fail';
    wechatPublicTag?: WechatPublicTag;
};

const entityDesc: EntityDesc<Schema> = {
    locales: {
        zh_CN: {
            name: '微信菜单',
            attr: {
                menuId: '菜单Id',
                menuConfig: '菜单配置',
                application: '应用',
                publishState: '发布状态',
                wechatPublicTag: '标签',
            },
            v: {
                publishState: {
                    wait: '等待发布',
                    success: '发布成功',
                    fail: '发布失败',
                }
            }
        },
     },
};

