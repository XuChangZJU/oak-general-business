import { Config } from '../../../../types/Config';
export default function Cos(props: {
    cos: Required<Config>['Cos'];
    setValue: (path: string, value: any) => void;
}): JSX.Element;
