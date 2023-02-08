import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'mobile', true, {
    mobiles?: EntityDict['mobile']['OpSchema'][];
    allowRemove: boolean;
}, {
    goAddMobile: () => Promise<void>;
}>): JSX.Element;
