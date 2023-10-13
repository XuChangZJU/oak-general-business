;
const IdActionDef = {
    stm: {
        verify: ['unverified', 'verifying'],
        accept: [['unverified', 'verifying'], 'verified'],
        reject: [['verifying', 'verified'], 'unverified'],
    },
    is: 'unverified',
};
const UserActionDef = {
    stm: {
        activate: ['shadow', 'normal'],
        disable: [['normal', 'shadow'], 'disabled'],
        enable: ['disabled', 'normal'],
        mergeTo: [['normal', 'shadow'], 'merged'],
        mergeFrom: ['normal', 'normal'],
    },
};
const entityDesc = {
    locales: {
        "zh_CN": {
            name: '用户',
            attr: {
                name: '姓名',
                nickname: '昵称',
                birth: '生日',
                password: '密码',
                passwordSha1: 'sha1加密密码',
                gender: '性别',
                idCardType: '证件类型',
                idNumber: '证件号码',
                ref: '指向用户',
                files: '相关文件',
                userState: '用户状态',
                idState: '身份验证状态',
                codes: '微信分享二维码',
                isRoot: '是否超级用户',
                addresses: '收货地址',
            },
            action: {
                activate: '激活',
                accept: '同意',
                verify: '验证',
                reject: '拒绝',
                enable: '启用',
                disable: '禁用',
                mergeTo: '合并',
                mergeFrom: '使合并',
            },
            v: {
                userState: {
                    shadow: '未激活',
                    normal: '正常',
                    disabled: '禁用',
                    merged: '已被合并',
                },
                idState: {
                    unverified: '未验证',
                    verifying: '验证中',
                    verified: '已验证',
                },
                gender: {
                    male: '男',
                    female: '女',
                },
                idCardType: {
                    "ID-Card": '身份证',
                    passport: '护照',
                    "Mainland-passport": '港澳台通行证',
                },
            }
        }
    },
    indexes: [
        {
            name: 'index_birth',
            attributes: [
                {
                    name: 'birth',
                    direction: 'ASC',
                },
            ],
        },
        {
            name: 'index_fulltext',
            attributes: [
                {
                    name: 'name',
                },
                {
                    name: 'nickname',
                }
            ],
            config: {
                type: 'fulltext',
                parser: 'ngram',
            }
        },
        {
            name: 'index_userState_refId',
            attributes: [
                {
                    name: 'userState',
                },
                {
                    name: 'ref',
                }
            ]
        },
    ]
};
export {};
