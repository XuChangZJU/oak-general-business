import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'station', false, {
    oakId: string;
    name: string;
    onClose: () => void;
    openStation: boolean;
    subwayId: string;
}, {}>): JSX.Element;
