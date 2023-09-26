import { String, Int, Text, Image, Float, Boolean } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
    origin: 'qiniu' | 'wechat' | 'unknown';
    type: 'image' | 'video' | 'audio' | 'file';
    bucket?: String<32>;                // 七牛用，其它cos可忽略
    objectId?: String<64>;              // 七牛用，其它cos可忽略
    tag1?: String<32>;
    tag2?: String<32>;
    filename: String<256>;
    md5?: Text;
    entity: String<32>;
    entityId: String<64>;
    extra1?: Text;
    extra2?: Object;
    extension?: String<16>;
    size?: Int<4>;
    sort?: Float<22, 10>;
    fileType?: String<128>;
    isBridge?: Boolean;
    uploadState: 'success' | 'failed' | 'uploading';
    uploadMeta?: Object;
};

const entityDesc: EntityDesc<Schema, '', '', {
    origin: Schema['origin'];
    type: Schema['type'];
    uploadState: Schema['uploadState'];
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
                extra2: '非结构化额外信息',
                extension: '后缀名',
                size: '文件大小',
                sort: '排序',
                fileType: '文件类型',
                isBridge: '是否桥接访问',
                uploadState: '上传状态',
                uploadMeta: '上传需要的metadata',
            },
            v: {
                origin: {
                    qiniu: '七牛云',
                    wechat: '微信',
                    unknown: '未知',
                },
                type: {
                    image: '图像',
                    video: '视频',
                    audio: '音频',
                    file: '文件',
                },
                uploadState: {
                    success: '上传成功',
                    failed: '上传失败',
                    uploading: '上传中',
                },
            },
        },
    }
};
