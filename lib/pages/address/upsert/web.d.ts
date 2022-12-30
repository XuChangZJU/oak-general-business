/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'address', false, {
    name?: string;
    phone?: string;
    districtName?: string;
    areaText?: string;
    detail?: string;
}, {
    callAreaPicker: () => void;
    confirm: () => Promise<void>;
}>): JSX.Element;
