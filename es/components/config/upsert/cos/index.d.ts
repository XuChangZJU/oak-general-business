import { Config } from '../../../../types/Config';
export default function Cos(props: {
    cos: Required<Config>['Cos'];
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
}): import("react/jsx-runtime").JSX.Element;
