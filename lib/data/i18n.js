"use strict";
// 本文件为自动编译产生，请勿直接修改
Object.defineProperty(exports, "__esModule", { value: true });
const i18ns = [
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
        id: "a85ac2eff2d138152ef083e37c2b366c",
        namespace: "oak-general-business-p-paper-detail",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/paper/detail",
        data: {
            "detail": "详情"
        }
    },
    {
        id: "e3c5e1767a1ad30ddf15adeb43a5fbab",
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
        id: "99445bede532d740b807f2eda058daac",
        namespace: "oak-general-business-p-paper-preview",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/paper/preview",
        data: {
            "detail": "预览"
        }
    },
    {
        id: "65186dcd507e2a8b0bfe0f6f8e9e98e4",
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
        id: "2a0f8b18e08c3f7b82353d16b6ba4651",
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
        id: "b40594f173c7c593719746c2f63ca126",
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
        id: "75a707a016ee5fc0574e16507270753d",
        namespace: "oak-general-business-p-user-manage-detail",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/user/manage/detail",
        data: {
            "mobile": "手机号",
            "unset": "未设置",
            "avatar": "头像"
        }
    },
    {
        id: "ce120594bf9738e2092b3c7bf4da71e9",
        namespace: "oak-general-business-p-wechatUser-login",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/wechatUser/login",
        data: {
            "missingCodeParameter": "缺少code参数",
            "weChatLoginFailed": "微信登录失败"
        }
    },
    {
        id: "d790bd454c420a031bbde799c83bbe71",
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
        id: "d294bc3cfdc260f1bcc6b96b4b9b49b0",
        namespace: "oak-general-business-c-extraFile-commit",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/components/extraFile/commit",
        data: {
            "executing": "%{text}中...",
            "upload": "上传",
            "uploading": "上传中"
        }
    },
    {
        id: "5c2e6feed554bc476664f2a80e09677b",
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
        id: "acdf0445bef1374155f23a9c59e6dd40",
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
        id: "a0e4461f6283d6ecd0b6bba64c0560c2",
        namespace: "oak-general-business-c-extraFile-upload",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/components/extraFile/upload",
        data: {
            "choosePicture": "请选择图片",
            "chooseFile": "请选择文件"
        }
    },
    {
        id: "7ab2802526051f5926338d25cf7f3824",
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
        id: "31967b6cdd8488887e7d2f39fe166458",
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
        id: "24dd3b76e3461bdc74adc6e6d40c5091",
        namespace: "oak-general-business-c-userRelation-list",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/components/userRelation/list",
        data: {
            "confirmRevokeAll": "确认删除用户的所有权限吗？",
            "search": "搜索用户名"
        }
    },
    {
        id: "ac10f5eca5efaddcd42b5c94e9cda34e",
        namespace: "oak-general-business-c-userRelation-upsert-byMobile",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/components/userRelation/upsert/byMobile",
        data: {
            "inputMobile": "请输入手机号查找"
        }
    },
    {
        id: "2ae0261640d791c7dcc61d71bec70788",
        namespace: "oak-general-business-c-userRelation-upsert-byUserEntityGrant",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/components/userRelation/upsert/byUserEntityGrant",
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
        id: "724a46f659f9bfa42239b79e59761f0e",
        namespace: "oak-general-business-c-userRelation-upsert-onUser",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/components/userRelation/upsert/onUser",
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
        id: "ce2ef5c2ef3c6b4bf1682c5610f0da28",
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
        id: "65801f60e3c6d0197f2f0a44a794ccf7",
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
            "false": "否",
            "open": "开",
            "close": "关"
        }
    }
];
exports.default = i18ns;
