/// <reference types="react" />
import { Config } from '../../../../types/Config';
export default function Cos(props: {
    map: Required<Config>['Map'];
    setValue: (path: string, value: any) => void;
}): JSX.Element;
