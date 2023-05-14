"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    isList: true,
    lifetimes: {
        ready: function () {
            var _a, _b;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var areas, areaId, subways;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.features.cache.refresh('area', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    level: 1,
                                },
                                filter: {
                                    id: {
                                        $in: {
                                            entity: 'subway',
                                            data: {
                                                areaId: 1,
                                            },
                                        },
                                    },
                                    level: 'city',
                                },
                            })];
                        case 1:
                            areas = (_c.sent()).data;
                            areaId = this.props.areaId || areas[0].id;
                            return [4 /*yield*/, this.features.cache.refresh('subway', {
                                    data: {
                                        id: 1,
                                        name: 1,
                                    },
                                    filter: {
                                        areaId: areaId,
                                    },
                                })];
                        case 2:
                            subways = (_c.sent()).data;
                            this.setState({
                                areas: areas,
                                subways: subways,
                                subwayId: (_a = subways[0]) === null || _a === void 0 ? void 0 : _a.id,
                            });
                            this.getStations((_b = subways[0]) === null || _b === void 0 ? void 0 : _b.id);
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
    data: {
        open: false,
        stationIds: [],
    },
    properties: {
        areaId: '',
        onCancel: undefined,
        onConfirm: undefined,
        selectIds: [],
    },
    methods: {
        setAeraId: function (areaId) {
            this.setState({
                areaId: areaId,
            });
        },
        setCheckedList: function (value, flag) {
            var stationIds = this.state.stationIds;
            if (flag) {
                stationIds.push(value);
            }
            else {
                var index = stationIds.indexOf(value);
                stationIds.splice(index, 1);
            }
            this.setState({
                stationIds: tslib_1.__spreadArray([], tslib_1.__read(stationIds), false),
            });
        },
        getSubways: function (areaId) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var subways;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.setState({
                                areaId: areaId,
                            });
                            return [4 /*yield*/, this.features.cache.refresh('subway', {
                                    data: {
                                        id: 1,
                                        name: 1,
                                    },
                                    filter: {
                                        areaId: areaId,
                                    },
                                })];
                        case 1:
                            subways = (_a.sent()).data;
                            this.getStations(subways[0].id);
                            this.setState({
                                subways: subways,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        getStations: function (subwayId) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var subwayStations, stations;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.setState({
                                subwayId: subwayId,
                            });
                            return [4 /*yield*/, this.features.cache.refresh('subwayStation', {
                                    data: {
                                        id: 1,
                                        subwayId: 1,
                                        stationId: 1,
                                        station: {
                                            id: 1,
                                            name: 1,
                                        },
                                    },
                                    filter: {
                                        subwayId: subwayId,
                                    },
                                })];
                        case 1:
                            subwayStations = (_a.sent()).data;
                            stations = subwayStations === null || subwayStations === void 0 ? void 0 : subwayStations.map(function (ele) { return ({
                                label: ele.station.name,
                                value: ele.station.id,
                            }); });
                            this.setState({
                                stations: stations,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        cancel: function () {
            this.setState({
                stationIds: [],
            });
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        },
        confirm: function () {
            if (this.props.onConfirm) {
                this.props.onConfirm(this.state.stationIds);
            }
            this.setState({
                stationIds: [],
            });
        },
    },
});
