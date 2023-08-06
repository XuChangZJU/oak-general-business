import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'parasite', true, {
    searchValue: string;
    nameLabel: string;
    list: RowWithActions<EntityDict, 'userEntityGrant'>[];
}, {
    cancel: () => void;
    getQrCode: () => Promise<void>;
}>): import("react/jsx-runtime").JSX.Element;
