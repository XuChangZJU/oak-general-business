import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    visible: boolean;
    nickname: string;
    name: string;
    birth: string;
    gender: string;
    mobile: string;
    avatarUrl: string;
    attr: string;
    showBack: boolean;
    genderOptions: Array<{
        label: string;
        value: string;
    }>;
}, {
    setMobile: () => void;
    setAvatar: () => void;
    setVisible: (visible: boolean, attr: string) => void;
    setCustomData: (attr: string, value: string | number) => void;
    onConfirm: (attr: string) => Promise<void>;
    updateData: (attr: string, value: string | number) => void;
    updateMyInfo: () => void;
}>): JSX.Element;
