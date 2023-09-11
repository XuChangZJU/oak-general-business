import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    nickname?: string;
    name?: string;
    gender?: string;
    birth?: string;
    idCardType?: string;
    idNumber?: string;
    GenderOptions: Array<{
        value: 'male' | 'female';
        label: string;
    }>;
    IDCardTypeOptions: Array<{
        value: string;
        label: string;
    }>;
}, {
    confirm: () => void;
}>): import("react/jsx-runtime").JSX.Element;
