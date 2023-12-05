import { String, Text, Datetime } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Application } from './Application';
type KeywordEnumValueList = Array<{
    keywordCode: string;
    enumValueList: Array<string>;
}>;
export interface Schema extends EntityShape {
    application: Application;
    wechatId: String<64>;
    title: Text;
    primaryIndustry?: Text;
    deputyIndustry?: Text;
    content?: Text;
    example?: Text;
    param?: Object;
    syncAt: Datetime;
    keywordEnumValueList?: KeywordEnumValueList;
    type?: '2' | '3';
}
export {};
