const a = `import { CreateOperationData as I18n } from "../oak-app-domain/I18n/Schema";
const i18ns: I18n[] = [
    {
        id: "8a21419f-2bf5-4050-aee2-571f0c1070f1",
        namespace: "oak-general-business-p-mobile-login",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\pages\\mobile\\login\\locales\\zh_CN.json",
        data: {
            "Login": "\u786E\u5B9A",
            "Send": "\u53D1\u9001\u9A8C\u8BC1\u7801",
            "placeholder": {
                "Captcha": "\u8F93\u51654\u4F4D\u77ED\u4FE1\u9A8C\u8BC1\u7801",
                "Mobile": "\u8BF7\u8F93\u5165\u624B\u673A\u53F7"
            }
        }
    },
    {
        id: "5051b1c9-daaf-44a3-8a6a-3153b64fa259",
        namespace: "oak-general-business-p-paper-detail",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\pages\\paper\\detail\\locales\\zh_CN.json",
        data: {
            "detail": "\u8BE6\u60C5"
        }
    },
    {
        id: "2322a013-f94f-4fa7-a5a6-7d69f09d63ca",
        namespace: "oak-general-business-p-paper-list",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\pages\\paper\\list\\locales\\zh_CN.json",
        data: {
            "action": {
                "add": "\u6DFB\u52A0"
            }
        }
    },
    {
        id: "51bb1252-6a76-45ed-93a1-014f1909374c",
        namespace: "oak-general-business-p-paper-preview",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\pages\\paper\\preview\\locales\\zh_CN.json",
        data: {
            "detail": "\u9884\u89C8"
        }
    },
    {
        id: "d775a296-848f-4549-93fd-1fcd25e7dea9",
        namespace: "oak-general-business-p-paper-upsert",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\pages\\paper\\upsert\\locales\\zh_CN.json",
        data: {
            "submit": "\u63D0\u4EA4",
            "reset": "\u91CD\u7F6E",
            "placeholder": {
                "author": "\u8BF7\u8F93\u5165\u4F5C\u8005",
                "title": "\u8BF7\u5728\u8FD9\u91CC\u8F93\u5165\u6807\u9898",
                "content": "\u4ECE\u8FD9\u91CC\u5F00\u59CB\u6B63\u6587",
                "abstract": "\u9009\u586B\uFF0C\u6458\u8981\u4F1A\u5728\u8BA2\u9605\u53F7\u6D88\u606F\u3001\u8F6C\u53D1\u94FE\u63A5\u7B49\u6587\u7AE0\u5916\u7684\u573A\u666F\u663E\u9732\uFF0C\u5E2E\u52A9\u8BFB\u8005\u5FEB\u901F\u4E86\u89E3\u5185\u5BB9\uFF0C\u5982\u4E0D\u586B\u5199\u5219\u9ED8\u8BA4\u6293\u53D6\u6B63\u6587\u524D54\u5B57"
            },
            "tips": {
                "content": "\u8BF7\u5148\u8F93\u5165\u4E00\u6BB5\u6B63\u6587\uFF08\u6216\u8005\u6807\u9898\uFF09\uFF0C\u518D\u70B9\u51FB\u4FDD\u5B58\u6309\u94AE\u3002"
            }
        }
    },
    {
        id: "d50994be-f285-4305-af75-b384270620e9",
        namespace: "oak-general-business-p-token-me",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\pages\\token\\me\\locales\\zh_CN.json",
        data: {
            "login": "\u767B\u5F55",
            "syncWeChat": "\u540C\u6B65\u5FAE\u4FE1\u4FE1\u606F"
        }
    },
    {
        id: "249b0a44-72d6-4d91-b166-fb6329a922ce",
        namespace: "oak-general-business-p-user-info",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\pages\\user\\info\\locales\\zh_CN.json",
        data: {
            "avatar": "\u5934\u50CF",
            "mobile": "\u624B\u673A\u53F7",
            "manage": "\u7BA1\u7406",
            "bind": "\u7ED1\u5B9A",
            "syncWeChat": "\u540C\u6B65\u5FAE\u4FE1\u4FE1\u606F",
            "send": "\u53D1\u9001\u9A8C\u8BC1\u7801",
            "cancel": "\u53D6\u6D88",
            "unbind": "\u89E3\u7ED1",
            "Mobile-Number-Verification": "\u624B\u673A\u53F7\u9A8C\u8BC1",
            "unbindingWechat": "\u786E\u5B9A\u89E3\u7ED1\u5FAE\u4FE1\u8D26\u53F7",
            "placeholder": {
                "Captcha": "\u8F93\u51654\u4F4D\u77ED\u4FE1\u9A8C\u8BC1\u7801"
            }
        }
    },
    {
        id: "f2fa45ea-31a0-4c5c-a9a7-b6c09c08fbf9",
        namespace: "oak-general-business-p-user-manage-detail",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\pages\\user\\manage\\detail\\locales\\zh_CN.json",
        data: {
            "mobile": "\u624B\u673A\u53F7",
            "unset": "\u672A\u8BBE\u7F6E"
        }
    },
    {
        id: "82a000b9-2325-45da-a505-0fcf37676273",
        namespace: "oak-general-business-p-userRelation-list",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\pages\\userRelation\\list\\locales\\zh_CN.json",
        data: {
            "confirmRevokeAll": "\u786E\u8BA4\u5220\u9664\u7528\u6237\u7684\u6240\u6709\u6743\u9650\u5417\uFF1F",
            "search": "\u641C\u7D22\u7528\u6237\u540D"
        }
    },
    {
        id: "c2c47b9c-336a-4422-a1e0-7586ba93a25b",
        namespace: "oak-general-business-p-userRelation-upsert-byMobile",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\pages\\userRelation\\upsert\\byMobile\\locales\\zh_CN.json",
        data: {
            "inputMobile": "\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u67E5\u627E"
        }
    },
    {
        id: "ca9da17d-b64b-420a-a757-ecadcf42b66f",
        namespace: "oak-general-business-p-userRelation-upsert-byUserEntityGrant",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\pages\\userRelation\\upsert\\byUserEntityGrant\\locales\\zh_CN.json",
        data: {
            "single": "\u5355\u6B21",
            "unlimited": "\u4E0D\u9650",
            "restart": "\u91CD\u65B0\u751F\u6210",
            "chooseNumber": "\u8BF7\u9009\u62E9\u5206\u4EAB\u7684\u76EE\u6807\u4EBA\u6570",
            "chooseExpiresAt": "\u8BF7\u9009\u62E9\u6709\u6548\u65F6\u957F",
            "expiresHelp": "\u652F\u6301\u5206\u949F\u3001\u5C0F\u65F6\u9009\u62E9",
            "shareCode": "\u8BF7\u5C06\u4E8C\u7EF4\u7801\u53D1\u7ED9\u5F85\u5206\u4EAB\u6743\u9650\u7684\u7528\u6237\u4F7F\u7528\u5FAE\u4FE1\u626B\u63CF",
            "unit": {
                "hour": "\u5C0F\u65F6",
                "minute": "\u5206\u949F"
            }
        }
    },
    {
        id: "7557e788-a6c3-46b0-90f4-01f0f4132a91",
        namespace: "oak-general-business-p-userRelation-upsert-onUser",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\pages\\userRelation\\upsert\\onUser\\locales\\zh_CN.json",
        data: {
            "placeholder": {
                "name": "\u8BF7\u8F93\u5165\u59D3\u540D",
                "password": "\u5BC6\u7801\u4E0D\u5C11\u4E8E8\u4F4D",
                "relation": "\u81F3\u5C11\u5E94\u9009\u62E9\u4E00\u4E2A\u6743\u9650"
            },
            "auth": "\u6743\u9650",
            "existedUser": "\u73B0\u6709\u7528\u6237",
            "newUser": "\u65B0\u5EFA\u7528\u6237"
        }
    },
    {
        id: "41be2a40-0ee6-44fe-a587-bdd1e23bf936",
        namespace: "oak-general-business-c-common-qrCode",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\components\\common\\qrCode\\locales\\zh_CN.json",
        data: {
            "weChat-account-successfully-bound": "\u5FAE\u4FE1\u8D26\u53F7\u7ED1\u5B9A\u6210\u529F",
            "weChat-authorization-login-successful": "\u5FAE\u4FE1\u6388\u6743\u767B\u5F55\u6210\u529F"
        }
    },
    {
        id: "f3d7d7dc-11cc-4319-80d2-d3ace3287d2e",
        namespace: "oak-general-business-c-extraFile-forUrl",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\components\\extraFile\\forUrl\\locales\\zh_CN.json",
        data: {
            "original": "\u4ECE\u539F\u6587\u4E2D\u9009\u53D6",
            "url": "\u56FE\u7247\u94FE\u63A5",
            "uploadLocalImg": "\u4E0A\u4F20\u672C\u5730\u56FE\u7247",
            "fillInImageLink": "\u586B\u5199\u56FE\u7247\u94FE\u63A5",
            "chooseImage": "\u9009\u62E9\u56FE\u7247"
        }
    },
    {
        id: "0af8fea9-594f-45ca-a4aa-744757c9cc18",
        namespace: "oak-general-business-c-extraFile-gallery",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\components\\extraFile\\gallery\\locales\\zh_CN.json",
        data: {
            "waiting": "\u7B49\u5F85\u4E0A\u4F20",
            "success": "\u4E0A\u4F20\u6210\u529F",
            "uploading": "\u4E0A\u4F20\u4E2D"
        }
    },
    {
        id: "a7bb9ba7-7614-4b26-bec4-7d6bac08d7d6",
        namespace: "oak-general-business-c-my-info",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\components\\my\\info\\locales\\zh_CN.json",
        data: {
            "login": "\u767B\u5F55/\u6CE8\u518C",
            "unset": "\u672A\u8BBE\u7F6E",
            "logout": "\u9000\u51FA",
            "mobile": "\u624B\u673A\u53F7\u7801",
            "moreThanOne": "\u591A\u4E8E\u4E00\u6761\u624B\u673A\u53F7"
        }
    },
    {
        id: "328d394b-97ba-46e9-a5cd-9e3520f18294",
        namespace: "oak-general-business-c-user-login",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\components\\user\\login\\locales\\zh_CN.json",
        data: {
            "Login": "\u767B\u5F55",
            "Remember me": "\u8BB0\u4F4F\u8D26\u53F7",
            "inPassword": "\u8D26\u53F7\u767B\u5F55",
            "inCaptcha": "\u624B\u673A\u53F7\u767B\u5F55",
            "inQrCode": "\u626B\u7801\u767B\u5F55",
            "Send": "\u53D1\u9001\u9A8C\u8BC1\u7801",
            "placeholder": {
                "Captcha": "\u8F93\u51654\u4F4D\u77ED\u4FE1\u9A8C\u8BC1\u7801",
                "Mobile": "\u8BF7\u8F93\u5165\u624B\u673A\u53F7",
                "Password": "\u8BF7\u8F93\u5165\u5BC6\u7801"
            },
            "resendAfter": "\u79D2\u540E\u53EF\u91CD\u53D1"
        }
    },
    {
        id: "10e9476b-f32a-4674-a736-b47d616cd5bd",
        namespace: "oak-general-business-c-wechatUser-unbindBtn",
        language: "zh_CN",
        module: "oak-general-business",
        position: "D:\\git\\oak-general-business\\src\\components\\wechatUser\\unbindBtn\\locales\\zh_CN.json",
        data: {
            "unbind": "\u89E3\u7ED1",
            "unbindingWechat": "\u786E\u5B9A\u89E3\u7ED1\u8BE5\u5FAE\u4FE1\u8D26\u53F7"
        }
    }
];
export default i18ns;`;
const b = unescape(a.replace(/\\u/g, '%u'));
console.log(b);