/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import { ColumnProps } from './column';
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, false, {
    entity: keyof EntityDict;
    column: ColumnProps;
    searchValue: string;
    onSearch: () => void;
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
}>): JSX.Element | null;
