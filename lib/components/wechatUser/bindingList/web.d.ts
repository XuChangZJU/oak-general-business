import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'wechatUser', true, {
    wechatUsers: EntityDict['wechatUser']['Schema'][];
}, {}>): import("react/jsx-runtime").JSX.Element;
