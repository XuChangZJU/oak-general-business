import { String, Text } from 'oak-domain/lib/types/DataType';
import { EntityShape } from 'oak-domain/lib/types/Entity';
export type RedirectToProps = {
    batchPath: string;
    singlePath?: string;
};
export interface Schema extends EntityShape {
    title: Text;
    description?: Text;
    targetEntity: String<32>;
    targetFilter: Object;
    action: String<32>;
    redirectTo: RedirectToProps;
}
