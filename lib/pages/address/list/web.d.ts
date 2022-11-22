import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'address', true, {
    addresses?: any[];
}, {
    gotoUpsert: (id: string) => void;
    goNewAddress: () => void;
}>): JSX.Element;
