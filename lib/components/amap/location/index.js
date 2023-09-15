"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = tslib_1.__importStar(require("react"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const react_amap_1 = require("@uiw/react-amap");
const map_1 = tslib_1.__importDefault(require("./../map"));
const PositionPicker_1 = tslib_1.__importDefault(require("./PositionPicker"));
require("./index.less");
const Location = (props) => {
    const { visible, akey, securityJsCode, serviceHost, version = '2.0', onClose, onConfirm, geolocationProps = {}, useGeolocation = true, dialogProps = {}, } = props;
    const prefixCls = 'oak';
    const searchRef = (0, react_1.useRef)();
    const [searchValue, setSearchValue] = (0, react_1.useState)('');
    const [refresh, setRefresh] = (0, react_1.useState)(true); // 点击poi不触发setPositionPickerResult
    const [mode, setMode] = (0, react_1.useState)('dragMap');
    const [city, setCity] = (0, react_1.useState)('全国');
    const [map, setMap] = (0, react_1.useState)();
    const [positionPickerResult, setPositionPickerResult] = (0, react_1.useState)();
    const [searchResult, setSearchResult] = (0, react_1.useState)();
    const [pois, setPois] = (0, react_1.useState)();
    const [currentPoi, setCurrentPoi] = (0, react_1.useState)();
    const [oldPois, setOldPois] = (0, react_1.useState)();
    const [oldPoi, setOldPoi] = (0, react_1.useState)();
    const [loadUI, setLoadUI] = (0, react_1.useState)(false);
    const [focus, setFocus] = (0, react_1.useState)(false);
    const [searchLoading, setSearchLoading] = (0, react_1.useState)(false);
    const [show, setShow] = (0, react_1.useState)(false);
    const setCenter = (center) => {
        if (map) {
            map.setCenter(center);
        }
    };
    const citySearch = () => {
        return new Promise((resolve, reject) => {
            window.AMap?.plugin(['AMap.CitySearch'], () => {
                const citySearchFn = new window.AMap.CitySearch();
                citySearchFn.getLocalCity((status, result) => {
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
    const placeSearch = (value) => {
        // window.AMap存在再搜素
        return new Promise(async (resolve, reject) => {
            window.AMap?.plugin(['AMap.PlaceSearch'], () => {
                const placeSearchFn = new window.AMap.PlaceSearch({
                    pageSize: 20,
                    pageIndex: 1,
                    extensions: 'all',
                    city: city, //城市
                });
                placeSearchFn.search(value, (status, result) => {
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
    (0, react_1.useEffect)(() => {
        // 对安全密钥的支持
        if (serviceHost || securityJsCode) {
            if (serviceHost) {
                window._AMapSecurityConfig = {
                    serviceHost: `${serviceHost}/_AMapService`,
                };
            }
            else {
                window._AMapSecurityConfig = {
                    securityJsCode,
                };
            }
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (window.AMap && !window.AMapUI) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `${window.location.protocol}//webapi.amap.com/ui/1.1/main.js`;
            document.getElementsByTagName('head')[0].appendChild(script);
            script.onload = () => {
                setLoadUI(true);
            };
            script.onerror = (error) => {
                setLoadUI(false);
            };
        }
        else if (window.AMap && window.AMapUI) {
            setLoadUI(true);
        }
    }, [window.AMap]);
    (0, react_1.useEffect)(() => {
        if (currentPoi && !refresh) {
            const lngLat = new window.AMap.LngLat(currentPoi.location.lng, currentPoi.location.lat);
            setCenter(lngLat);
        }
    }, [refresh, currentPoi]);
    (0, react_1.useEffect)(() => {
        // 拖动地图才触发
        if (mode === 'dragMap' && positionPickerResult && refresh) {
            const { regeocode } = positionPickerResult;
            const { pois, addressComponent } = regeocode;
            const pois2 = pois?.map((poi, index) => {
                return {
                    ...poi,
                    pcode: '',
                    citycode: addressComponent?.citycode,
                    adcode: addressComponent.adcode,
                    postcode: '',
                    pname: addressComponent.province,
                    cityname: addressComponent.city,
                    adname: addressComponent?.district,
                };
            });
            setPois(pois2);
            setCurrentPoi(pois2[0]);
        }
    }, [refresh, positionPickerResult]);
    (0, react_1.useEffect)(() => {
        if (searchValue) {
            setSearchLoading(true);
            placeSearch(searchValue).then((result) => {
                const { pois } = result?.poiList;
                setSearchResult(result);
                setShow(true);
                setSearchLoading(false);
                setPois(pois);
                // setCurrentPoi(pois[0]);
            }, (error) => {
                setSearchResult(undefined);
                setShow(true);
                setSearchLoading(false);
            });
        }
    }, [searchValue]);
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        if (visible && map && loadUI) {
            setCenter(map.getCenter());
            citySearch().then((result) => {
                if (result?.info === 'OK') {
                    setCity(result.city);
                }
            });
        }
    }, [visible, map, loadUI]);
    const clearData = () => {
        setMode('dragMap');
        setFocus(false);
        setShow(false);
        setSearchValue('');
        setRefresh(true);
    };
    return ((0, jsx_runtime_1.jsx)(antd_1.Modal, { width: "80%", okText: "\u786E\u5B9A", cancelText: "\u53D6\u6D88", title: "\u9009\u62E9\u4F4D\u7F6E", ...dialogProps, open: visible, destroyOnClose: false, onCancel: () => {
            onClose && onClose();
            clearData();
        }, onOk: () => {
            if (!currentPoi) {
                return;
            }
            onConfirm &&
                onConfirm(currentPoi, mode === 'dragMap' ? positionPickerResult : searchResult);
            clearData();
        }, children: (0, jsx_runtime_1.jsx)("div", { className: `${prefixCls}-location`, children: (0, jsx_runtime_1.jsxs)(antd_1.Row, { gutter: [16, 16], children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 14, children: (0, jsx_runtime_1.jsxs)(map_1.default, { className: `${prefixCls}-location-map`, akey: akey, version: version, useAMapUI: true, mapRef: (instance) => {
                                if (instance && instance.map && !map) {
                                    setMap(instance.map);
                                }
                            }, mapProps: {
                                onDragStart: () => {
                                    setRefresh(true);
                                    setMode('dragMap');
                                    setSearchValue('');
                                    setShow(false);
                                },
                            }, children: [(0, jsx_runtime_1.jsx)(PositionPicker_1.default, { loadUI: loadUI, __map__: map, onSuccess: (result) => {
                                        setPositionPickerResult(result);
                                    } }), useGeolocation && ((0, jsx_runtime_1.jsx)(react_amap_1.Geolocation, { maximumAge: 100000, borderRadius: "5px", position: "RB", offset: [10, 10], zoomToAccuracy: true, showCircle: true, ...geolocationProps, onComplete: (data) => { }, onError: (err) => {
                                        console.error(err);
                                    } }))] }) }), (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 10, children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(antd_1.List, { className: `${prefixCls}-location-list`, header: (0, jsx_runtime_1.jsxs)("div", { className: `${prefixCls}-location-list-header`, children: [(0, jsx_runtime_1.jsx)(antd_1.Input, { ref: searchRef, placeholder: "\u641C\u7D22\u5730\u70B9", value: searchValue, allowClear: true, onChange: (e) => {
                                                setSearchValue(e.target.value);
                                            }, prefix: (0, jsx_runtime_1.jsx)(icons_1.SearchOutlined, {}), onFocus: () => {
                                                setMode('searchPoi');
                                                setFocus(true);
                                            }, onBlur: () => {
                                                setFocus(false);
                                            } }), mode === 'searchPoi' && ((0, jsx_runtime_1.jsx)(antd_1.Button, { style: { marginLeft: 5 }, type: "link", onClick: () => {
                                                setMode('dragMap');
                                                setSearchValue('');
                                                setShow(false);
                                                //@ts-ignore
                                                searchRef?.current?.blur();
                                            }, children: "\u53D6\u6D88" }))] }), children: [mode === 'dragMap' &&
                                        pois?.map((poi, index) => {
                                            return ((0, jsx_runtime_1.jsx)("div", { onClick: () => {
                                                    setRefresh(false);
                                                    setCurrentPoi(poi);
                                                }, children: (0, jsx_runtime_1.jsx)(antd_1.List.Item, { actions: [
                                                        (0, jsx_runtime_1.jsx)("div", { style: {
                                                                width: 24,
                                                            }, children: currentPoi?.id ===
                                                                poi.id && ((0, jsx_runtime_1.jsx)(icons_1.CheckCircleFilled, { className: `${prefixCls}-location-list-checked` })) }),
                                                    ], children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: poi.name, description: `${poi.distance
                                                            ? `${poi.distance}m内 | `
                                                            : ''}${poi.address}` }) }) }, poi.id));
                                        }), mode === 'searchPoi' && ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [searchLoading && ((0, jsx_runtime_1.jsx)("div", { className: `${prefixCls}-location-list-loadingBox`, children: (0, jsx_runtime_1.jsx)(antd_1.Spin, { delay: 0, spinning: true, size: "default" }) })), pois?.length
                                                ? pois.map((poi, index) => {
                                                    return ((0, jsx_runtime_1.jsx)("div", { onClick: () => {
                                                            setRefresh(false);
                                                            setCurrentPoi(poi);
                                                        }, children: (0, jsx_runtime_1.jsx)(antd_1.List.Item, { actions: [
                                                                (0, jsx_runtime_1.jsx)("div", { style: {
                                                                        width: 24,
                                                                    }, children: currentPoi?.id ===
                                                                        poi.id && ((0, jsx_runtime_1.jsx)(icons_1.CheckCircleFilled, { className: `${prefixCls}-location-list-checked` })) }),
                                                            ], children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: poi.name, description: `${poi.distance
                                                                    ? `${poi.distance}m内 | `
                                                                    : ''}${poi.address}` }) }) }, poi.id));
                                                })
                                                : show &&
                                                    !searchLoading && ((0, jsx_runtime_1.jsx)(antd_1.Empty, { description: "\u65E0\u641C\u7D22\u7ED3\u679C", image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE }))] }))] }) }) })] }) }) }));
};
exports.default = Location;
