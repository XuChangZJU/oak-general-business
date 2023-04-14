/// <reference types="react" />
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../general-app-domain';
import './web.less';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    name: string;
    type: 'far' | 'fas';
    color?: 'primary' | 'success' | 'error' | 'waring' | 'info' | string;
    className?: string;
    size?: string;
    larger?: '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x' | 'xs' | '2xs' | 'sm' | 'lg' | 'xl' | '2xl';
}, {}>): JSX.Element;
