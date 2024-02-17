export declare const ActionDefDict: {
    modi: {
        iState: import("oak-domain/lib/types").ActionDef<string, string>;
    };
    account: {
        ableState: import("oak-domain/lib/types").ActionDef<import("oak-domain/lib/actions/action").AbleAction, import("oak-domain/lib/actions/action").AbleState>;
    };
    captcha: {
        iState: import("oak-domain/lib/types").ActionDef<string, string>;
    };
    email: {
        ableState: import("oak-domain/lib/types").ActionDef<import("oak-domain/lib/actions/action").AbleAction, import("oak-domain/lib/actions/action").AbleState>;
    };
    message: {
        iState: import("oak-domain/lib/types").ActionDef<string, string>;
        visitState: import("oak-domain/lib/types").ActionDef<string, string>;
    };
    mobile: {
        ableState: import("oak-domain/lib/types").ActionDef<import("oak-domain/lib/actions/action").AbleAction, import("oak-domain/lib/actions/action").AbleState>;
    };
    notification: {
        iState: import("oak-domain/lib/types").ActionDef<string, string>;
    };
    parasite: {};
    toDo: {
        iState: import("oak-domain/lib/types").ActionDef<string, string>;
    };
    token: {
        ableState: import("oak-domain/lib/types").ActionDef<import("oak-domain/lib/actions/action").AbleAction, import("oak-domain/lib/actions/action").AbleState>;
    };
    user: {
        idState: import("oak-domain/lib/types").ActionDef<string, string>;
        userState: import("oak-domain/lib/types").ActionDef<string, string>;
    };
    userEntityGrant: {};
    userWechatPublicTag: {
        iState: import("oak-domain/lib/types").ActionDef<string, string>;
    };
    wechatLogin: {};
    wechatMenu: {
        iState: import("oak-domain/lib/types").ActionDef<string, string>;
    };
    wechatPublicTag: {
        iState: import("oak-domain/lib/types").ActionDef<string, string>;
    };
};
