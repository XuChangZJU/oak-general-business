import React from 'react';
import { ButtonProps } from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
declare type Item = {
    icon?: string;
    iconRender?: React.ReactNode;
    iconProps?: {
        style?: React.CSSProperties;
        rootStyle?: React.CSSProperties;
        bgColor?: string;
    };
    label?: string;
    action?: string;
    type?: 'a' | 'button';
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
declare type IMode = 'card' | 'text';
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, false, {
    entity: string;
    actions: string[];
    items: Item[];
    rows?: number;
    column?: number;
    mode?: IMode;
    id?: string;
}, {
    getActionName: (action?: string) => string;
}>): JSX.Element | null;
export {};
