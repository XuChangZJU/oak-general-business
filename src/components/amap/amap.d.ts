/// <reference types="@uiw/react-amap-types" />

declare namespace AMap {
    class PlaceSearch {
        constructor(opts: PlaceSearchOptions);

        search(
            keyword: string,
            callBack: (status: string, result: SearchResult) => void
        ): void;

        setType(type: string): void;
    }

    class CitySearch {
        constructor();

        getLocalCity(
            callBack: (status: string, result: CitySearchResult) => void
        ): void;
    }

    type PlaceSearchOptions = {
        pageSize?: number;
        pageIndex?: number;
        extensions?: 'base' | 'all';
        city?: string; //兴趣点城市 可选值：城市名（中文或中文全拼）、citycode、adcode 默认值：“全国”
        citylimit?: boolean;
        map?: Map;
        children?: number;
        type?: string;
        lang?: string;
        pane?: string | HTMLElement;
        showCover?: boolean;
        renderStyle?: string;
        autoFitView?: boolean;
    };

    type SearchResult = {
        info: string;
        poiList: PoiList;
        keywordList: Array<string>;
        cityList: Array<CityInfo>;
    };

    type PoiList = {
        pois: Array<Poi>;
        pageIndex: number;
        pageSize: number;
        count: number;
    };

    type CityInfo = {
        name: string;
        citycode: string;
        adcode: string;
        count: string;
    };

    type Poi = {
        id: string; // Poi的唯一标识id
        name: string; //Poi名称
        type: string; //Poi类型
        tel: string; //Poi电话
        distance: number; //该Poi到请求坐标的距离，单位：米
        address: string; //Poi地址信息
        location: LngLat; //Poi坐标
        website: string; //网址
        pcode: string; //poi所在省份编码
        citycode: string; //poi所在城市编码
        adcode: string; // poi所在区域编码
        postcode: string; //邮编
        pname: string; //poi所在省份
        cityname: string; //poi所在城市名称
        adname: string; //poi所在行政区名称
        email: string;
    };

    class Geocoder {
        constructor(opts: GeocoderOptions);

        setCity?(city: string): void;
        getLocation?(
            address: String,
            callBack: (status: string, result: GeocodeResult) => void
        ): void;

        getAddress?(
            location: LngLat | Array<LngLat>,
            callBack: (status: string, result: ReGeocodeResult) => void
        ): void;
    }

    type GeocoderOptions = {
        city: string;
        radius: number;
        lang: string;
        batch: string;
        extensions: string;
    };

    type GeocodeResult = {
        info: string;
        geocodes: Array<Geocode>;
        resultNum: number;
    };

    type Geocode = {
        addressComponent: AddressComponent;
        formattedAddress: string;
        location: LngLat;
        adcode: string;
        level: string;
    };

    type ReGeocode = {
        addressComponent: AMap.AddressComponent;
        formattedAddress: string;
        roads: Array<AMap.Road>;
        crosses: Array<AMap.Cross>;
        pois: Array<ReGeocodePoi>;
    };

    type ReGeocodePoi = {
        id: string; // Poi的唯一标识id
        name: string; //Poi名称
        type: string; //Poi类型
        tel: string; //Poi电话
        distance: number; //该Poi到请求坐标的距离，单位：米
        direction: string; //该Poi相对于请求坐标的方向
        address: string; //Poi地址信息
        location: LngLat; //Poi坐标
        businessArea: string; //Poi所在商圈名称;
    };

    type ReGeocodeResult = {
        info: string;
        regeocode: ReGeocode;
    };

    type CitySearchResult = {
        info: string;
        adcode: string;
        city: string;
        infocode: string;
        province: string;
        rectangle: string;
        status: string;
        bounds: AMap.Bounds;
    };

    type ControlType = AMap.ControlType | 'AMap.CitySearch';

    //   function plugin(
    //       ControlType: Array<ControlType>,
    //       callBack: () => void
    //   ): void;

}
