import { String, Float, Text } from 'oak-domain/lib/types/DataType';
import { ActionDef } from 'oak-domain/lib/types/Action';
import { EntityShape, Configuration } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
import { Index } from 'oak-domain/lib/types/Storage';
import { Schema as ArticleMenu } from './ArticleMenu';
import { Schema as ExtraFile } from './ExtraFile';

export interface Schema extends EntityShape {
  name: String<32>; //标题名称
  content: Text; //文章内容
  articleMenu: ArticleMenu; //文章菜单
  entity: String<32>;
  entityId: String<64>;
  files?: Array<ExtraFile>; 
}
export type Relation = 'owner' | 'manager';
const locale: LocaleDef<
    Schema,
    '',
    Relation,
    {
    }
> = {
    zh_CN: {
        name: '文章',
        attr: {
            name: '文章标题',
            content: '请输入正文内容',
            articleMenu: '文章菜单',
            entity: '对象',
            entityId: '对象Id',
            files: '文件'
        },
        r: {
          owner: '所有者',
          manager: '管理员',
        }
    },
};

