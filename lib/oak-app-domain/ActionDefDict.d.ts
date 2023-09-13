export declare const ActionDefDict: {
    modi: {
        iState: import("oak-domain").ActionDef<string, string>;
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
    token: {
        ableState: import("oak-domain").ActionDef<import("oak-domain").AbleAction, import("oak-domain").AbleState>;
    };
    user: {
        idState: import("oak-domain").ActionDef<string, string>;
        userState: import("oak-domain").ActionDef<string, string>;
    };
    userEntityGrant: {};
    wechatLogin: {};
};
