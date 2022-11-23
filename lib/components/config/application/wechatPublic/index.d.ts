/// <reference types="react" />
import { WechatPublicConfig } from '../../../../general-app-domain/Application/Schema';
export default function WechatPublic(props: {
    config: WechatPublicConfig;
    setValue: (path: string, value: any) => void;
    removeItem: (path: string, index: number) => void;
    cleanKey: (path: string, key: string) => void;
}): JSX.Element;
