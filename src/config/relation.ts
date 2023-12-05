import { AuthDeduceRelationMap, SelectFreeEntities, UpdateFreeDict } from 'oak-domain/lib/types/Entity';
import { EntityDict } from '../oak-app-domain';

// 此对象所标识的entity的权限由其外键指向的父对象判定
export const authDeduceRelationMap: AuthDeduceRelationMap<EntityDict> = {
    extraFile: 'entity',
    message: 'entity',
    wechatQrCode: 'entity',
};

// 可以自由选择的对象
export const selectFreeEntities: SelectFreeEntities<EntityDict> = [
    'application',
    'domain',
    'area',
    'mobile',
    'wechatQrCode',
    'wechatLogin',
    'messageTypeTemplate',
    'articleMenu',
    'article',
    'userEntityGrant',
    'wechatMpJump',
];

// 可以自由更新的对象
export const updateFreeDict: UpdateFreeDict<EntityDict> = {
    userEntityGrant: ['claim'],
};