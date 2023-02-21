

import React, { useState, useEffect, useRef } from 'react';
import { Map, APILoader, MapProps, APILoaderConfig } from '@uiw/react-amap';
import classNames from 'classnames';
import './index.less'

export type APILoaderProps = {
    akey: APILoaderConfig['akay'];
    version?: APILoaderConfig['version'];
};

type RenderProps =
    | {
          children?: (data: {
              AMap: typeof AMap;
              map: AMap.Map;
              container?: HTMLDivElement | null;
          }) => undefined;
      }
    | {
          children?: React.ReactNode;
      };

export interface AMapProps extends APILoaderProps {
    style?: React.CSSProperties;
    className?: string;
    children?: RenderProps['children'];
    mapProps?: MapProps;
    mapRef?: React.Ref<
        MapProps & {
            map?: AMap.Map | undefined;
        }
    >;
    useAMapUI?: boolean;
    uiVersion?: string;
    uiCallback?: (status: 'success' | 'fail', result?: any) => void;
    securityJsCode?: string; //安全密钥 推荐开发模式下使用， 正式线上使用serviceHost
    serviceHost?: string; // 您的代理服务器域名或地址
};


const memo = (props: AMapProps) => {
    const {
        akey,
        securityJsCode,
        serviceHost,
        version,
        className,
        style,
        children,
        mapProps = {},
        mapRef,
        useAMapUI,
        uiVersion = '1.1',
        uiCallback,
    } = props;
    const prefixCls = 'oak';

    useEffect(() => {
        // 对安全密钥的支持
        if (serviceHost || securityJsCode) {
            if (serviceHost) {
                (window as any)._AMapSecurityConfig = {
                    serviceHost: `${serviceHost}/_AMapService`,
                };
            } else {
                (window as any)._AMapSecurityConfig = {
                    securityJsCode,
                };
            }
        }
    }, []); 

    useEffect(() => {
        if (!useAMapUI) {
            return;
        }
        if (window.AMap && !window.AMapUI) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `${window.location.protocol}//webapi.amap.com/ui/${uiVersion}/main.js`;
            document.getElementsByTagName('head')[0].appendChild(script);
            script.onload = () => {
                uiCallback && uiCallback('success');
            };
            script.onerror = (error) => {
                uiCallback && uiCallback('fail', error);
            };
        }
    }, [window.AMap, useAMapUI]);

    return (
        <div
            style={style}
            className={classNames(`${prefixCls}-map`, className)}
        >
            <APILoader akay={akey} version={version}>
                <Map ref={mapRef} {...mapProps}>
                    {children as MapProps['children']}
                </Map>
            </APILoader>
        </div>
    );
};

export default memo;
