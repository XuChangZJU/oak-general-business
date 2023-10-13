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
    id: string;
}, context: Cxt): Promise<any>;
export declare function createConditionalMenu<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    menuConfig: any;
    id: string;
}, context: Cxt): Promise<any>;
export declare function deleteConditionalMenu<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    menuId: number;
}, context: Cxt): Promise<any>;
export declare function deleteMenu<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
}, context: Cxt): Promise<any>;
