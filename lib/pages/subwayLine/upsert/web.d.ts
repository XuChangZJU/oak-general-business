/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '@oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'service', false, {
    parentId?: string;
    parentName: string;
    type: string;
    description: string;
    name: string;
    typeArr: Array<{
        label: string;
        value: string;
    }>;
    oakId: string;
    show: string;
}, {
    confirm: () => void;
    reset: () => void;
}>): JSX.Element;
