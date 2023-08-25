import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'subscription', true, {
    searchValue: string;
    list: EntityDict['subscription']['Schema'][];
    showBack: boolean;
    variant?: 'inline' | 'alone' | 'dialog';
}, {
    goDetail: (id: string) => void;
    goCreate: () => void;
    goSetConfig: (id: string) => void;
    goUpdate: (id: string) => void;
    remove: (id: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
