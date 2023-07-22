"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'subway',
    projection: {
        id: 1,
        name: 1,
        areaId: 1,
        subwayStation$subway: {
            $entity: 'subwayStation',
            data: {
                id: 1,
                subwayId: 1,
                stationId: 1,
                station: {
                    id: 1,
                    name: 1,
                }
            }
        }
    },
    pagination: {
        currentPage: 1,
        pageSize: 100,
        more: true,
    },
    isList: true,
    data: {
        areaId: '330100',
        areaOptions: [],
    },
    properties: {},
    filters: [
        {
            filter: function () {
                return {
                    areaId: '330100'
                };
            },
            '#name': 'area',
        },
        // {
        //     filter() {
        //         return {
        //         };
        //     },
        //     '#name': 'type',
        // },
    ],
    listeners: {},
    formData: function (_a) {
        var subway = _a.data;
        var treeData = subway
            // ?.filter((ele) => !ele!.subwayStation$subway)
            .map(function (ele) {
            return {
                title: ele.name,
                key: ele.id,
                isLeaf: false,
                children: ele.subwayStation$subway
                    .map(function (ele2) { return ({
                    title: ele2.station.name,
                    key: "".concat(ele.id, "/").concat(ele2.station.id),
                    isLeaf: true,
                }); }) || [],
            };
        });
        return {
            treeData: treeData,
        };
    },
    lifetimes: {
        ready: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var area, areaOptions;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.features.cache.refresh('area', {
                                data: {
                                    id: 1,
                                    name: 1,
                                    level: 1,
                                },
                                filter: {
                                    subway$area: {},
                                    level: 'city',
                                },
                            })];
                        case 1:
                            area = (_a.sent()).data;
                            areaOptions = area === null || area === void 0 ? void 0 : area.map(function (ele) { return ({
                                label: ele.name,
                                value: ele.id,
                            }); });
                            this.setState({
                                areaOptions: areaOptions,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
    methods: {
        setFilterByAreaId: function (areaId) {
            this.addNamedFilter({
                filter: {
                    areaId: areaId,
                },
                '#name': 'area',
            }, true);
        },
        setAreaId: function (areaId) {
            this.setState({
                areaId: areaId,
            });
        }
    },
});
