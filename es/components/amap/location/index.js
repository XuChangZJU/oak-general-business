import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Row, Col, Button, Input, List, Empty, Spin, } from 'antd';
import { SearchOutlined, CheckCircleFilled } from '@ant-design/icons';
import { Geolocation } from '@uiw/react-amap';
import Map from './../map';
import PositionPicker from './PositionPicker';
import './index.less';
const Location = (props) => {
    const { visible, akey, securityJsCode, serviceHost, version = '2.0', onClose, onConfirm, geolocationProps = {}, useGeolocation = true, dialogProps = {}, } = props;
    const prefixCls = 'oak';
    const searchRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    const [refresh, setRefresh] = useState(true); // 点击poi不触发setPositionPickerResult
    const [mode, setMode] = useState('dragMap');
    const [city, setCity] = useState('全国');
    const [map, setMap] = useState();
    const [positionPickerResult, setPositionPickerResult] = useState();
    const [searchResult, setSearchResult] = useState();
    const [pois, setPois] = useState();
    const [currentPoi, setCurrentPoi] = useState();
    const [oldPois, setOldPois] = useState();
    const [oldPoi, setOldPoi] = useState();
    const [loadUI, setLoadUI] = useState(false);
    const [focus, setFocus] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [show, setShow] = useState(false);
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
    useEffect(() => {
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
    useEffect(() => {
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
    useEffect(() => {
        if (currentPoi && !refresh) {
            const lngLat = new window.AMap.LngLat(currentPoi.location.lng, currentPoi.location.lat);
            setCenter(lngLat);
        }
    }, [refresh, currentPoi]);
    useEffect(() => {
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
    useEffect(() => {
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
    useEffect(() => {
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
    useEffect(() => {
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
    return (_jsx(Modal, { width: "80%", okText: "\u786E\u5B9A", cancelText: "\u53D6\u6D88", title: "\u9009\u62E9\u4F4D\u7F6E", ...dialogProps, open: visible, destroyOnClose: false, onCancel: () => {
            onClose && onClose();
            clearData();
        }, onOk: () => {
            if (!currentPoi) {
                return;
            }
            onConfirm &&
                onConfirm(currentPoi, mode === 'dragMap' ? positionPickerResult : searchResult);
            clearData();
        }, children: _jsx("div", { className: `${prefixCls}-location`, children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, sm: 14, children: _jsxs(Map, { className: `${prefixCls}-location-map`, akey: akey, version: version, useAMapUI: true, mapRef: (instance) => {
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
                            }, children: [_jsx(PositionPicker, { loadUI: loadUI, __map__: map, onSuccess: (result) => {
                                        setPositionPickerResult(result);
                                    } }), useGeolocation && (_jsx(Geolocation, { maximumAge: 100000, borderRadius: "5px", position: "RB", offset: [10, 10], zoomToAccuracy: true, showCircle: true, ...geolocationProps, onComplete: (data) => { }, onError: (err) => {
                                        console.error(err);
                                    } }))] }) }), _jsx(Col, { xs: 24, sm: 10, children: _jsx("div", { children: _jsxs(List, { className: `${prefixCls}-location-list`, header: _jsxs("div", { className: `${prefixCls}-location-list-header`, children: [_jsx(Input, { ref: searchRef, placeholder: "\u641C\u7D22\u5730\u70B9", value: searchValue, allowClear: true, onChange: (e) => {
                                                setSearchValue(e.target.value);
                                            }, prefix: _jsx(SearchOutlined, {}), onFocus: () => {
                                                setMode('searchPoi');
                                                setFocus(true);
                                            }, onBlur: () => {
                                                setFocus(false);
                                            } }), mode === 'searchPoi' && (_jsx(Button, { style: { marginLeft: 5 }, type: "link", onClick: () => {
                                                setMode('dragMap');
                                                setSearchValue('');
                                                setShow(false);
                                                //@ts-ignore
                                                searchRef?.current?.blur();
                                            }, children: "\u53D6\u6D88" }))] }), children: [mode === 'dragMap' &&
                                        pois?.map((poi, index) => {
                                            return (_jsx("div", { onClick: () => {
                                                    setRefresh(false);
                                                    setCurrentPoi(poi);
                                                }, children: _jsx(List.Item, { actions: [
                                                        _jsx("div", { style: {
                                                                width: 24,
                                                            }, children: currentPoi?.id ===
                                                                poi.id && (_jsx(CheckCircleFilled, { className: `${prefixCls}-location-list-checked` })) }),
                                                    ], children: _jsx(List.Item.Meta, { title: poi.name, description: `${poi.distance
                                                            ? `${poi.distance}m内 | `
                                                            : ''}${poi.address}` }) }) }, poi.id));
                                        }), mode === 'searchPoi' && (_jsxs(React.Fragment, { children: [searchLoading && (_jsx("div", { className: `${prefixCls}-location-list-loadingBox`, children: _jsx(Spin, { delay: 0, spinning: true, size: "default" }) })), pois?.length
                                                ? pois.map((poi, index) => {
                                                    return (_jsx("div", { onClick: () => {
                                                            setRefresh(false);
                                                            setCurrentPoi(poi);
                                                        }, children: _jsx(List.Item, { actions: [
                                                                _jsx("div", { style: {
                                                                        width: 24,
                                                                    }, children: currentPoi?.id ===
                                                                        poi.id && (_jsx(CheckCircleFilled, { className: `${prefixCls}-location-list-checked` })) }),
                                                            ], children: _jsx(List.Item.Meta, { title: poi.name, description: `${poi.distance
                                                                    ? `${poi.distance}m内 | `
                                                                    : ''}${poi.address}` }) }) }, poi.id));
                                                })
                                                : show &&
                                                    !searchLoading && (_jsx(Empty, { description: "\u65E0\u641C\u7D22\u7ED3\u679C", image: Empty.PRESENTED_IMAGE_SIMPLE }))] }))] }) }) })] }) }) }));
};
export default Location;
