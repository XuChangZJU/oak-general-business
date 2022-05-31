
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
            filter: {
                parent: {
                    level: 'country',
                },
            }
        }
    ],
    isList: true,
    formData: async ({ data: arealist }) => ({
        arealist,
    }),
}, {
    properties: {
        depth: Number,
    },
    methods: {
        onItemClicked(options: WechatMiniprogram.Touch) {            
            const item = (this.data.arealist!).find(
                (ele) => ele.id === options.currentTarget.dataset.id
            );

            const { depth, id } = item!;
            if (depth !== this.data.depth) {
                this.setFilters([{
                    filter: {                        
                        parentId: id,
                    }
                }]);
            }
            else {
                this.setForeignKey(id!);
            }
        }
    }
});