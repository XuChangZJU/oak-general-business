import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', true, {
    showBack: boolean;
    list: Partial<EntityDict['wechatPublicTag']['Schema']>[];
}, {
    goDetail: (id: string) => void;
    goCreate: () => void;
    goUpdate: (id: string) => void;
    goDelete: (id: string) => void;
}>): JSX.Element;
