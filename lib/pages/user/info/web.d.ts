/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
declare type DataProps = {
    visible: boolean;
    nickname: string;
    name: string;
    birth: string;
    gender: string;
    mobile: string;
    avatarUrl: string;
    attr: string;
    genderOptions: Array<{
        label: string;
        value: string;
    }>;
    attrs: Record<string, string>;
};
declare type MethodsProps = {
    setMobile: () => void;
    setAvatar: () => void;
    setVisible: (visible: boolean, attr: string) => void;
    setCustomData: (attr: string, value: string | number) => void;
    onConfirm: (attr: string) => Promise<void>;
};
export default function render(props: WebComponentProps<EntityDict, 'user', false, DataProps, MethodsProps>): JSX.Element;
export {};
