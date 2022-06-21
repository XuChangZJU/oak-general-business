import { String, Int, Datetime, Image, Boolean } from 'oak-domain/lib/types/DataType';
import { Schema as User } from './User';
import { Schema as Application } from './Application';
import { AbleAction, makeAbleActionDef } from 'oak-domain/lib/actions/action';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { LocaleDef } from 'oak-domain/lib/types/Locale';
// https://developers.weixin.qq.com/miniprogram/dev/api/base/system/wx.getSystemInfoSync.html
export type WechatMpEnv = {
    type: 'wechatMp',
    brand: string;          // 设备品牌
    model: string;          // 设备型号
    pixelRatio: number;     // 设备像素比
    screenWidth: number;    // 屏幕宽度
    screenHeight: number;   // 屏幕高度
    windowWidth: number;    // 窗口宽度
    windowHeight: number;   // 窗口高度
    statusBarHeight: number;    // 状态栏高度
    language: string;       // 语言
    version: string;        // 微信版本号
    system: string;         // 操作系统及版本
    platform: string;       // 平台
    fontSizeSetting: number;    // 字体大小
    SDKVersion: string;     // 基础库版本
};


export type WebEnv = {
    type: 'web',
};

export type ServerEnv = {
    type: 'server',
}

export type Environment = WechatMpEnv | WebEnv | ServerEnv;

export interface Schema extends EntityShape {
    application?: Application;
    entity: String<32>;
    entityId: String<64>;
    user?: User;
    player?: User;
    env: Environment;
};

type Action = AbleAction;

const AbleActionDef = makeAbleActionDef('enabled');


const locale: LocaleDef<Schema, Action, '', {}> = {
    zh_CN: {
        attr: {
            application: '应用',
            entity: '关联对象',
            entityId: '关联对象id',
            user: '用户',
            player: '扮演者',
            env: '环境',
        },
        action: {
            enable: '激活',
            disable: '禁用',
        }
    },
 };
