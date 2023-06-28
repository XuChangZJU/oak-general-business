import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as ArticleMenu } from './ArticleMenu';
import { Schema as ExtraFile } from './ExtraFile';
export interface Schema extends EntityShape {
    name: String<32>;
    content: Text;
    articleMenu: ArticleMenu;
    entity: String<32>;
    entityId: String<64>;
    files?: Array<ExtraFile>;
}
