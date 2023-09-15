"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = tslib_1.__importStar(require("react"));
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var react_amap_1 = require("@uiw/react-amap");
var map_1 = tslib_1.__importDefault(require("./../map"));
var PositionPicker_1 = tslib_1.__importDefault(require("./PositionPicker"));
require("./index.less");
var Location = function (props) {
    var visible = props.visible, akey = props.akey, securityJsCode = props.securityJsCode, serviceHost = props.serviceHost, _a = props.version, version = _a === void 0 ? '2.0' : _a, onClose = props.onClose, onConfirm = props.onConfirm, _b = props.geolocationProps, geolocationProps = _b === void 0 ? {} : _b, _c = props.useGeolocation, useGeolocation = _c === void 0 ? true : _c, _d = props.dialogProps, dialogProps = _d === void 0 ? {} : _d;
    var prefixCls = 'oak';
    var searchRef = (0, react_1.useRef)();
    var _e = tslib_1.__read((0, react_1.useState)(''), 2), searchValue = _e[0], setSearchValue = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(true), 2), refresh = _f[0], setRefresh = _f[1]; // 点击poi不触发setPositionPickerResult
    var _g = tslib_1.__read((0, react_1.useState)('dragMap'), 2), mode = _g[0], setMode = _g[1];
    var _h = tslib_1.__read((0, react_1.useState)('全国'), 2), city = _h[0], setCity = _h[1];
    var _j = tslib_1.__read((0, react_1.useState)(), 2), map = _j[0], setMap = _j[1];
    var _k = tslib_1.__read((0, react_1.useState)(), 2), positionPickerResult = _k[0], setPositionPickerResult = _k[1];
    var _l = tslib_1.__read((0, react_1.useState)(), 2), searchResult = _l[0], setSearchResult = _l[1];
    var _m = tslib_1.__read((0, react_1.useState)(), 2), pois = _m[0], setPois = _m[1];
    var _o = tslib_1.__read((0, react_1.useState)(), 2), currentPoi = _o[0], setCurrentPoi = _o[1];
    var _p = tslib_1.__read((0, react_1.useState)(), 2), oldPois = _p[0], setOldPois = _p[1];
    var _q = tslib_1.__read((0, react_1.useState)(), 2), oldPoi = _q[0], setOldPoi = _q[1];
    var _r = tslib_1.__read((0, react_1.useState)(false), 2), loadUI = _r[0], setLoadUI = _r[1];
    var _s = tslib_1.__read((0, react_1.useState)(false), 2), focus = _s[0], setFocus = _s[1];
    var _t = tslib_1.__read((0, react_1.useState)(false), 2), searchLoading = _t[0], setSearchLoading = _t[1];
    var _u = tslib_1.__read((0, react_1.useState)(false), 2), show = _u[0], setShow = _u[1];
    var setCenter = function (center) {
        if (map) {
            map.setCenter(center);
        }
    };
    var citySearch = function () {
        return new Promise(function (resolve, reject) {
            var _a;
            (_a = window.AMap) === null || _a === void 0 ? void 0 : _a.plugin(['AMap.CitySearch'], function () {
                var citySearchFn = new window.AMap.CitySearch();
                citySearchFn.getLocalCity(function (status, result) {
                    if (status === 'complete') {
                        resolve(result);
                    }
                    else {
                        reject(result);
                    }
                });
            });
        });
    };
    var placeSearch = function (value) {
        // window.AMap存在再搜素
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                (_a = window.AMap) === null || _a === void 0 ? void 0 : _a.plugin(['AMap.PlaceSearch'], function () {
                    var placeSearchFn = new window.AMap.PlaceSearch({
                        pageSize: 20,
                        pageIndex: 1,
                        extensions: 'all',
                        city: city, //城市
                    });
                    placeSearchFn.search(value, function (status, result) {
                        if (status === 'complete') {
                            resolve(result);
                        }
                        else {
                            reject(result);
                        }
                    });
                });
                return [2 /*return*/];
            });
        }); });
    };
    (0, react_1.useEffect)(function () {
        // 对安全密钥的支持
        if (serviceHost || securityJsCode) {
            if (serviceHost) {
                window._AMapSecurityConfig = {
                    serviceHost: "".concat(serviceHost, "/_AMapService"),
                };
            }
            else {
                window._AMapSecurityConfig = {
                    securityJsCode: securityJsCode,
                };
            }
        }
    }, []);
    (0, react_1.useEffect)(function () {
        if (window.AMap && !window.AMapUI) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "".concat(window.location.protocol, "//webapi.amap.com/ui/1.1/main.js");
            document.getElementsByTagName('head')[0].appendChild(script);
            script.onload = function () {
                setLoadUI(true);
            };
            script.onerror = function (error) {
                setLoadUI(false);
            };
        }
        else if (window.AMap && window.AMapUI) {
            setLoadUI(true);
        }
    }, [window.AMap]);
    (0, react_1.useEffect)(function () {
        if (currentPoi && !refresh) {
            var lngLat = new window.AMap.LngLat(currentPoi.location.lng, currentPoi.location.lat);
            setCenter(lngLat);
        }
    }, [refresh, currentPoi]);
    (0, react_1.useEffect)(function () {
        // 拖动地图才触发
        if (mode === 'dragMap' && positionPickerResult && refresh) {
            var regeocode = positionPickerResult.regeocode;
            var pois_1 = regeocode.pois, addressComponent_1 = regeocode.addressComponent;
            var pois2 = pois_1 === null || pois_1 === void 0 ? void 0 : pois_1.map(function (poi, index) {
                return tslib_1.__assign(tslib_1.__assign({}, poi), { pcode: '', citycode: addressComponent_1 === null || addressComponent_1 === void 0 ? void 0 : addressComponent_1.citycode, adcode: addressComponent_1.adcode, postcode: '', pname: addressComponent_1.province, cityname: addressComponent_1.city, adname: addressComponent_1 === null || addressComponent_1 === void 0 ? void 0 : addressComponent_1.district });
            });
            setPois(pois2);
            setCurrentPoi(pois2[0]);
        }
    }, [refresh, positionPickerResult]);
    (0, react_1.useEffect)(function () {
        if (searchValue) {
            setSearchLoading(true);
            placeSearch(searchValue).then(function (result) {
                var pois = (result === null || result === void 0 ? void 0 : result.poiList).pois;
                setSearchResult(result);
                setShow(true);
                setSearchLoading(false);
                setPois(pois);
                // setCurrentPoi(pois[0]);
            }, function (error) {
                setSearchResult(undefined);
                setShow(true);
                setSearchLoading(false);
            });
        }
    }, [searchValue]);
    (0, react_1.useEffect)(function () {
        if (mode === 'searchPoi') {
            setOldPoi(currentPoi);
            setOldPois(pois);
            setPois([]);
            setCurrentPoi(undefined);
        }
        else {
            setPois(oldPois);
            setCurrentPoi(oldPoi);
        }
    }, [mode]);
    (0, react_1.useEffect)(function () {
        if (visible && map && loadUI) {
            setCenter(map.getCenter());
            citySearch().then(function (result) {
                if ((result === null || result === void 0 ? void 0 : result.info) === 'OK') {
                    setCity(result.city);
                }
            });
        }
    }, [visible, map, loadUI]);
    var clearData = function () {
        setMode('dragMap');
        setFocus(false);
        setShow(false);
        setSearchValue('');
        setRefresh(true);
    };
    return ((0, jsx_runtime_1.jsx)(antd_1.Modal, tslib_1.__assign({ width: "80%", okText: "\u786E\u5B9A", cancelText: "\u53D6\u6D88", title: "\u9009\u62E9\u4F4D\u7F6E" }, dialogProps, { open: visible, destroyOnClose: false, onCancel: function () {
            onClose && onClose();
            clearData();
        }, onOk: function () {
            if (!currentPoi) {
                return;
            }
            onConfirm &&
                onConfirm(currentPoi, mode === 'dragMap' ? positionPickerResult : searchResult);
            clearData();
        }, children: (0, jsx_runtime_1.jsx)("div", { className: "".concat(prefixCls, "-location"), children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { gutter: [16, 16], children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 14, children: (0, jsx_runtime_1.jsxs)(map_1.default, { className: "".concat(prefixCls, "-location-map"), akey: akey, version: version, useAMapUI: true, mapRef: function (instance) {
                                if (instance && instance.map && !map) {
                                    setMap(instance.map);
                                }
                            }, mapProps: {
                                onDragStart: function () {
                                    setRefresh(true);
                                    setMode('dragMap');
                                    setSearchValue('');
                                    setShow(false);
                                },
                            }, children: [(0, jsx_runtime_1.jsx)(PositionPicker_1.default, { loadUI: loadUI, __map__: map, onSuccess: function (result) {
                                        setPositionPickerResult(result);
                                    } }), useGeolocation && ((0, jsx_runtime_1.jsx)(react_amap_1.Geolocation, tslib_1.__assign({ maximumAge: 100000, borderRadius: "5px", position: "RB", offset: [10, 10], zoomToAccuracy: true, showCircle: true }, geolocationProps, { onComplete: function (data) { }, onError: function (err) {
                                        console.error(err);
                                    } })))] }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 10, children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(antd_1.List, { className: "".concat(prefixCls, "-location-list"), header: (0, jsx_runtime_1.jsxs)("div", { className: "".concat(prefixCls, "-location-list-header"), children: [(0, jsx_runtime_1.jsx)(antd_1.Input, { ref: searchRef, placeholder: "\u641C\u7D22\u5730\u70B9", value: searchValue, allowClear: true, onChange: function (e) {
                                                setSearchValue(e.target.value);
                                            }, prefix: (0, jsx_runtime_1.jsx)(icons_1.SearchOutlined, {}), onFocus: function () {
                                                setMode('searchPoi');
                                                setFocus(true);
                                            }, onBlur: function () {
                                                setFocus(false);
                                            } }), mode === 'searchPoi' && ((0, jsx_runtime_1.jsx)(antd_1.Button, { style: { marginLeft: 5 }, type: "link", onClick: function () {
                                                var _a;
                                                setMode('dragMap');
                                                setSearchValue('');
                                                setShow(false);
                                                //@ts-ignore
                                                (_a = searchRef === null || searchRef === void 0 ? void 0 : searchRef.current) === null || _a === void 0 ? void 0 : _a.blur();
                                            }, children: "\u53D6\u6D88" }))] }), children: [mode === 'dragMap' &&
                                        (pois === null || pois === void 0 ? void 0 : pois.map(function (poi, index) {
                                            return ((0, jsx_runtime_1.jsx)("div", { onClick: function () {
                                                    setRefresh(false);
                                                    setCurrentPoi(poi);
                                                }, children: (0, jsx_runtime_1.jsx)(antd_1.List.Item, { actions: [
                                                        (0, jsx_runtime_1.jsx)("div", { style: {
                                                                width: 24,
                                                            }, children: (currentPoi === null || currentPoi === void 0 ? void 0 : currentPoi.id) ===
                                                                poi.id && ((0, jsx_runtime_1.jsx)(icons_1.CheckCircleFilled, { className: "".concat(prefixCls, "-location-list-checked") })) }),
                                                    ], children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: poi.name, description: "".concat(poi.distance
                                                            ? "".concat(poi.distance, "m\u5185 | ")
                                                            : '').concat(poi.address) }) }) }, poi.id));
                                        })), mode === 'searchPoi' && ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [searchLoading && ((0, jsx_runtime_1.jsx)("div", { className: "".concat(prefixCls, "-location-list-loadingBox"), children: (0, jsx_runtime_1.jsx)(antd_1.Spin, { delay: 0, spinning: true, size: "default" }) })), (pois === null || pois === void 0 ? void 0 : pois.length)
                                                ? pois.map(function (poi, index) {
                                                    return ((0, jsx_runtime_1.jsx)("div", { onClick: function () {
                                                            setRefresh(false);
                                                            setCurrentPoi(poi);
                                                        }, children: (0, jsx_runtime_1.jsx)(antd_1.List.Item, { actions: [
                                                                (0, jsx_runtime_1.jsx)("div", { style: {
                                                                        width: 24,
                                                                    }, children: (currentPoi === null || currentPoi === void 0 ? void 0 : currentPoi.id) ===
                                                                        poi.id && ((0, jsx_runtime_1.jsx)(icons_1.CheckCircleFilled, { className: "".concat(prefixCls, "-location-list-checked") })) }),
                                                            ], children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: poi.name, description: "".concat(poi.distance
                                                                    ? "".concat(poi.distance, "m\u5185 | ")
                                                                    : '').concat(poi.address) }) }) }, poi.id));
                                                })
                                                : show &&
                                                    !searchLoading && ((0, jsx_runtime_1.jsx)(antd_1.Empty, { description: "\u65E0\u641C\u7D22\u7ED3\u679C", image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE }))] }))] }) }) })] }) }) })));
};
exports.default = Location;
