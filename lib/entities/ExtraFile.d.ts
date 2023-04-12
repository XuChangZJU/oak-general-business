import { String, Int, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export interface Schema extends EntityShape {
    origin: 'qiniu' | 'unknown';
    type: 'image' | 'video' | 'audio' | 'file';
    bucket: String<16>;
    objectId: String<64>;
    tag1?: String<16>;
    tag2?: String<16>;
    filename: String<256>;
    md5?: Text;
    entity: String<32>;
    entityId: String<64>;
    extra1?: Text;
    extension: String<16>;
    size?: Int<4>;
    sort?: Int<4>;
    fileType: String<128>;
}
