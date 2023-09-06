import { Config } from '../../../../types/Config';
export default function Cos(props: {
    map: Required<Config>['Map'];
    setValue: (path: string, value: any) => void;
}): import("react/jsx-runtime").JSX.Element;
