
// 此对象所标识的外键关系不参与relation的路径判定，以减少relation的路径数量
export const IgnoredForeignKeyMap = {
    system: ['park'],
    messageSystem: ['message'],
    notification: ['messsageSystem'],
};

// 此对象所标识的路径不参与relation的路径判定，以减少relation的路径数量
export const IgnoredRelationPathMap = {
    token: ['wechatUser.application'],
};

// 此对象所标识的entity的权限由其外键指向的父对象判定
export const DeducedRelationMap = {
    extraFile: 'entity',
    message: 'entity',
    userEntityGrant: 'entity',
    wechatQrCode: 'entity',
};

export const SelectFreeEntities = ['application', 'area', 'mobile', 'wechatQrCode'];