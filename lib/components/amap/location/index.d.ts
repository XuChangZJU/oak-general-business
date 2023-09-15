/// <reference types="@uiw/react-amap-types" />
import React from 'react';
import { ModalProps } from 'antd';
import { GeolocationProps } from '@uiw/react-amap';
import './index.less';
export type LocationProps = {
    akey: string;
    version?: string;
    visible?: boolean;
    className?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    onConfirm?: (poi: Poi, result?: AMap.SearchResult | AMapUI.PositionPickerResult) => void;
    geolocationProps?: GeolocationProps;
    useGeolocation?: boolean;
    dialogProps?: ModalProps;
    securityJsCode?: string;
    serviceHost?: string;
};
export type Poi = {
    id: string;
    name: string;
    type: string;
    tel: string;
    direction?: string;
    distance: number;
    address: string;
    location: AMap.LngLat;
    website?: string;
    pcode: string;
    citycode: string;
    adcode: string;
    postcode?: string;
    pname: string;
    cityname: string;
    adname: string;
    email?: string;
    businessArea?: string;
};
declare const Location: (props: LocationProps) => JSX.Element;
export default Location;
