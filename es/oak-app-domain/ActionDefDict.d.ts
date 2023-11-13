export declare const ActionDefDict: {
    modi: {
        iState: import("oak-domain").ActionDef<string, string>;
    };
    account: {
        ableState: import("oak-domain").ActionDef<import("oak-domain").AbleAction, import("oak-domain").AbleState>;
    };
    captcha: {
        iState: import("oak-domain").ActionDef<string, string>;
    };
    email: {
        ableState: import("oak-domain").ActionDef<import("oak-domain").AbleAction, import("oak-domain").AbleState>;
    };
    message: {
        iState: import("oak-domain").ActionDef<string, string>;
        visitState: import("oak-domain").ActionDef<string, string>;
    };
    mobile: {
        ableState: import("oak-domain").ActionDef<import("oak-domain").AbleAction, import("oak-domain").AbleState>;
    };
    notification: {
        iState: import("oak-domain").ActionDef<string, string>;
    };
    parasite: {};
    toDo: {
        iState: import("oak-domain").ActionDef<string, string>;
    };
    token: {
        ableState: import("oak-domain").ActionDef<import("oak-domain").AbleAction, import("oak-domain").AbleState>;
    };
    user: {
        idState: import("oak-domain").ActionDef<string, string>;
        userState: import("oak-domain").ActionDef<string, string>;
    };
    userEntityGrant: {};
    userWechatPublicTag: {
        iState: import("oak-domain").ActionDef<string, string>;
    };
    wechatLogin: {};
    wechatMenu: {
        iState: import("oak-domain").ActionDef<string, string>;
    };
    wechatPublicTag: {
        iState: import("oak-domain").ActionDef<string, string>;
    };
};
