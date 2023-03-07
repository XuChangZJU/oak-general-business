/// <reference types="react" />
import { ButtonProps, SpaceProps } from 'antd';
declare type Item = {
    icon?: string | React.ReactNode;
    label?: string;
    action?: string;
    auth: boolean;
    type?: 'a' | 'button';
    index?: number;
    alerted?: boolean;
    alertTitle?: string;
    alertContent?: string;
    confirmText?: string;
    cancelText?: string;
    render?: React.ReactNode;
    beforeAction?: (item: Item) => boolean | Promise<boolean>;
    afterAction?: (item: Item) => void;
    onClick?: (item: Item) => void | Promise<void>;
    buttonProps?: Omit<ButtonProps, 'onClick'>;
    filter?: () => boolean;
};
export declare type ActionBtnPanelProps = {
    entity: string;
    items: Item[];
    spaceProps?: SpaceProps;
    mode?: 'cell' | 'table-cell';
    column?: 3;
};
export {};
