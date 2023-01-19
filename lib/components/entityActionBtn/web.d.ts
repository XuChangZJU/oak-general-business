import { ButtonProps, SpaceProps } from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../general-app-domain';
declare type Item = {
    name: string;
    type?: 'a' | 'button';
    index?: number;
    alerted?: boolean;
    alertTitle?: string;
    alertContent?: string;
    confirmText?: string;
    cancelText?: string;
    custom?: any;
    callBack?: (index: number) => void;
    onClick?: () => void;
    buttonProps?: Omit<ButtonProps, "onClick">;
};
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, false, {
    entity: string;
    actions: string[];
    items: Item[];
    spaceProps: SpaceProps;
}, {}>): JSX.Element;
export {};
