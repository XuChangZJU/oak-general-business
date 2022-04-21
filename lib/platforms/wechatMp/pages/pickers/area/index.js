"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const polyfill_1 = require("../../../../../typings/polyfill");
(0, polyfill_1.OakPage)({
    path: 'area-picker',
    entity: 'area',
    projection: {
        id: 1,
        name: 1,
        depth: 1,
        level: 1,
    },
    filters: [
        {
            parent: {
                level: 'country',
            },
        }
    ],
    isList: true,
    formData: (arealist) => ({
        arealist,
    }),
}, {
    properties: {
        depth: Number,
    },
    methods: {
        onItemClicked(options) {
            const item = (this.data.arealist).find((ele) => ele.id === options.currentTarget.dataset.id);
            const { depth, id } = item;
            if (depth !== this.data.depth) {
                this.setFilters([{
                        parentId: id,
                    }]);
            }
            else {
                this.setForeignKey(id);
            }
        }
    }
});
