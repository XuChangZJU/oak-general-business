import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
import { AvatarSize } from 'antd/es/avatar/SizeContext';
export default function Render(props: WebComponentProps<EntityDict, 'token', false, {
    avatarUrl: string;
    shape?: 'circle' | 'square';
    size: AvatarSize;
    iconColor?: string;
    iconName?: string;
    iconLarger?: string;
    onClick?: () => void;
}>): import("react/jsx-runtime").JSX.Element;
