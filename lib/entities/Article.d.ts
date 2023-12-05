import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as ExtraFile } from './ExtraFile';
import { Schema as ArticleMenu } from './ArticleMenu';
export interface Schema extends EntityShape {
    name: String<32>;
    content: Text;
    articleMenu: ArticleMenu;
    files?: Array<ExtraFile>;
}
