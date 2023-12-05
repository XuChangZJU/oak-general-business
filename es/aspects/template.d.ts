import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { EntityDict } from '../oak-app-domain';
export declare function registMessageType(messageType: string[]): void;
export declare function getMessageType(): Promise<string[]>;
export declare function syncMessageTemplate<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
}, context: Cxt): Promise<{
    wechatId: string;
    title: string;
    primaryIndustry: string;
    deputyIndustry: string;
    content: string;
    example: string;
}[] | {
    wechatId: string;
    title: string;
    type: string;
    content: string;
    example: string;
    keywordEnumValueList: {
        keywordCode: string;
        enumValueList: string[];
    }[];
}[]>;
