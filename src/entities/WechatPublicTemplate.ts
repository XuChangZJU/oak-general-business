import { String, Text, Datetime, Boolean, Uint } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Application } from './Application';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    application: Application;
    wechatId: String<64>;
    title: Text;
    primaryIndustry: Text;
    deputyIndustry: Text;
    content: Text;
    example: Text;
    param: Object;
    syncAt: Datetime;
};

const entityDesc: EntityDesc<Schema> = {
    locales: {
        zh_CN: {
            name: '公众号标签',
            attr: {
                application: '关联应用',
                wechatId: '微信端id',
                title: '标题',
                primaryIndustry: '所属一级行业',
                deputyIndustry: '所属二级行业',
                content: '内容',
                example: '示例',
                param: '选填参数',
                syncAt: '同步时间',
            },
        },
     },
};

