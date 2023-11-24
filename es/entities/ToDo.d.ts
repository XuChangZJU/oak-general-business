import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export type RedirectToProps = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};
export type Condition = {
    condition?: any;
};
export interface Schema extends EntityShape {
    title: Text;
    description?: Text;
    targetEntity: String<32>;
    targetEntityId?: String<64>;
    condition?: Condition;
    action: String<32>;
    redirectTo: RedirectToProps;
}
