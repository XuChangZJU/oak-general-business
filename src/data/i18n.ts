// 本文件为自动编译产生，请勿直接修改

import { CreateOperationData as I18n } from "../oak-app-domain/I18n/Schema";
const i18ns: I18n[] = [
    {
        id: "9d670f30-1b02-4bc3-b6bd-cb19078161f2",
        namespace: "oak-general-business-p-mobile-login",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\pages\\mobile\\login",
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
        id: "e85a361e-7401-427f-8c82-4ba01bcd123f",
        namespace: "oak-general-business-p-paper-detail",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\pages\\paper\\detail",
        data: {
            "detail": "详情"
        }
    },
    {
        id: "0108e0ef-c972-43cc-873b-c0f411d053a0",
        namespace: "oak-general-business-p-paper-list",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\pages\\paper\\list",
        data: {
            "action": {
                "add": "添加"
            }
        }
    },
    {
        id: "fdb333f4-afd1-456c-b001-80c7a4ec2d1f",
        namespace: "oak-general-business-p-paper-preview",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\pages\\paper\\preview",
        data: {
            "detail": "预览"
        }
    },
    {
        id: "00eb8ffa-4a52-4492-8b70-110ee8de9a46",
        namespace: "oak-general-business-p-paper-upsert",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\pages\\paper\\upsert",
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
        id: "9e51835f-5293-483b-9946-0392718b12c5",
        namespace: "oak-general-business-p-token-me",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\pages\\token\\me",
        data: {
            "login": "登录",
            "syncWeChat": "同步微信信息"
        }
    },
    {
        id: "fdf100bb-f3d1-45fc-b086-e3556506a575",
        namespace: "oak-general-business-p-user-info",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\pages\\user\\info",
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
        id: "00f1b032-6663-4abc-b4ac-e4d9cfb0ae44",
        namespace: "oak-general-business-p-user-manage-detail",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\pages\\user\\manage\\detail",
        data: {
            "mobile": "手机号",
            "unset": "未设置"
        }
    },
    {
        id: "56a1d00c-f668-45ee-904c-da09cc26d506",
        namespace: "oak-general-business-p-userRelation-list",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\pages\\userRelation\\list",
        data: {
            "confirmRevokeAll": "确认删除用户的所有权限吗？",
            "search": "搜索用户名"
        }
    },
    {
        id: "cba98c2e-1392-457e-bdaf-96be1262fcc6",
        namespace: "oak-general-business-p-userRelation-upsert-byMobile",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\pages\\userRelation\\upsert\\byMobile",
        data: {
            "inputMobile": "请输入手机号查找"
        }
    },
    {
        id: "703a12d7-6f85-43e7-9464-e00c2ab705ec",
        namespace: "oak-general-business-p-userRelation-upsert-byUserEntityGrant",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\pages\\userRelation\\upsert\\byUserEntityGrant",
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
        id: "388a7718-6412-4a96-845d-7625c1af48ef",
        namespace: "oak-general-business-p-userRelation-upsert-onUser",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\pages\\userRelation\\upsert\\onUser",
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
        id: "8c0d1155-20c2-4f10-8714-9d8c4f5fcf08",
        namespace: "oak-general-business-c-common-qrCode",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\components\\common\\qrCode",
        data: {
            "weChat-account-successfully-bound": "微信账号绑定成功",
            "weChat-authorization-login-successful": "微信授权登录成功"
        }
    },
    {
        id: "3f544d34-3592-42c3-ade0-8dd26129f01d",
        namespace: "oak-general-business-c-extraFile-forUrl",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\components\\extraFile\\forUrl",
        data: {
            "original": "从原文中选取",
            "url": "图片链接",
            "uploadLocalImg": "上传本地图片",
            "fillInImageLink": "填写图片链接",
            "chooseImage": "选择图片"
        }
    },
    {
        id: "2ba1fb81-1ae6-4cf2-a470-8bd2da44d0ae",
        namespace: "oak-general-business-c-extraFile-gallery",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\components\\extraFile\\gallery",
        data: {
            "waiting": "等待上传",
            "success": "上传成功",
            "uploading": "上传中"
        }
    },
    {
        id: "71647f57-53d6-447d-9d12-8a482afa64e7",
        namespace: "oak-general-business-c-my-info",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\components\\my\\info",
        data: {
            "login": "登录/注册",
            "unset": "未设置",
            "logout": "退出",
            "mobile": "手机号码",
            "moreThanOne": "多于一条手机号"
        }
    },
    {
        id: "f266b371-f043-4ad8-b72d-fd43339172e4",
        namespace: "oak-general-business-c-user-login",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\components\\user\\login",
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
        id: "3d36a832-106d-4e05-98f4-1ca0b3c40df4",
        namespace: "oak-general-business-c-wechatUser-unbindBtn",
        language: "zh-CN",
        module: "oak-general-business",
        position: "src\\components\\wechatUser\\unbindBtn",
        data: {
            "unbind": "解绑",
            "unbindingWechat": "确定解绑该微信账号"
        }
    },
    {
        id: "f11e3d06-f112-4e47-bc69-4d1e9bab9944",
        namespace: "oak-general-business-l-common",
        language: "zh-CN",
        module: "oak-general-business",
        position: "locales\\common",
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