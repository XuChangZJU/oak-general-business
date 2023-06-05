import {
    String,
    Int,
    Text,
    Float,
    SingleGeo,
} from 'oak-domain/lib/types/DataType';
import { ActionDef } from 'oak-domain/lib/types/Action';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as ExtraFile } from './ExtraFile';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    entity?: String<32>;
    entityId?: String<64>;
    title: String<128>; //标题
    author: String<32>; //作者
    abstract?: Text; //摘要
    content?: Text; //正文
    url?: Text; // 外部连接
    files: Array<ExtraFile>; //封面图
    sign: String<32>; //唯一标志
}

type IAction = 'online' | 'offline' | 'disabled';
type IState = 'online' | 'offline' | 'disabled';

const IActionDef: ActionDef<IAction, IState> = {
    stm: {
        online: ['offline', 'online'],
        offline: ['online', 'offline'],
        disabled: [['online', 'offline'], 'disabled'],
    },
    is: 'offline',
};

type Action = IAction;

const entityDesc: EntityDesc<Schema, Action, '', {
    iState: IState;
}> = {
    locales: {
        zh_CN: {
            name: '文章',
            attr: {
                title: '标题',
                author: '作者',
                abstract: '简介',
                content: '正文',
                files: '封面图',
                iState: '状态',
                url: '外部链接',
                entity: '关联对象',
                entityId: '关联对象id',
                sign: '唯一标志',
            },
            action: {
                online: '上架',
                offline: '下架',
                disabled: '禁用',
            },
            v: {
                iState: {
                    online: '已上架',
                    offline: '已下架',
                    disabled: '已禁用',
                },
            },
        },
    },
};
