import { OpSchema as Area } from '../../../oak-app-domain/Area/Schema';

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
        onWechatMpItemClicked(input: WechatMiniprogram.CustomEvent) {
            const { currentTarget, detail } = input;
            const { dataset } = currentTarget;;
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