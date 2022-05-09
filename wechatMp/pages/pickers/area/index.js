"use strict";
OakPage({
    path: 'area:picker',
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
    formData: async (arealist) => ({
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
