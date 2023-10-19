import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { EntityDict } from '../oak-app-domain';
export declare function syncMessageTemplate<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
}, context: Cxt): Promise<{
    template_id: string;
    title: string;
    primary_industry: string;
    deputy_industry: string;
    content: string;
    example: string;
}[]>;
