
// 此对象所标识的外键关系不参与relation的路径判定，以减少relation的路径数量
export const IgnoredForeignKeyMap = {
    message: ['entity'],
    system: ['park'],
};

// 此对象所标识的路径不参与relation的路径判定，以减少relation的路径数量
export const IgnoredRelationPathMap = {
};

// 此对象所标识的entity的权限由其外键指向的父对象判定
export const DeducedRelationMap = {
    extraFile: 'entity',
}

export const SelectFreeEntities = ['application', 'area', 'mobile'];