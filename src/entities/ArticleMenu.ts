import { String, Boolean } from 'oak-domain/lib/types/DataType';
import { ActionDef } from 'oak-domain/lib/types/Action';
import { EntityShape, Configuration } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Index } from 'oak-domain/lib/types/Storage';
import { Schema as ExtraFile } from './ExtraFile';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
  name: String<32>; //文章菜单名称
  isArticle: Boolean; //节点上是否存在文章
  parent?: Schema;
  isLeaf: Boolean;
  entity: String<32>;
  entityId: String<64>;
  files?: Array<ExtraFile>; //logo
}


const entityDesc: EntityDesc<Schema> = {
    locales: {
        zh_CN: {
            name: '文章分类',
            attr: {
                name: '分类标题',
                isArticle: '是否存在文章',
                parent: '所属分类',
                entity: '对象',
                entityId: '对象Id',
                isLeaf: '结点下是否存在叶子结点',
                files: '图片',
            },
        },
    },
};
