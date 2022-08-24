import { type } from 'os';
import React, { useEffect, memo } from 'react';

export type PositionProps = {
    loadUI: boolean;
    __map__: AMap.Map | undefined;
    onSuccess?: (result: AMapUI.PositionPickerResult) => void;
    onFail?: (error: any) => void;
};


export default memo((props: PositionProps) => {
    const map = props.__map__;
    const loadUI = props.loadUI;
    const { onSuccess, onFail } = props;

    useEffect(() => {
        if (map && loadUI) {
            dragSiteSelection();
        }
    }, [map, loadUI]);

    const dragSiteSelection = () => {
        window.AMapUI.loadUI(
            ['misc/PositionPicker'],
            (PositionPicker) => {
                const positionPicker: AMapUI.PositionPicker =
                    new PositionPicker({
                        mode: 'dragMap',
                        map,
                        iconStyle: {
                            //自定义外观
                            url: '//webapi.amap.com/ui/1.0/assets/position-picker2.png',
                            ancher: [24, 40],
                            size: [48, 48],
                        },
                    });
                positionPicker.on(
                    'success',
                    (result: AMapUI.PositionPickerResult) => {
                        onSuccess && onSuccess(result);
                    }
                );
                positionPicker.on('fail', (error: any) => {
                    onFail && onFail(error);
                });

                positionPicker.start();
            }
        );
    };

    return null;
});
