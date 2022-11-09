
import React, { useState, useEffect, useRef } from 'react';
import {
    Modal,
    Row,
    Col,
    ModalProps,
    Button,
    Input,
    List,
    Empty,
    Spin,
} from 'antd'; 
import { SearchOutlined, CheckCircleFilled } from '@ant-design/icons';
import { Geolocation, GeolocationProps } from '@uiw/react-amap';
import Map from './../map';
import PositionPicker from './PositionPicker'
import './index.less';


export type LocationProps = {
    akey: string;
    version?: string;
    visible?: boolean;
    className?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    onConfirm?: (
        poi: Poi,
        result?: AMap.SearchResult | AMapUI.PositionPickerResult
    ) => void;
    geolocationProps?: GeolocationProps;
    useGeolocation?: boolean;
    dialogProps?: ModalProps;
};

export type Poi = {
    id: string; // Poi的唯一标识id
    name: string; //Poi名称
    type: string; //Poi类型
    tel: string; //Poi电话
    direction?: string;
    distance: number; //该Poi到请求坐标的距离，单位：米
    address: string; //Poi地址信息
    location: AMap.LngLat; //Poi坐标
    website?: string; //网址
    pcode: string; //poi所在省份编码
    citycode: string; //poi所在城市编码
    adcode: string; // poi所在区域编码
    postcode?: string; //邮编
    pname: string; //poi所在省份
    cityname: string; //poi所在城市名称
    adname: string; //poi所在行政区名称
    email?: string //邮箱;
    businessArea?: string; // Poi所在商圈名称;
};

type Mode = 'dragMap' | 'searchPoi';


const Location = (props: LocationProps) => {
    const {
        visible,
        akey,
        version = '2.0',
        onClose,
        onConfirm,
        geolocationProps = {},
        useGeolocation = true,
        dialogProps = {},
    } = props;
    const prefixCls = 'oak';

    const searchRef = useRef<any>();
    const [searchValue, setSearchValue] = useState<string>('');
    const [refresh, setRefresh] = useState(true); // 点击poi不触发setPositionPickerResult
    const [mode, setMode] = useState<Mode>('dragMap');
    const [city, setCity] = useState<string>('全国');

    const [map, setMap] = useState<AMap.Map>();

    const [positionPickerResult, setPositionPickerResult] = useState<AMapUI.PositionPickerResult>();
    const [searchResult, setSearchResult] = useState<AMap.SearchResult>();

    const [pois, setPois] = useState<Poi[]>();
    const [currentPoi, setCurrentPoi] = useState<Poi>();
    const [oldPois, setOldPois] = useState<Poi[]>();
    const [oldPoi, setOldPoi] = useState<Poi>();

    const [loadUI, setLoadUI] = useState(false);
    const [focus, setFocus] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [show, setShow] = useState(false);

    const setCenter = (center: AMap.LngLat) => {
        if (map) {
            map.setCenter(center);
        }
    };

    const citySearch = (): Promise<AMap.CitySearchResult> => {
        return new Promise((resolve, reject) => {
            window.AMap?.plugin(['AMap.CitySearch' as AMap.ControlType], () => {
                const citySearchFn = new window.AMap.CitySearch();
                citySearchFn.getLocalCity(
                    (status: string, result: AMap.CitySearchResult) => {
                        if (status === 'complete') {
                            resolve(result);
                        } else {
                            reject(result);
                        }
                    }
                );
            });
        });
    };

    const placeSearch = (value: string): Promise<AMap.SearchResult> => {
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
                    } else {
                        reject(result);
                    }
                });
            });
        });
    };


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
            const lngLat = new window.AMap.LngLat(
                currentPoi.location.lng!,
                currentPoi.location.lat!
            );
            setCenter(lngLat);
        }
    }, [refresh, currentPoi]);

    useEffect(() => {
        // 拖动地图才触发
        if (mode === 'dragMap' && positionPickerResult && refresh) {
            const { regeocode } = positionPickerResult;
            const { pois, addressComponent } = regeocode;

            const pois2: Poi[] = pois?.map((poi, index) => {
                return {
                    ...poi,
                    pcode: '',
                    citycode: addressComponent?.citycode,
                    adcode: addressComponent.adcode,
                    postcode: '',
                    pname: addressComponent.province,
                    cityname: addressComponent.city,
                    adname: addressComponent?.district,
                } as Poi;
            });

            setPois(pois2);
            setCurrentPoi(pois2[0]);
        }
    }, [refresh, positionPickerResult]);

    useEffect(() => {
        if (searchValue) {
            setSearchLoading(true);
            placeSearch(searchValue as string).then(
                (result) => {
                    const { pois } = result?.poiList;
                    setSearchResult(result);
                    setShow(true);
                    setSearchLoading(false);
                    setPois(pois);
                    // setCurrentPoi(pois[0]);
                },
                (error) => {
                    setSearchResult(undefined);
                    setShow(true);
                    setSearchLoading(false);
                }
            );
        }

    }, [searchValue])

    useEffect(() => {
        if (mode === 'searchPoi') {
            setOldPoi(currentPoi);
            setOldPois(pois);
            setPois([]);
            setCurrentPoi(undefined);
        } else {
            setPois(oldPois);
            setCurrentPoi(oldPoi);
        }

    }, [mode])

    useEffect(() => {
        if (visible && map && loadUI) {
            setCenter(map.getCenter());
            citySearch().then(
                (result) => {
                    if (result?.info === 'OK') {
                        setCity(result.city);
                    }
                   

                }
            );
        }
    }, [visible, map, loadUI]);

    const clearData = () => {
        setMode('dragMap');
        setFocus(false);
        setShow(false);
        setSearchValue('');
        setRefresh(true);
    };


    return (
        <Modal
            width="80%"
            okText="确定"
            cancelText="取消"
            title="选择位置"
            {...dialogProps}
            open={visible}
            destroyOnClose={false}
            onCancel={() => {
                onClose && onClose();
                clearData();
            }}
            onOk={() => {
                if (!currentPoi) {
                    return;
                }
                onConfirm &&
                    onConfirm(
                        currentPoi,
                        mode === 'dragMap' ? positionPickerResult : searchResult
                    );
                clearData();
            }}
        >
            <div className={`${prefixCls}-location`}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={14}>
                        <Map
                            className={`${prefixCls}-location-map`}
                            akey={akey}
                            version={version}
                            useAMapUI={true}
                            mapRef={(instance) => {
                                if (instance && instance.map && !map) {
                                    setMap(instance.map);
                                }
                            }}
                            mapProps={{
                                onDragStart: () => {
                                    setRefresh(true);
                                    setMode('dragMap');
                                    setSearchValue('');
                                    setShow(false);
                                },
                            }}
                        >
                            <PositionPicker
                                loadUI={loadUI}
                                __map__={map}
                                onSuccess={(result) => {
                                    setPositionPickerResult(result);
                                }}
                            />
                            {useGeolocation && (
                                <Geolocation
                                    maximumAge={100000}
                                    borderRadius="5px"
                                    position="RB"
                                    offset={[10, 10]}
                                    zoomToAccuracy={true}
                                    showCircle={true}
                                    {...geolocationProps}
                                    onComplete={(data) => {}}
                                    onError={(err) => {
                                        console.error(err);
                                    }}
                                />
                            )}
                        </Map>
                    </Col>
                    <Col xs={24} sm={10}>
                        <div>
                            <List
                                className={`${prefixCls}-location-list`}
                                header={
                                    <div
                                        className={`${prefixCls}-location-list-header`}
                                    >
                                        <Input
                                            ref={searchRef}
                                            placeholder="搜索地点"
                                            value={searchValue}
                                            allowClear
                                            onChange={(e) => {
                                                setSearchValue(e.target.value);
                                            }}
                                            prefix={<SearchOutlined />}
                                            onFocus={() => {
                                                setMode('searchPoi');
                                                setFocus(true);
                                            }}
                                            onBlur={() => {
                                                setFocus(false);
                                            }}
                                        />
                                        {mode === 'searchPoi' && (
                                            <Button
                                                style={{ marginLeft: 5 }}
                                                type="link"
                                                onClick={() => {
                                                    setMode('dragMap');
                                                    setSearchValue('');
                                                    setShow(false);
                                                    //@ts-ignore
                                                    searchRef?.current?.blur();
                                                }}
                                            >
                                                取消
                                            </Button>
                                        )}
                                    </div>
                                }
                            >
                                {mode === 'dragMap' &&
                                    pois?.map((poi, index) => {
                                        return (
                                            <div
                                                key={poi.id}
                                                onClick={() => {
                                                    setRefresh(false);
                                                    setCurrentPoi(poi);
                                                }}
                                            >
                                                <List.Item
                                                    actions={[
                                                        <div
                                                            style={{
                                                                width: 24,
                                                            }}
                                                        >
                                                            {currentPoi?.id ===
                                                                poi.id && (
                                                                <CheckCircleFilled
                                                                    className={`${prefixCls}-location-list-checked`}
                                                                />
                                                            )}
                                                        </div>,
                                                    ]}
                                                >
                                                    <List.Item.Meta
                                                        title={poi.name}
                                                        description={`${
                                                            poi.distance
                                                                ? `${poi.distance}m内 | `
                                                                : ''
                                                        }${poi.address}`}
                                                    />
                                                </List.Item>
                                            </div>
                                        );
                                    })}
                                {mode === 'searchPoi' && (
                                    <React.Fragment>
                                        {searchLoading && (
                                            <div
                                                className={`${prefixCls}-location-list-loadingBox`}
                                            >
                                                <Spin
                                                    delay={0}
                                                    spinning
                                                    size="default"
                                                />
                                            </div>
                                        )}
                                        {pois?.length
                                            ? pois.map((poi, index) => {
                                                  return (
                                                      <div
                                                          key={poi.id}
                                                          onClick={() => {
                                                              setRefresh(false);
                                                              setCurrentPoi(
                                                                  poi
                                                              );
                                                          }}
                                                      >
                                                          <List.Item
                                                              actions={[
                                                                  <div
                                                                      style={{
                                                                          width: 24,
                                                                      }}
                                                                  >
                                                                      {currentPoi?.id ===
                                                                          poi.id && (
                                                                          <CheckCircleFilled
                                                                              className={`${prefixCls}-location-list-checked`}
                                                                          />
                                                                      )}
                                                                  </div>,
                                                              ]}
                                                          >
                                                              <List.Item.Meta
                                                                  title={
                                                                      poi.name
                                                                  }
                                                                  description={`${
                                                                      poi.distance
                                                                          ? `${poi.distance}m内 | `
                                                                          : ''
                                                                  }${
                                                                      poi.address
                                                                  }`}
                                                              />
                                                          </List.Item>
                                                      </div>
                                                  );
                                              })
                                            : show &&
                                              !searchLoading && (
                                                  <Empty
                                                      description="无搜索结果"
                                                      image={
                                                          Empty.PRESENTED_IMAGE_SIMPLE
                                                      }
                                                  />
                                              )}
                                    </React.Fragment>
                                )}
                            </List>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default Location;
