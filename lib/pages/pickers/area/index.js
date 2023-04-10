"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        var areas = _a.data;
        return ({
            areas: areas,
        });
    },
    properties: {
        depth: undefined,
        itemSelectedEvent: '',
    },
    methods: {
        onWechatMpItemClicked: function (input) {
            var dataset = this.resolveInput(input).dataset;
            var item = this.state.areas.find(function (ele) { return (ele === null || ele === void 0 ? void 0 : ele.id) === dataset.id; });
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
            else if (this.props.itemSelectedEvent) {
                this.pub(this.props.itemSelectedEvent, {
                    id: item.id,
                });
            }
            else {
                console.log('area selected:', item);
            }
        },
    },
});
