/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import { ColSpanType, ColumnProps } from '../query/column';
declare type Width = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
declare type ColumnMapType = {
    xxl: ColSpanType;
    xl: ColSpanType;
    lg: ColSpanType;
    md: ColSpanType;
    sm: ColSpanType;
    xs: ColSpanType;
};
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, false, {
    entity: string;
    columns: Array<ColumnProps>;
    onSearch: () => void;
    column?: ColSpanType | ColumnMapType;
    width: Width;
}, {
    getNamedFilters: () => Record<string, any>[];
}>): JSX.Element | null;
export {};
