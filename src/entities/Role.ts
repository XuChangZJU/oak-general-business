import { ActionType, EntityShape } from 'oak-domain/lib/types/Entity';
import { String } from 'oak-domain/lib/types/DataType';
import { LocaleDef } from 'oak-domain/lib/types/Locale';

export interface Schema extends EntityShape {
   name: String<64>;
};

const actionType: ActionType = 'readOnly';
export type Relation = 'owner';

const locale: LocaleDef<Schema, '', Relation, {}> = {
   zh_CN: {
       attr: {
           name: '名称',
       },
       r: {
          owner: '所有者',
       }
   },
};
