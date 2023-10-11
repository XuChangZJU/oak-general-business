import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import { Style } from '../../../types/Style';
export default function Render(props: WebComponentProps<EntityDict, 'application', false, {
    id: string;
    config: EntityDict['application']['OpSchema']['config'];
    name: string;
    style: Style;
    type: 'web' | 'wechatMp' | 'wechatPublic';
}>): import("react/jsx-runtime").JSX.Element | undefined;
