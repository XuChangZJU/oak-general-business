/// <reference types="@uiw/react-amap-types" />
import React from 'react';
import { MapProps, APILoaderConfig } from '@uiw/react-amap';
import './index.less';
export type APILoaderProps = {
    akey: APILoaderConfig['akey'];
    version?: APILoaderConfig['version'];
};
type RenderProps = {
    children?: (data: {
        AMap: typeof AMap;
        map: AMap.Map;
        container?: HTMLDivElement | null;
    }) => undefined;
} | {
    children?: React.ReactNode;
};
export interface AMapProps extends APILoaderProps {
    style?: React.CSSProperties;
    className?: string;
    children?: RenderProps['children'];
    mapProps?: MapProps;
    mapRef?: React.Ref<MapProps & {
        map?: AMap.Map | undefined;
    }>;
    useAMapUI?: boolean;
    uiVersion?: string;
    uiCallback?: (status: 'success' | 'fail', result?: any) => void;
    securityJsCode?: string;
    serviceHost?: string;
}
declare const memo: (props: AMapProps) => React.JSX.Element;
export default memo;
