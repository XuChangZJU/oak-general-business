export declare const ActionDefDict: {
    modi: {
        iState: import("oak-domain/lib/types").ActionDef<import("./Modi/Action").IAction, import("./Modi/Action").IState>;
    };
    captcha: {
        iState: import("oak-domain/lib/types").ActionDef<import("./Captcha/Action").IAction, import("./Captcha/Action").IState>;
    };
    email: {
        ableState: import("oak-domain/lib/types").ActionDef<import("oak-domain/lib/actions/action").AbleAction, import("oak-domain/lib/actions/action").AbleState>;
    };
    mobile: {
        ableState: import("oak-domain/lib/types").ActionDef<import("oak-domain/lib/actions/action").AbleAction, import("oak-domain/lib/actions/action").AbleState>;
    };
    token: {
        ableState: import("oak-domain/lib/types").ActionDef<import("oak-domain/lib/actions/action").AbleAction, import("oak-domain/lib/actions/action").AbleState>;
    };
    user: {
        idState: import("oak-domain/lib/types").ActionDef<import("./User/Action").IdAction, import("./User/Action").IdState>;
        userState: import("oak-domain/lib/types").ActionDef<import("./User/Action").UserAction, import("./User/Action").UserState>;
    };
    userEntityGrant: {};
};
