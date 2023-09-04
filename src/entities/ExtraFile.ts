import { String, Int, Text, Image, Float, Boolean } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    origin: 'qiniu' | 'unknown';
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
    uploaded: Boolean;
};

const entityDesc: EntityDesc<Schema, '', '', {
    origin: Schema['origin'];
    type: Schema['type'];
}> = {
    locales: {
        zh_CN: {
            name: '文件',
            attr: {
                origin: '源',
                type: '类型',
                bucket: '桶',
                objectId: '对象编号',
                tag1: '标签一',
                tag2: '标签二',
                filename: '文件名',
                md5: 'md5',
                entity: '关联对象',
                entityId: '关联对象id',
                extra1: '额外信息',
                extension: '后缀名',
                size: '文件大小',
                sort: '排序',
                fileType: '文件类型',
                isBridge: '是否桥接访问',
                uploaded: '是否上传成功',
            },
            v: {
                origin: {
                    qiniu: '七牛云',
                    unknown: '未知',
                },
                type: {
                    image: '图像',
                    video: '视频',
                    audio: '音频',
                    file: '文件',
                },
            },
        },
    }
};
