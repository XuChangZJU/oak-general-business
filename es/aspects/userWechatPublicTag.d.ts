import { EntityDict } from "../oak-app-domain";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
export declare function getTagUsers<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    tagId: number;
}, context: Cxt): Promise<any>;
export declare function batchtagging<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    openIdList: string[];
    tagId: number;
}, context: Cxt): Promise<any>;
export declare function batchuntagging<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    openIdList: string[];
    tagId: number;
}, context: Cxt): Promise<any>;
export declare function getUserTags<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    openId: string;
}, context: Cxt): Promise<any>;
export declare function getUsers<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    nextOpenId: string;
}, context: Cxt): Promise<any>;
export declare function getSubscribedUserInfo<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    openId: string;
}, context: Cxt): Promise<any>;
export declare function tagging<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    openId: string;
    tagIdList: number[];
}, context: Cxt): Promise<any>;
export declare function syncToLocale<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    openId: string;
}, context: Cxt): Promise<any>;
export declare function syncToWechat<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    id: string;
    openId: string;
}, context: Cxt): Promise<any>;
