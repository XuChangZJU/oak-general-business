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
            filter: () => ({
                parent: {
                    level: 'country',
                },
            }),
        },
    ],
    isList: true,
    formData: ({ data: areas }) => ({
        areas,
    }),
    properties: {
        depth: undefined,
        itemSelectedEvent: '',
    },
    methods: {
        onWechatMpItemClicked(input) {
            const { dataset } = this.resolveInput(input);
            const item = this.state.areas.find((ele) => ele?.id === dataset.id);
            this.onItemClicked(item);
        },
        onItemClicked(item) {
            const { depth, id } = item;
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
                this.pubEvent(this.props.itemSelectedEvent, {
                    id: item.id,
                });
            }
            else {
                console.log('area selected:', item);
            }
        },
    },
});
