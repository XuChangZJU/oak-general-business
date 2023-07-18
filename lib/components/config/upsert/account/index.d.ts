/// <reference types="react" />
import { Config } from '../../../../types/Config';
export default function Account(props: {
    account: Required<Config>['Account'];
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
}): JSX.Element;
