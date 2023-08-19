import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
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
    id: string;
    refreshing: boolean;
    isSupportSyncWeChat: boolean;
    appId: string;
};
declare type MethodsProps = {
    goAddMobile: () => void;
    goChangePassword: () => void;
    setAvatar: () => void;
    setVisible: (visible: boolean, attr: string) => void;
    setCustomData: (attr: string, value: string | number) => void;
    onConfirm: (attr: string) => Promise<void>;
    refreshWechatPublicUserInfo: () => void;
};
export default function render(props: WebComponentProps<EntityDict, 'user', false, DataProps, MethodsProps>): JSX.Element;
export {};
