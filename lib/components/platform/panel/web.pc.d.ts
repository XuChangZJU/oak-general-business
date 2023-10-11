import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import { Style } from '../../../types/Style';
import { Config } from '../../../types/Config';
export default function render(props: WebComponentProps<EntityDict, 'platform', false, {
    id: string;
    name: string;
    config: Config;
    style: Style;
}>): import("react/jsx-runtime").JSX.Element | null;
