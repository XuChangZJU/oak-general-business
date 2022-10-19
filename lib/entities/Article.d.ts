import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as ExtraFile } from './ExtraFile';
export interface Schema extends EntityShape {
    entity?: String<32>;
    entityId?: String<64>;
    title: String<32>;
    author: String<32>;
    abstract?: Text;
    content?: Text;
    files: Array<ExtraFile>;
}
