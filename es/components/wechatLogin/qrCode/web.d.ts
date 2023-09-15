import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'wechatLogin', true, {
    wechatLoginId: string;
    qrCodeUrl: string;
    loading: boolean;
    successed: boolean;
    type: EntityDict['wechatLogin']['Schema']['type'];
}, {}>): JSX.Element;
