
export default OakPage({
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
            },
        },
    ],
    isList: true,
    formData: async ({ data: arealist }) => ({
        arealist,
    }),

    properties: {
        depth: Number,
    },
    methods: {
        onItemClicked(input: any) {
            const { dataset } = this.resolveInput(input);
            const item = this.state.arealist!.find(
                (ele) => ele?.id === dataset!.id
            );

            const { depth, id } = item!;
            if (depth !== this.props.depth) {
                this.setFilters([
                    {
                        filter: {
                            parentId: id,
                        },
                    },
                ]);
            } else {
                this.setForeignKey(id!);
            }
        },
    },
});