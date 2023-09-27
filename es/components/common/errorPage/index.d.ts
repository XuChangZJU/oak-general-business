import { EntityDict } from '../../../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base';
import { ECode } from '../../../types/ErrorPage';
declare const _default: <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(props: ReactComponentProps<ED2, T2, false, {
    code: ECode;
    title?: string | undefined;
    desc?: string | undefined;
    children?: React.ReactNode;
    icon?: React.ReactNode;
}>) => React.ReactElement;
export default _default;
