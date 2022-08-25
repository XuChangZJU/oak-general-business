
import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    Row,
    Col,
    List,
    Input,
    InputValue,
    Button,
    Loading,
    DialogProps,
} from 'tdesign-react'; 
import { SearchIcon, CheckCircleFilledIcon } from 'tdesign-icons-react';
import { Geolocation, GeolocationProps } from '@uiw/react-amap';
import Map from './../map';
import PositionPicker from './PositionPicker'
import Style from './index.module.less';

const { ListItem, ListItemMeta } = List;

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
    dialogProps?: DialogProps;
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
    const searchRef = useRef();
    const [searchValue, setSearchValue] = useState<InputValue>('');
    const [refresh, setRefresh] = useState(true); // 点击poi不触发setPositionPickerResult
    const [mode, setMode] = useState<Mode>('dragMap');

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

    const placeSearch = (value: string): Promise<AMap.SearchResult> => {
        // window.AMap存在再搜素
        return new Promise((resolve, reject) => {
            window.AMap?.plugin(['AMap.PlaceSearch'], () => {
                const placeSearch = new window.AMap.PlaceSearch({
                    pageSize: 20,
                    pageIndex: 1,
                    extensions: 'all',
                    city: '全国', //城市
                });
                placeSearch.search(value, (status, result) => {
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
                    setCurrentPoi(pois[0]);
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
        <Dialog
            width="80%"
            {...dialogProps}
            visible={visible}
            onClose={() => {
                onClose && onClose();
                clearData();
            }}
            onConfirm={() => {
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
            <Row>
                <Col xs={12} sm={7}>
                    <Map
                        className={Style.map}
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
                <Col xs={12} sm={5}>
                    <div>
                        <List
                            header={
                                <div className={Style.searchBox}>
                                    <Input
                                        ref={searchRef}
                                        placeholder="搜索地点"
                                        value={searchValue}
                                        clearable
                                        onChange={(value) => {
                                            setSearchValue(value);
                                        }}
                                        onClear={() => {
                                            setSearchValue('');
                                        }}
                                        prefixIcon={<SearchIcon />}
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
                                            variant="text"
                                            theme="primary"
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
                            className={Style.list}
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
                                            <ListItem
                                                action={
                                                    currentPoi?.id ===
                                                    poi.id ? (
                                                        <CheckCircleFilledIcon
                                                            className={
                                                                Style.check
                                                            }
                                                            size={24}
                                                        />
                                                    ) : (
                                                        <div
                                                            style={{
                                                                width: 24,
                                                            }}
                                                        />
                                                    )
                                                }
                                            >
                                                <ListItemMeta
                                                    title={poi.name}
                                                    description={`${
                                                        poi.distance
                                                            ? `${poi.distance}m内 | `
                                                            : ''
                                                    }${poi.address}`}
                                                />
                                            </ListItem>
                                        </div>
                                    );
                                })}
                            {mode === 'searchPoi' && (
                                <React.Fragment>
                                    {searchLoading && (
                                        <div className={Style.loadingBox}>
                                            <Loading
                                                delay={0}
                                                fullscreen={false}
                                                indicator
                                                inheritColor={false}
                                                loading
                                                preventScrollThrough
                                                showOverlay
                                                size="medium"
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
                                                          setCurrentPoi(poi);
                                                      }}
                                                  >
                                                      <ListItem
                                                          action={
                                                              currentPoi?.id ===
                                                              poi.id ? (
                                                                  <CheckCircleFilledIcon
                                                                      className={
                                                                          Style.check
                                                                      }
                                                                      size={24}
                                                                  />
                                                              ) : (
                                                                  <div
                                                                      style={{
                                                                          width: 24,
                                                                      }}
                                                                  />
                                                              )
                                                          }
                                                      >
                                                          <ListItemMeta
                                                              title={poi.name}
                                                              description={`${
                                                                  poi.distance
                                                                      ? `${poi.distance}m内 | `
                                                                      : ''
                                                              }${poi.address}`}
                                                          />
                                                      </ListItem>
                                                  </div>
                                              );
                                          })
                                        : show && (
                                              <div className={Style.noData}>
                                                  无搜素结果
                                              </div>
                                          )}
                                </React.Fragment>
                            )}
                        </List>
                    </div>
                </Col>
            </Row>
        </Dialog>
    );
};

export default Location;
