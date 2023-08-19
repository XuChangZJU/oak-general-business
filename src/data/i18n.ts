// 本文件为自动编译产生，请勿直接修改

import { CreateOperationData as I18n } from "../oak-app-domain/I18n/Schema";
const i18ns: I18n[] = [
    {
        id: "ae2826a9f7a8f93c6619f05a9dfe6215",
        namespace: "oak-general-business-p-mobile-login",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/mobile/login",
        data: {
            "Login": "确定",
            "Send": "发送验证码",
            "placeholder": {
                "Captcha": "输入4位短信验证码",
                "Mobile": "请输入手机号"
            }
        }
    },
    {
        id: "e4d09f64c5d4d4218d56c253dc3d59ee",
        namespace: "oak-general-business-p-paper-detail",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/paper/detail",
        data: {
            "detail": "详情"
        }
    },
    {
        id: "a6ce9ec7ba519326a8c2cab09b1ced9b",
        namespace: "oak-general-business-p-paper-list",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/paper/list",
        data: {
            "action": {
                "add": "添加"
            }
        }
    },
    {
        id: "4f4219196fff9022b13d76ad3ea1eeec",
        namespace: "oak-general-business-p-paper-preview",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/paper/preview",
        data: {
            "detail": "预览"
        }
    },
    {
        id: "5554f702229f815805bda1840d6b339b",
        namespace: "oak-general-business-p-paper-upsert",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/paper/upsert",
        data: {
            "submit": "提交",
            "reset": "重置",
            "placeholder": {
                "author": "请输入作者",
                "title": "请在这里输入标题",
                "content": "从这里开始正文",
                "abstract": "选填，摘要会在订阅号消息、转发链接等文章外的场景显露，帮助读者快速了解内容，如不填写则默认抓取正文前54字"
            },
            "tips": {
                "content": "请先输入一段正文（或者标题），再点击保存按钮。"
            }
        }
    },
    {
        id: "ec290f3786755108eb9282414ee549b6",
        namespace: "oak-general-business-p-token-me",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/token/me",
        data: {
            "login": "登录",
            "syncWeChat": "同步微信信息"
        }
    },
    {
        id: "6d4c32af0d53a57033b31d37b8eff1ed",
        namespace: "oak-general-business-p-user-info",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/user/info",
        data: {
            "avatar": "头像",
            "mobile": "手机号",
            "password": "密码",
            "manage": "管理",
            "bind": "绑定",
            "syncWeChat": "同步微信信息",
            "send": "发送验证码",
            "cancel": "取消",
            "unbind": "解绑",
            "Mobile-Number-Verification": "手机号验证",
            "unbindingWechat": "确定解绑微信账号",
            "placeholder": {
                "Captcha": "输入4位短信验证码"
            }
        }
    },
    {
        id: "dd7bf7361f630ae8cc90f65bc33b8662",
        namespace: "oak-general-business-p-user-manage-detail",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/user/manage/detail",
        data: {
            "mobile": "手机号",
            "unset": "未设置"
        }
    },
    {
        id: "6528a94c33e1aa46aabd578a7222877a",
        namespace: "oak-general-business-p-userRelation-list",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/userRelation/list",
        data: {
            "confirmRevokeAll": "确认删除用户的所有权限吗？",
            "search": "搜索用户名"
        }
    },
    {
        id: "dbcbdc87418b58632e646b053968f99c",
        namespace: "oak-general-business-p-userRelation-upsert-byMobile",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/userRelation/upsert/byMobile",
        data: {
            "inputMobile": "请输入手机号查找"
        }
    },
    {
        id: "c007ed3c3ee704eb24ae3303af0eb64e",
        namespace: "oak-general-business-p-userRelation-upsert-byUserEntityGrant",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/userRelation/upsert/byUserEntityGrant",
        data: {
            "single": "单次",
            "unlimited": "不限",
            "restart": "重新生成",
            "chooseNumber": "请选择分享的目标人数",
            "chooseExpiresAt": "请选择有效时长",
            "expiresHelp": "支持分钟、小时选择",
            "shareCode": "请将二维码发给待分享权限的用户使用微信扫描",
            "unit": {
                "hour": "小时",
                "minute": "分钟"
            }
        }
    },
    {
        id: "b6ca5c32944603de336ebec4c402f28d",
        namespace: "oak-general-business-p-userRelation-upsert-onUser",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/userRelation/upsert/onUser",
        data: {
            "placeholder": {
                "name": "请输入姓名",
                "password": "密码不少于8位",
                "relation": "至少应选择一个权限"
            },
            "auth": "权限",
            "existedUser": "现有用户",
            "newUser": "新建用户"
        }
    },
    {
        id: "b39143cdead5b9d1def6790bd374f0dd",
        namespace: "oak-general-business-c-common-qrCode",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/components/common/qrCode",
        data: {
            "weChat-account-successfully-bound": "微信账号绑定成功",
            "weChat-authorization-login-successful": "微信授权登录成功"
        }
    },
    {
        id: "a46bf8e5a220d1fc8cdeb25a769e41e6",
        namespace: "oak-general-business-c-extraFile-forUrl",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/components/extraFile/forUrl",
        data: {
            "original": "从原文中选取",
            "url": "图片链接",
            "uploadLocalImg": "上传本地图片",
            "fillInImageLink": "填写图片链接",
            "chooseImage": "选择图片"
        }
    },
    {
        id: "939c04e984bac15864c2541cf2123123",
        namespace: "oak-general-business-c-extraFile-gallery",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/components/extraFile/gallery",
        data: {
            "waiting": "等待上传",
            "success": "上传成功",
            "uploading": "上传中"
        }
    },
    {
        id: "1fa5619676df365c0aaee6645e3c5ef1",
        namespace: "oak-general-business-c-my-info",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/components/my/info",
        data: {
            "login": "登录/注册",
            "unset": "未设置",
            "logout": "退出",
            "mobile": "手机号码",
            "moreThanOne": "多于一条手机号"
        }
    },
    {
        id: "bedcb9dbb3de06b80b582507b21b470d",
        namespace: "oak-general-business-c-user-login",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/components/user/login",
        data: {
            "Login": "登录",
            "Remember me": "记住账号",
            "inPassword": "账号登录",
            "inCaptcha": "手机号登录",
            "inQrCode": "扫码登录",
            "Send": "发送验证码",
            "placeholder": {
                "Captcha": "输入4位短信验证码",
                "Mobile": "请输入手机号",
                "Password": "请输入密码"
            },
            "resendAfter": "秒后可重发"
        }
    },
    {
        id: "491aa39ba7ec77e4c21d1b6ea6a648f9",
        namespace: "oak-general-business-c-wechatUser-unbindBtn",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/components/wechatUser/unbindBtn",
        data: {
            "unbind": "解绑",
            "unbindingWechat": "确定解绑该微信账号"
        }
    },
    {
        id: "e07ce685f0383e7f7f3ce86501567f28",
        namespace: "oak-general-business-l-common",
        language: "zh-CN",
        module: "oak-general-business",
        position: "locales/common",
        data: {
            "noData": "暂无数据",
            "areYouSure": "请确认",
            "action": {
                "create": "创建",
                "update": "更新",
                "delete": "删除",
                "remove": "删除",
                "confirm": "确定",
                "cancel": "取消",
                "grant": "授权",
                "revoke": "回收",
                "tip": "提示",
                "detail": "详情",
                "editor": "编辑",
                "newAdd": "新增",
                "add": "添加"
            },
            "reset": "重置",
            "select": "查询",
            "expand": "展开",
            "shrink": "收起",
            "back": "返回",
            "$$createAt$$": "创建时间",
            "$$updateAt$$": "更新时间",
            "$$deleteAt$$": "删除时间",
            "$$seq$$": "序号",
            "message": "消息",
            "more": "更多",
            "view": "查看",
            "scan": "扫一扫",
            "bind": "绑定",
            "true": "是",
            "false": "否"
        }
    }
];
export default i18ns;