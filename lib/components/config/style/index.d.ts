import { Style as StyleType } from '../../../types/Style';
type StyleProps = {
    value?: StyleType | null;
    onChange: (value: StyleType) => void;
};
export default function Render(props: StyleProps): JSX.Element;
export {};
