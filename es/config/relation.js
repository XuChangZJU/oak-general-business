// 此对象所标识的entity的权限由其外键指向的父对象判定
export const authDeduceRelationMap = {
    extraFile: 'entity',
    message: 'entity',
    wechatQrCode: 'entity',
};
// 可以自由选择的对象
export const selectFreeEntities = [
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
];
// 可以自由更新的对象
export const updateFreeDict = {
    userEntityGrant: ['claim'],
};
