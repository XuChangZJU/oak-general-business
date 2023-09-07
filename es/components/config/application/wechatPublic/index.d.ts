import { WechatPublicConfig } from '../../../../oak-app-domain/Application/Schema';
export default function WechatPublic(props: {
    isService?: boolean;
    config: WechatPublicConfig;
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
    cleanKey: (path: string, key: string) => void;
}): import("react/jsx-runtime").JSX.Element;
