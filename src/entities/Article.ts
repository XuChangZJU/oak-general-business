import { String, Float, Text } from 'oak-domain/lib/types/DataType';
import { ActionDef } from 'oak-domain/lib/types/Action';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as ExtraFile } from './ExtraFile';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';
import { Schema as ArticleMenu } from './ArticleMenu';
export interface Schema extends EntityShape {
  name: String<32>; //标题名称
  content: Text; //文章内容
  articleMenu: ArticleMenu; //文章菜单
  files?: Array<ExtraFile>; 
}

const entityDesc: EntityDesc<Schema> = {
    locales: {
        zh_CN: {
            name: '文章',
            attr: {
                name: '文章标题',
                content: '请输入正文内容',
                articleMenu: '文章菜单',
                files: '文件'
            },
        },
    },
};

