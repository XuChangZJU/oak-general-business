import { OpSchema as Area } from '../../../general-app-domain/Area/Schema';

export default OakComponent({
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
    formData: async ({ data: areas }) => ({
        areas,
    }),

    properties: {
        depth: Number,
        itemSelectedEvent: String,
    },
    methods: {
        onWechatMpItemClicked(input: any) {
            const { dataset } = this.resolveInput(input);
            const item = this.state.areas!.find(
                (ele) => ele?.id === dataset!.id
            );
            this.onItemClicked(item as Area);
        },
        onItemClicked(item: Area) {
            const { depth, id } = item!;
            if (depth !== this.props.depth) {
                this.setFilters([
                    {
                        filter: {
                            parentId: id,
                        },
                    },
                ]);
            } else if (this.props.itemSelectedEvent){
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