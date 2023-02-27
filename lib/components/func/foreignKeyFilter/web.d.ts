import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import { ColumnProps } from '../query/column';
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, false, {
    entity: keyof EntityDict;
    column: ColumnProps;
    onSearch: () => void;
    formItem: boolean;
}, {
    getNamedFilter: (name: string) => Record<string, any>;
    getRefByAttr: (entity: keyof EntityDict, attr: string) => {
        entity: keyof EntityDict;
        attr: string;
        attrType: string;
        entityI18n: keyof EntityDict;
        attrI18n: string;
        attribute: Record<string, any>;
    };
    getEntityData: (entity: keyof EntityDict, ids: string[]) => EntityDict[keyof EntityDict]['Schema'][];
}>): JSX.Element | null;
