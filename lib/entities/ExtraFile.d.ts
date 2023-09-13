import { String, Int, Text, Float, Boolean } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export interface Schema extends EntityShape {
    origin: 'qiniu' | 'wechat' | 'unknown';
    type: 'image' | 'video' | 'audio' | 'file';
    bucket: String<16>;
    objectId: String<64>;
    tag1?: String<32>;
    tag2?: String<32>;
    filename: String<256>;
    md5?: Text;
    entity: String<32>;
    entityId: String<64>;
    extra1?: Text;
    extension?: String<16>;
    size?: Int<4>;
    sort?: Float<22, 10>;
    fileType?: String<128>;
    isBridge?: Boolean;
    uploaded?: Boolean;
    uploadMeta?: Object;
}
