import { EntityDict } from '../../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'wechatPublicTag', false, {
    variant: 'inline' | 'alone' | 'dialog';
    showBack: boolean;
    text: string;
    wechatId: number;
    sync: boolean;
    oakId: string;
}, {
    confirm: () => void;
    createTag: (name: string) => void;
    editTag: (id: number, name: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
