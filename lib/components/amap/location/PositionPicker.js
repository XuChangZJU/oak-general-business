"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
exports.default = (0, react_1.memo)(function (props) {
    var map = props.__map__;
    var loadUI = props.loadUI;
    var onSuccess = props.onSuccess, onFail = props.onFail;
    (0, react_1.useEffect)(function () {
        if (map && window.AMapUI) {
            dragSiteSelection();
        }
    }, [map, window.AMapUI]);
    var dragSiteSelection = function () {
        window.AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
            var positionPicker = new PositionPicker({
                mode: 'dragMap',
                map: map,
                iconStyle: {
                    //自定义外观
                    url: '//webapi.amap.com/ui/1.0/assets/position-picker2.png',
                    ancher: [24, 40],
                    size: [48, 48],
                },
            });
            positionPicker.on('success', function (result) {
                onSuccess && onSuccess(result);
            });
            positionPicker.on('fail', function (error) {
                onFail && onFail(error);
            });
            positionPicker.start();
        });
    };
    return null;
});
