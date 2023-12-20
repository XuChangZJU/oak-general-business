import { EntityDict } from '../../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base/lib/types/Page';
import { ButtonProps } from 'antd';
import { ButtonProps as AmButtonProps } from 'antd-mobile';
type AfterCommit = ((id?: string) => void) | undefined;
type BeforeCommit = (() => boolean | undefined | Promise<boolean | undefined>) | undefined;
declare const _default: <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(props: ReactComponentProps<ED2, T2, true, {
    action?: string | undefined;
    size?: ButtonProps['size'] | AmButtonProps['size'];
    block?: boolean | undefined;
    type?: ButtonProps['type'] | AmButtonProps['type'];
    executeText?: string | undefined;
    buttonProps?: (ButtonProps & {
        color?: "success" | "primary" | "warning" | "default" | "danger" | undefined;
        fill?: "none" | "solid" | "outline" | undefined;
        size?: "small" | "large" | "middle" | "mini" | undefined;
        block?: boolean | undefined;
        loading?: boolean | "auto" | undefined;
        loadingText?: string | undefined;
        loadingIcon?: import("react").ReactNode;
        disabled?: boolean | undefined;
        onClick?: ((event: import("react").MouseEvent<HTMLButtonElement, MouseEvent>) => unknown) | undefined;
        type?: "button" | "reset" | "submit" | undefined;
        shape?: "default" | "rounded" | "rectangular" | undefined;
        children?: import("react").ReactNode;
    } & Pick<import("react").ClassAttributes<HTMLButtonElement> & import("react").ButtonHTMLAttributes<HTMLButtonElement>, "id" | "onMouseUp" | "onMouseDown" | "onTouchStart" | "onTouchEnd"> & {
        className?: string | undefined;
        style?: (import("react").CSSProperties & Partial<Record<"--text-color" | "--background-color" | "--border-radius" | "--border-width" | "--border-style" | "--border-color", string>>) | undefined;
        tabIndex?: number | undefined;
    } & import("react").AriaAttributes) | undefined;
    afterCommit?: AfterCommit;
    beforeCommit?: BeforeCommit;
}>) => React.ReactElement;
export default _default;
