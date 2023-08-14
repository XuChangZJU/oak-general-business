"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var i18ns = [
    {
        id: "0847fcee-2c29-43bc-a99d-8553d2fc0037",
        namespace: "oak-general-business-p-mobile-login",
        language: "zh_CN",
        module: "oak-general-business",
        position: "pages\\mobile\\login",
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
        id: "cc42fad1-0bc3-4762-9f13-73a3a6a140a2",
        namespace: "oak-general-business-p-paper-detail",
        language: "zh_CN",
        module: "oak-general-business",
        position: "pages\\paper\\detail",
        data: {
            "detail": "详情"
        }
    },
    {
        id: "ad39d7e6-183b-43de-8cf3-ee388260035c",
        namespace: "oak-general-business-p-paper-list",
        language: "zh_CN",
        module: "oak-general-business",
        position: "pages\\paper\\list",
        data: {
            "action": {
                "add": "添加"
            }
        }
    },
    {
        id: "1ceaa1a2-91f4-48a2-b9f7-045ef7c22bc4",
        namespace: "oak-general-business-p-paper-preview",
        language: "zh_CN",
        module: "oak-general-business",
        position: "pages\\paper\\preview",
        data: {
            "detail": "预览"
        }
    },
    {
        id: "ad1b09c9-337e-4d01-b170-dea2f684024d",
        namespace: "oak-general-business-p-paper-upsert",
        language: "zh_CN",
        module: "oak-general-business",
        position: "pages\\paper\\upsert",
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
        id: "e0c24a1a-1f9d-4513-a7ea-de4889f320cc",
        namespace: "oak-general-business-p-token-me",
        language: "zh_CN",
        module: "oak-general-business",
        position: "pages\\token\\me",
        data: {
            "login": "登录",
            "syncWeChat": "同步微信信息"
        }
    },
    {
        id: "76a965c5-40bb-45e3-ac89-58caa0e56d5b",
        namespace: "oak-general-business-p-user-info",
        language: "zh_CN",
        module: "oak-general-business",
        position: "pages\\user\\info",
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
        id: "4052589d-c5f3-4154-81c7-ae087ac565f4",
        namespace: "oak-general-business-p-user-manage-detail",
        language: "zh_CN",
        module: "oak-general-business",
        position: "pages\\user\\manage\\detail",
        data: {
            "mobile": "手机号",
            "unset": "未设置"
        }
    },
    {
        id: "cf4134ca-94e6-4cdb-9211-178a7fc6a897",
        namespace: "oak-general-business-p-userRelation-list",
        language: "zh_CN",
        module: "oak-general-business",
        position: "pages\\userRelation\\list",
        data: {
            "confirmRevokeAll": "确认删除用户的所有权限吗？",
            "search": "搜索用户名"
        }
    },
    {
        id: "1c012491-4a8c-4d83-9021-fdfb93e7069f",
        namespace: "oak-general-business-p-userRelation-upsert-byMobile",
        language: "zh_CN",
        module: "oak-general-business",
        position: "pages\\userRelation\\upsert\\byMobile",
        data: {
            "inputMobile": "请输入手机号查找"
        }
    },
    {
        id: "6ab6c256-428b-4f1c-bd64-1588b05534fe",
        namespace: "oak-general-business-p-userRelation-upsert-byUserEntityGrant",
        language: "zh_CN",
        module: "oak-general-business",
        position: "pages\\userRelation\\upsert\\byUserEntityGrant",
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
        id: "94787da9-99b7-4550-86c1-10fd14d83841",
        namespace: "oak-general-business-p-userRelation-upsert-onUser",
        language: "zh_CN",
        module: "oak-general-business",
        position: "pages\\userRelation\\upsert\\onUser",
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
        id: "15018a30-b711-4cbe-91fa-dd818cfc6403",
        namespace: "oak-general-business-c-common-qrCode",
        language: "zh_CN",
        module: "oak-general-business",
        position: "components\\common\\qrCode",
        data: {
            "weChat-account-successfully-bound": "微信账号绑定成功",
            "weChat-authorization-login-successful": "微信授权登录成功"
        }
    },
    {
        id: "88f40686-aa42-443d-9085-7f2036322024",
        namespace: "oak-general-business-c-extraFile-forUrl",
        language: "zh_CN",
        module: "oak-general-business",
        position: "components\\extraFile\\forUrl",
        data: {
            "original": "从原文中选取",
            "url": "图片链接",
            "uploadLocalImg": "上传本地图片",
            "fillInImageLink": "填写图片链接",
            "chooseImage": "选择图片"
        }
    },
    {
        id: "5b25a288-7748-450a-9738-909a7957b958",
        namespace: "oak-general-business-c-extraFile-gallery",
        language: "zh_CN",
        module: "oak-general-business",
        position: "components\\extraFile\\gallery",
        data: {
            "waiting": "等待上传",
            "success": "上传成功",
            "uploading": "上传中"
        }
    },
    {
        id: "cda71e7d-91a4-448e-b5be-8077a17b71f5",
        namespace: "oak-general-business-c-my-info",
        language: "zh_CN",
        module: "oak-general-business",
        position: "components\\my\\info",
        data: {
            "login": "登录/注册",
            "unset": "未设置",
            "logout": "退出",
            "mobile": "手机号码",
            "moreThanOne": "多于一条手机号"
        }
    },
    {
        id: "df071449-3850-416a-a765-dafac92a0616",
        namespace: "oak-general-business-c-user-login",
        language: "zh_CN",
        module: "oak-general-business",
        position: "components\\user\\login",
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
        id: "a216fa43-f85f-4ff3-800d-b09f650ff5c5",
        namespace: "oak-general-business-c-wechatUser-unbindBtn",
        language: "zh_CN",
        module: "oak-general-business",
        position: "components\\wechatUser\\unbindBtn",
        data: {
            "unbind": "解绑",
            "unbindingWechat": "确定解绑该微信账号"
        }
    },
    {
        id: "d740c333-cdb2-4176-bcf5-02a04b52dadc",
        namespace: "oak-general-business-l-common",
        language: "zh_CN",
        module: "oak-general-business",
        position: "locales\\common",
        data: {
            "ptrActivate": "松开刷新",
            "ptrDeactivate": "下拉刷新",
            "ptrRelease": "正在刷新...",
            "ptrFinish": "刷新完成",
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
