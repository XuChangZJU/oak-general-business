import { String, Text, Datetime, Boolean, Uint } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Application } from './Application';
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';


type content = {
    text?: string,
    mediaId?: string,
    title?: string,
    description?: string,
};

export interface Schema extends EntityShape {
    content: content;
    application: Application;
    type: 'text' | 'image' | 'video' | 'voice';
    event: 'subscribe' | 'unsubscribe' | 'keyword' | 'auto';
};

const entityDesc: EntityDesc<Schema> = {
    locales: {
        zh_CN: {
            name: '微信公众号自动回复',
            attr: {
                content: '回复内容',
                application: '关联应用',
                type: '类型',
                event: '自动回复事件',
            },
            v: {
                type: {
                    text: '文本类型',
                    image: '图片类型',
                    video: '视频类型',
                    voice: '音频类型',
                },
                event: {
                    subscribe: '订阅后回复',
                    unsubscribe: '取消订阅后回复',
                    keyword: '关键词回复',
                    auto: '收到消息回复',
                }
            }
        },
     },
};

