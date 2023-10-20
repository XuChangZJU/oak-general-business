import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export type RedirectToProps = {
    pathname: string;
    props?: Record<string, any>;
    state?: Record<string, any>;
};
export interface Schema extends EntityShape {
    title: Text;
    description?: Text;
    targetEntity: String<32>;
    action: String<32>;
    redirectTo: RedirectToProps;
}
