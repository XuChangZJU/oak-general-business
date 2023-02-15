export declare const ActionDefDict: {
    modi: {
        iState: import("oak-domain/lib/types").ActionDef<import("./Modi/Action").IAction, import("./Modi/Action").IState>;
    };
    article: {
        iState: import("oak-domain/lib/types").ActionDef<import("./Article/Action").IAction, import("./Article/Action").IState>;
    };
    captcha: {
        iState: import("oak-domain/lib/types").ActionDef<import("./Captcha/Action").IAction, import("./Captcha/Action").IState>;
    };
    email: {
        ableState: import("oak-domain/lib/types").ActionDef<import("oak-domain/lib/actions/action").AbleAction, import("oak-domain/lib/actions/action").AbleState>;
    };
    message: {
        iState: import("oak-domain/lib/types").ActionDef<import("./Message/Action").IAction, import("./Message/Action").IState>;
        visitState: import("oak-domain/lib/types").ActionDef<"visit", import("./Message/Action").VisitState>;
    };
    messageSent: {
        iState: import("oak-domain/lib/types").ActionDef<import("./MessageSent/Action").IAction, import("./MessageSent/Action").IState>;
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
