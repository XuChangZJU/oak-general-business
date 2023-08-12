import { String, Boolean } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as ExtraFile } from './ExtraFile';
export interface Schema extends EntityShape {
    name: String<32>;
    isArticle: Boolean;
    parent?: Schema;
    isLeaf: Boolean;
    entity: String<32>;
    entityId: String<64>;
    files?: Array<ExtraFile>;
}
