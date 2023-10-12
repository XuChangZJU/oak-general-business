import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { EntityDict } from '../oak-app-domain';
export declare function syncMessageTemplate<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
}, context: Cxt): Promise<{
    content: string;
    deputy_industry?: string | undefined;
    example?: string | undefined;
    primary_industry?: string | undefined;
    template_id: string;
    title: string;
}[]>;
