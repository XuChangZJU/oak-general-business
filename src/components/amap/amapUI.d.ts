/// <reference types="@uiw/react-amap-types" />

//@ts-ignore
declare global {
    interface Window {
        AMapUI: typeof AMapUI;
    }
}

declare namespace AMapUI {
    class PositionPicker {
        constructor(opts: PositionPickerOptions);
        start(): void;
        stop(): void;
        on(
            evt: 'success' | 'fail',
            callback: PositionPickerCallback['success' | 'fail']
        ): void;
    }

    type IconStyleOptions = {
        url: string;
        size: [number, number];
        ancher: [number, number];
    };

    type PositionPickerOptions = {
        mode: 'dragMap' | 'dragMarker';
        map: AMap.Map;
        iconStyle?: IconStyleOptions;
    };

    type PositionPickerCallback = {
        success: (result: PositionPickerResult) => void;
        fail: (error: any) => void;
    };

    function loadUI(
        module: Array<Module>,
        callBack: (instance: an) => void
    ): void;

    type Module =
        | 'misc/PositionPicker'
        | 'misc/PoiPicker'
        | 'control/BasicControl';

    type PositionPickerResult = {
        position: AMap.LngLat;
        address: string;
        nearestJunction: string;
        nearestRoad: string;
        nearestPOI: string;
        info: string;
        regeocode: AMap.ReGeocode;
    };
}
