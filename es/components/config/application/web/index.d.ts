import { WebConfig } from '../../../../oak-app-domain/Application/Schema';
export default function Web(props: {
    config: WebConfig;
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
    cleanKey: (path: string, key: string) => void;
}): import("react/jsx-runtime").JSX.Element;
