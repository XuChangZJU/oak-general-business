"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = tslib_1.__importStar(require("react"));
var react_amap_1 = require("@uiw/react-amap");
var tdesign_react_1 = require("tdesign-react");
var tdesign_icons_react_1 = require("tdesign-icons-react");
var PositionPicker_1 = tslib_1.__importDefault(require("./PositionPicker"));
var index_module_less_1 = tslib_1.__importDefault(require("./index.module.less"));
var ListItem = tdesign_react_1.List.ListItem, ListItemMeta = tdesign_react_1.List.ListItemMeta;
var Location = function (props) {
    var visible = props.visible, header = props.header, amapkey = props.amapkey, _a = props.version, version = _a === void 0 ? '2.0' : _a, onClose = props.onClose, onConfirm = props.onConfirm;
    var searchRef = (0, react_1.useRef)();
    var _b = tslib_1.__read((0, react_1.useState)(''), 2), searchValue = _b[0], setSearchValue = _b[1];
    var _c = tslib_1.__read((0, react_1.useState)(true), 2), refresh = _c[0], setRefresh = _c[1]; // 点击poi不触发setPositionPickerResult
    var _d = tslib_1.__read((0, react_1.useState)('dragMap'), 2), mode = _d[0], setMode = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(), 2), map = _e[0], setMap = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(), 2), positionPickerResult = _f[0], setPositionPickerResult = _f[1];
    var _g = tslib_1.__read((0, react_1.useState)(), 2), searchResult = _g[0], setSearchResult = _g[1];
    var _h = tslib_1.__read((0, react_1.useState)(), 2), pois = _h[0], setPois = _h[1];
    var _j = tslib_1.__read((0, react_1.useState)(), 2), currentPoi = _j[0], setCurrentPoi = _j[1];
    var _k = tslib_1.__read((0, react_1.useState)(), 2), oldPois = _k[0], setOldPois = _k[1];
    var _l = tslib_1.__read((0, react_1.useState)(), 2), oldPoi = _l[0], setOldPoi = _l[1];
    var _m = tslib_1.__read((0, react_1.useState)(false), 2), loadUI = _m[0], setLoadUI = _m[1];
    var _o = tslib_1.__read((0, react_1.useState)(false), 2), focus = _o[0], setFocus = _o[1];
    var _p = tslib_1.__read((0, react_1.useState)(false), 2), searchLoading = _p[0], setSearchLoading = _p[1];
    var _q = tslib_1.__read((0, react_1.useState)(false), 2), show = _q[0], setShow = _q[1];
    var setCenter = function (center) {
        if (map) {
            map.setCenter(center);
        }
    };
    var placeSearch = function (value) {
        // window.AMap存在再搜素
        return new Promise(function (resolve, reject) {
            var _a;
            (_a = window.AMap) === null || _a === void 0 ? void 0 : _a.plugin(['AMap.PlaceSearch'], function () {
                var placeSearch = new window.AMap.PlaceSearch({
                    pageSize: 20,
                    pageIndex: 1,
                    extensions: 'all',
                    city: '全国', //城市
                });
                placeSearch.search(value, function (status, result) {
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
                setCurrentPoi(pois[0]);
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
        }
    }, [visible, map, loadUI]);
    var clearData = function () {
        setMode('dragMap');
        setFocus(false);
        setShow(false);
        setSearchValue('');
        setRefresh(true);
    };
    return ((0, jsx_runtime_1.jsx)(tdesign_react_1.Dialog, tslib_1.__assign({ header: header, width: "80%", visible: visible, onClose: function () {
            onClose && onClose();
            clearData();
        }, onConfirm: function () {
            if (!currentPoi) {
                return;
            }
            onConfirm &&
                onConfirm(currentPoi, mode === 'dragMap' ? positionPickerResult : searchResult);
            clearData();
        } }, { children: (0, jsx_runtime_1.jsxs)(tdesign_react_1.Row, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Col, tslib_1.__assign({ xs: 12, sm: 7 }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: index_module_less_1.default.map }, { children: (0, jsx_runtime_1.jsx)(react_amap_1.APILoader, tslib_1.__assign({ akay: amapkey, version: version }, { children: (0, jsx_runtime_1.jsx)(react_amap_1.Map, tslib_1.__assign({ ref: function (instance) {
                                    if (instance && instance.map && !map) {
                                        setMap(instance.map);
                                    }
                                }, onDragStart: function () {
                                    setRefresh(true);
                                    setMode('dragMap');
                                    setSearchValue('');
                                    setShow(false);
                                } }, { children: (0, jsx_runtime_1.jsx)(PositionPicker_1.default, { loadUI: loadUI, __map__: map, onSuccess: function (result) {
                                        setPositionPickerResult(result);
                                    } }) })) })) })) })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Col, tslib_1.__assign({ xs: 12, sm: 5 }, { children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(tdesign_react_1.List, tslib_1.__assign({ header: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: index_module_less_1.default.searchBox }, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { ref: searchRef, placeholder: "\u641C\u7D22\u5730\u70B9", value: searchValue, clearable: true, onChange: function (value) {
                                            setSearchValue(value);
                                        }, onClear: function () {
                                            setSearchValue('');
                                        }, prefixIcon: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.SearchIcon, {}), onFocus: function () {
                                            setMode('searchPoi');
                                            setFocus(true);
                                        }, onBlur: function () {
                                            setFocus(false);
                                        } }), mode === 'searchPoi' && ((0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ style: { marginLeft: 5 }, variant: "text", theme: "primary", onClick: function () {
                                            var _a;
                                            setMode('dragMap');
                                            setSearchValue('');
                                            setShow(false);
                                            //@ts-ignore
                                            (_a = searchRef === null || searchRef === void 0 ? void 0 : searchRef.current) === null || _a === void 0 ? void 0 : _a.blur();
                                        } }, { children: "\u53D6\u6D88" })))] })), className: index_module_less_1.default.list }, { children: [mode === 'dragMap' &&
                                    (pois === null || pois === void 0 ? void 0 : pois.map(function (poi, index) {
                                        return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ onClick: function () {
                                                setRefresh(false);
                                                setCurrentPoi(poi);
                                            } }, { children: (0, jsx_runtime_1.jsx)(ListItem, tslib_1.__assign({ action: (currentPoi === null || currentPoi === void 0 ? void 0 : currentPoi.id) ===
                                                    poi.id ? ((0, jsx_runtime_1.jsx)(tdesign_icons_react_1.CheckCircleFilledIcon, { className: index_module_less_1.default.check, size: 24 })) : ((0, jsx_runtime_1.jsx)("div", { style: {
                                                        width: 24,
                                                    } })) }, { children: (0, jsx_runtime_1.jsx)(ListItemMeta, { title: poi.name, description: "".concat(poi.distance
                                                        ? "".concat(poi.distance, "m\u5185 | ")
                                                        : '').concat(poi.address) }) })) }), poi.id));
                                    })), mode === 'searchPoi' && ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [searchLoading && ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: index_module_less_1.default.loadingBox }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Loading, { delay: 0, fullscreen: false, indicator: true, inheritColor: false, loading: true, preventScrollThrough: true, showOverlay: true, size: "medium" }) }))), (pois === null || pois === void 0 ? void 0 : pois.length)
                                            ? pois.map(function (poi, index) {
                                                return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ onClick: function () {
                                                        setRefresh(false);
                                                        setCurrentPoi(poi);
                                                    } }, { children: (0, jsx_runtime_1.jsx)(ListItem, tslib_1.__assign({ action: (currentPoi === null || currentPoi === void 0 ? void 0 : currentPoi.id) ===
                                                            poi.id ? ((0, jsx_runtime_1.jsx)(tdesign_icons_react_1.CheckCircleFilledIcon, { className: index_module_less_1.default.check, size: 24 })) : ((0, jsx_runtime_1.jsx)("div", { style: {
                                                                width: 24,
                                                            } })) }, { children: (0, jsx_runtime_1.jsx)(ListItemMeta, { title: poi.name, description: "".concat(poi.distance
                                                                ? "".concat(poi.distance, "m\u5185 | ")
                                                                : '').concat(poi.address) }) })) }), poi.id));
                                            })
                                            : show && ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: index_module_less_1.default.noData }, { children: "\u65E0\u641C\u7D20\u7ED3\u679C" })))] }))] })) }) }))] }) })));
};
exports.default = Location;
