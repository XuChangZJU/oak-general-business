"use strict";
// 本文件为自动编译产生，请勿直接修改
Object.defineProperty(exports, "__esModule", { value: true });
var i18ns = [
    {
        id: "8e56267d-a60d-4800-97d5-d1d128d7b912",
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
        id: "3cf4f0ce-7a44-4b3f-92cf-824c6e4ea06e",
        namespace: "oak-general-business-p-paper-detail",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/paper/detail",
        data: {
            "detail": "详情"
        }
    },
    {
        id: "78f961a0-9d71-4334-b1b6-9aadc5ca88df",
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
        id: "1e10d1c3-3226-465c-9c52-600285dc97c7",
        namespace: "oak-general-business-p-paper-preview",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/paper/preview",
        data: {
            "detail": "预览"
        }
    },
    {
        id: "411a51aa-b6dc-4bcd-be4e-d5fea4388c80",
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
        id: "4a4cf1b2-1707-46ac-8ad4-b2520f7fab55",
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
        id: "35036a6e-de68-434c-b729-6ab941c6b16e",
        namespace: "oak-general-business-p-user-info",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/user/info",
        data: {
            "avatar": "头像",
            "mobile": "手机号",
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
        id: "9c1710b5-815e-47c6-9b2b-c87652c62b11",
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
        id: "d0cd612e-5a0d-4aa6-86ac-a8e1f496fd2b",
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
        id: "061dac54-b1bc-4d9e-91b6-5cea73e6ee04",
        namespace: "oak-general-business-p-userRelation-upsert-byMobile",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src/pages/userRelation/upsert/byMobile",
        data: {
            "inputMobile": "请输入手机号查找"
        }
    },
    {
        id: "ed6760b4-36a8-4749-aff6-5124b402b125",
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
        id: "54180db9-dcb1-448b-b0e1-be78bbc8531c",
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
        id: "0b5949b9-3bc7-4714-9258-b043c6f2cbd2",
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
        id: "89516485-a95b-44d6-8484-ed37248f9bc2",
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
        id: "9dc6a926-ebea-4f93-b3ff-c06e8592ea64",
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
        id: "25ec03aa-cbf6-4e2a-a78c-9d27e9aafcf1",
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
        id: "62ae7899-7210-4f01-aa7e-88b983feeb86",
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
        id: "535d8ac8-1bf4-4878-b28c-5048c76c0872",
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
        id: "45d88f0d-91ea-4121-8e25-8ee115161642",
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
exports.default = i18ns;
