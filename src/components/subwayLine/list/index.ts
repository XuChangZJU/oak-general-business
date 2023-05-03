
export default OakComponent({
    isList: true,

    lifetimes: {
        async ready() {
            const { data: areas } = await this.features.cache.refresh(
                'area',
                {
                    data: {
                        id: 1,
                        name: 1,
                        level: 1,

                    },
                    filter: {
                        id: {
                            $in: {
                                entity: 'subway',
                                data: {
                                    areaId: 1
                                }
                            }
                        },
                        level: 'city',
                    },
                }
            );
            const areaId = this.props.areaId || areas[0].id;
            const { data: subways } = await this.features.cache.refresh('subway', {
                data: {
                    id: 1,
                    name: 1,
                },
                filter: {
                    areaId,
                }
            });
            this.setState({
                areas,
                subways,
                subwayId: subways[0]?.id
            });
            this.getStations(subways[0]?.id!);
        },
    },
    data: {
        open: false,
    },
    properties: {
        areaId: '' as string,
    },
    methods: {
        setAeraId(areaId: string) {
            this.setState({
                areaId,
            })
        },
        async getSubways(areaId: string) {
            this.setState({
                areaId,
            })
            const { data: subways } = await this.features.cache.refresh('subway', {
                data: {
                    id: 1,
                    name: 1,
                },
                filter: {
                    areaId,
                }
            });
            this.getStations(subways[0]!.id!);
            this.setState({
                subways,
            });
        },
        async getStations(subwayId: string) {
            this.setState({
                subwayId,
            })
            const { data: subwayStations } = await this.features.cache.refresh('subwayStation', {
                data: {
                    id: 1,
                    subwayId: 1,
                    stationId: 1,
                    station: {
                        id: 1,
                        name: 1,
                    }
                },
                filter: {
                    subwayId,
                }
            });
            const stations = subwayStations?.map(
                (ele: any) => ({
                    label: ele.station.name,
                    value: ele.station.id,
                })
            )
            this.setState({
                stations,
            });
        }
    },
});
