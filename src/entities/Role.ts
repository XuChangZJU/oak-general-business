import { Configuration, EntityShape, RelationHierarchy } from 'oak-domain/lib/types/Entity';
import { String } from 'oak-domain/lib/types/DataType';
import { LocaleDef } from 'oak-domain/lib/types/Locale';

export interface Schema extends EntityShape {
   name: String<64>;
};

const config: Configuration = {
   actionType: 'readOnly',
   static: true,
};

export type Relation = 'owner';

const locale: LocaleDef<Schema, '', Relation, {}> = {
   zh_CN: {
      name: '角色',
       attr: {
           name: '名称',
       },
       r: {
          owner: '所有者',
       }
   },
};
