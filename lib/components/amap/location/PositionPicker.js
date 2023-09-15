"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
exports.default = (0, react_1.memo)((props) => {
    const map = props.__map__;
    const loadUI = props.loadUI;
    const { onSuccess, onFail } = props;
    (0, react_1.useEffect)(() => {
        if (map && window.AMapUI) {
            dragSiteSelection();
        }
    }, [map, window.AMapUI]);
    const dragSiteSelection = () => {
        window.AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
            const positionPicker = new PositionPicker({
                mode: 'dragMap',
                map,
                iconStyle: {
                    //自定义外观
                    url: '//webapi.amap.com/ui/1.0/assets/position-picker2.png',
                    ancher: [24, 40],
                    size: [48, 48],
                },
            });
            positionPicker.on('success', (result) => {
                onSuccess && onSuccess(result);
            });
            positionPicker.on('fail', (error) => {
                onFail && onFail(error);
            });
            positionPicker.start();
        });
    };
    return null;
});
