import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function render(props: WebComponentProps<EntityDict, 'area', true, {
    areas?: EntityDict['area']['OpSchema'][];
}, {
    onItemClicked: (area: EntityDict['area']['OpSchema']) => Promise<void>;
}>): JSX.Element;
