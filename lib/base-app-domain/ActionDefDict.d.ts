export declare const ActionDefDict: {
    token: {
        ableState: import("oak-domain/lib/types").ActionDef<import("oak-domain/lib/actions/action").AbleAction, import("oak-domain/lib/actions/action").AbleState>;
    };
    user: {
        idState: import("oak-domain/lib/types").ActionDef<import("./User/Action").IdAction, import("./User/Action").IdState>;
        userState: import("oak-domain/lib/types").ActionDef<import("./User/Action").UserAction, import("./User/Action").UserState>;
    };
    userEntityGrant: {};
};
