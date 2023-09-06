import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function render(props: WebComponentProps<EntityDict, 'area', true, {
    areas?: EntityDict['area']['OpSchema'][];
}, {
    onItemClicked: (area: EntityDict['area']['OpSchema']) => Promise<void>;
}>): import("react/jsx-runtime").JSX.Element;
