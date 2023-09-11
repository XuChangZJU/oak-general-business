import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'wechatPublicTag', true, {
    showBack: boolean;
    list: Partial<EntityDict['wechatPublicTag']['Schema']>[];
}, {
    goDetail: (id: string) => void;
    goCreate: () => void;
    goUpdate: (id: string) => void;
    goDelete: (id: string) => void;
}>): import("react/jsx-runtime").JSX.Element;
