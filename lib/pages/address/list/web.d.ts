import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'address', true, {
    addresses?: any[];
}, {
    gotoUpsert: (id: string) => void;
    goNewAddress: () => void;
}>): JSX.Element;
