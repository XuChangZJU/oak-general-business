"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'area',
    projection: {
        id: 1,
        name: 1,
        depth: 1,
        level: 1,
    },
    filters: [
        {
            filter: {
                parent: {
                    level: 'country',
                },
            },
        },
    ],
    isList: true,
    formData: function (_a) {
        var arealist = _a.data;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, ({
                        arealist: arealist,
                    })];
            });
        });
    },
    properties: {
        depth: Number,
    },
    methods: {
        onWechatMpItemClicked: function (input) {
            var dataset = this.resolveInput(input).dataset;
            var item = this.state.arealist.find(function (ele) { return (ele === null || ele === void 0 ? void 0 : ele.id) === dataset.id; });
            this.onItemClicked(item);
        },
        onItemClicked: function (item) {
            var _a = item, depth = _a.depth, id = _a.id;
            if (depth !== this.props.depth) {
                this.setFilters([
                    {
                        filter: {
                            parentId: id,
                        },
                    },
                ]);
            }
            else {
                this.setForeignKey(id);
            }
        },
    },
});
