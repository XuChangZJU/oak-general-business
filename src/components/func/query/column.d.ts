import { Dayjs } from 'dayjs'

export type Ops =
    | '$gt'
    | '$lt'
    | '$gte'
    | '$lte'
    | '$eq'
    | '$ne'
    | '$startsWith'
    | '$endsWith'
    | '$includes'
    | '$in'
    | '$nin'
    | '$between'
    | '$text'
    | '$search';

export type ColSpanType = 1 | 2 | 3 | 4;

export type ValueType = string | boolean | number | Array<Dayjs> | Dayjs;

export type ColumnProps = {
    attr: string;
    label?: string;
    type: 'text' | 'date' | 'picker' | 'select' | 'boolean';
    placeholder?: string;
    op?: Ops;
    selectProps?: {
        options?: Array<{
            label: string;
            value: string;
        }>;
        transformInOption: (
            option: string | number | Record<string, any>
        ) => void;
        transformOutOption: (
            option: string | number | Record<string, any>
        ) => void;
    };
    dateProps?: {
        range?: boolean;
        showTime?: boolean;
    };
    refProps?: {
        projection?: Record<string, any>;
        filter?: Record<string, any>;
        sorter?: Record<string, any>;
        router?: {
            pathname: string;
            props?: Record<string, any>;
            state?: Record<string, any>;
        };
        component?: React.ReactNode;
        inputKey?: 'name' | string;
    };
    transformFilter?: (
        column: ColumnProps,
        value: ValueType
    ) => Record<string, any>;
    transformValue?: (
        column: ColumnProps,
        filter: Record<string, any>
    ) => string;
    filterName?: string;
    colSpan?: ColSpanType;
    placeholder?: string;
};
