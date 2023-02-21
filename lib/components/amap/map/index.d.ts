/// <reference types="@uiw/react-amap-types" />
import React from 'react';
import { MapProps, APILoaderConfig } from '@uiw/react-amap';
import './index.less';
export declare type APILoaderProps = {
    akey: APILoaderConfig['akay'];
    version?: APILoaderConfig['version'];
};
declare type RenderProps = {
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
declare const memo: (props: AMapProps) => JSX.Element;
export default memo;
