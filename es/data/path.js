const paths = [
    {
        id: 'msg-user',
        sourceEntity: 'user',
        destEntity: 'message',
        value: 'user',
        recursive: false,
    },
    {
        id: 'mobile-user',
        sourceEntity: 'user',
        destEntity: 'mobile',
        value: 'user',
        recursive: false,
    },
    {
        id: 'token-user',
        sourceEntity: 'user',
        destEntity: 'token',
        value: 'user',
        recursive: false,
    },
    {
        id: 'wchL-user',
        sourceEntity: 'user',
        destEntity: 'wechatLogin',
        value: 'user',
        recursive: false,
    },
    {
        id: 'wchU-user',
        sourceEntity: 'user',
        destEntity: 'wechatUser',
        value: 'user',
        recursive: false,
    },
    {
        id: 'pwdCT-user',
        sourceEntity: 'user',
        destEntity: 'passwordChangeTemp',
        value: 'user',
        recursive: false,
    },
    {
        id: 'uec-user',
        sourceEntity: 'user',
        destEntity: 'userEntityClaim',
        value: 'user',
        recursive: false,
    },
];
export default paths;
