

import React, { useState, useEffect, useRef } from 'react';
import { Map, APILoader, MapProps, APILoaderConfig } from '@uiw/react-amap';
import classNames from 'classnames';
import Style from './index.module.less'

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
};


const memo = (props: AMapProps) => {
    const {
        akey,
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
        <div style={style} className={classNames(Style.map, className)}>
            <APILoader akay={akey} version={version}>
                <Map ref={mapRef} {...mapProps}>
                    {children as MapProps['children']}
                </Map>
            </APILoader>
        </div>
    );
};

export default memo;
