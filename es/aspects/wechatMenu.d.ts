import { EntityDict } from '../oak-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
export declare function getCurrentMenu<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
}, context: Cxt): Promise<any>;
export declare function getMenu<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
}, context: Cxt): Promise<any>;
export declare function createMenu<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    menuConfig: any;
}, context: Cxt): Promise<any>;
export declare function createConditionalMenu<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    menuConfig: any;
}, context: Cxt): Promise<any>;
export declare function deleteConditionalMenu<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    menuid: number;
}, context: Cxt): Promise<any>;
export declare function batchGetArticle<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    offset?: number;
    count: number;
    noContent?: 0 | 1;
}, context: Cxt): Promise<any>;
export declare function getArticle<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    article_id: string;
}, context: Cxt): Promise<any>;
export declare function createMaterial<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    type: 'image' | 'voice' | 'video' | 'thumb';
    media: FormData;
    description?: FormData;
}, context: Cxt): Promise<any>;
export declare function batchGetMaterialList<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    type: 'image' | 'video' | 'voice' | 'news';
    offset?: number;
    count: number;
}, context: Cxt): Promise<any>;
export declare function getMaterial<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    type: 'image' | 'video' | 'voice' | 'news';
    media_id: string;
}, context: Cxt): Promise<any>;
