
import { EntityDict } from '../../../oak-app-domain';


type TreeNode = {
    key: string;
    title: string;
    children?: TreeNode[];
    isLeaf?: boolean;
};

export default OakComponent({
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
        areaId: '330100' as string,
        areaOptions: [] as Array<{ label: string, value: string }>,
    },
    properties: {},
    filters: [
        {
            filter() {
                return {
                    areaId: '330100'
                }
            },
            '#name': 'area',
        },
    ],
    listeners: {},
    formData: ({ data: subway }) => {
        const treeData: TreeNode[] = subway
            .map((ele) => {
                return {
                    title: ele!.name!,
                    key: ele!.id!,
                    isLeaf: false,
                    children:
                        ele.subwayStation$subway!
                            .map((ele2) => ({
                                title: ele2!.station!.name,
                                key: `${ele.id}/${ele2!.station!.id}`,
                                isLeaf: true,
                            })) || [],
                };
            });

        return {
            treeData,
        };
    },
    lifetimes: {
        async ready() {
            const { data: area } = await this.features.cache.refresh(
                'area',
                {
                    data: {
                        id: 1,
                        name: 1,
                        level: 1,

                    },
                    filter: {
                        level: 'city',
                    },
                }
            );
            const areaOptions = area?.map(
                (ele: any) => ({
                    label: ele.name,
                    value: ele.id,
                })
            )
            this.setState({
                areaOptions,
            });
        },
    },
    methods: {
        setFilterByAreaId(areaId: string) {
            this.addNamedFilter(
                {
                    filter: {
                        areaId,
                    },
                    '#name': 'area',
                },
                true
            );
        },
        setAreaId(areaId: string) {
            this.setState({
                areaId,
            })
        }
    },
});
