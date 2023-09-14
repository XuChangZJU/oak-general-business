/// <reference types="@uiw/react-amap-types" />
import React from 'react';
export type PositionProps = {
    loadUI: boolean;
    __map__: AMap.Map | undefined;
    onSuccess?: (result: AMapUI.PositionPickerResult) => void;
    onFail?: (error: any) => void;
};
declare const _default: React.MemoExoticComponent<(props: PositionProps) => null>;
export default _default;
