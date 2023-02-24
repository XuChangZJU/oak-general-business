import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
declare type Ops = '$gt' | '$lt' | '$gte' | '$lte' | '$eq' | '$ne' | '$startsWith' | '$endsWith' | '$includes' | '$in' | '$nin' | '$between';
declare type ColumnProps = {
    attr: string;
    label?: string;
    type: 'text' | 'date' | 'picker' | 'select' | 'boolean';
    placeholder?: string;
    op?: Ops;
    options: Array<{
        label: string;
        value: string;
    }>;
    transformQuery?: (column: ColumnProps, value: string) => Record<string, any>;
    transformValue?: (column: ColumnProps, query: Record<string, any>) => string;
    filterName?: string;
};
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, false, {
    entity: string;
    columns: Array<ColumnProps>;
    searchValue: string;
    onSearch: () => void;
}, {
    getNamedFilters: () => Record<string, any>[];
}>): JSX.Element;
export {};
