import {
    String,
    Float,
    Int,
    Boolean,
    Datetime,
} from 'oak-domain/lib/types/DataType';
import { ActionDef } from 'oak-domain/lib/types/Action';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';

export interface Schema extends EntityShape {
    title: String<32>; // 直播间名称
    streamTitle: String<32>; // 直播流名称
    liveonly: 'online' | 'offline'; // 是否正在直播
    hub: String<32>; // 所属直播空间名称
    streamKey: String<64>; // 串流密钥 不是publishkey，这个在七牛云没有保存到这里
    entity: String<32>;
    entityId: String<64>;
    rtmpPushUrl: String<64>;
    rtmpPlayUrl: String<64>;
    pcPushUrl: String<64>; // pc的推流地址
    expireAt: Datetime; // 推流地址过期时间
}


const locale: LocaleDef<
    Schema,
    '',
    '',
    {
        liveonly: Schema['liveonly'];
    }
> = {
    zh_CN: {
        attr: {
            title: '名称', // 用户定义直播间名称,
            streamTitle: '直播流名称',
            liveonly: '活跃状态',
            hub: '直播空间名称', // 所属直播空间名称
            entity: '所属实体',
            entityId: '所属实体id',
            rtmpPushUrl: '推流地址',
            rtmpPlayUrl: '播放地址',
            expireAt: '推流过期时间',
            pcPushUrl: 'OBS推流地址',
            streamKey: 'OBS串流密钥'
        },
        v: {
            liveonly: {
                online: '在线',
                offline: '下线',
            },
        },
    },
};
