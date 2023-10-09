import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'application', true, {
    applications: EntityDict['application']['OpSchema'][];
    systemId: string;
}>): import("react/jsx-runtime").JSX.Element | undefined;
