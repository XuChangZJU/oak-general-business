import { pull } from "oak-domain/lib/utils/lodash";
export default OakComponent({
    isList: true,
    lifetimes: {
        async ready() {
            const { data: areas } = await this.features.cache.refresh('area', {
                data: {
                    id: 1,
                    name: 1,
                    level: 1,
                },
                filter: {
                    subway$area: {},
                    level: 'city',
                },
            });
            const areaId = this.props.areaId || areas[0].id;
            const { data: subways } = await this.features.cache.refresh('subway', {
                data: {
                    id: 1,
                    name: 1,
                },
                filter: {
                    areaId,
                },
            });
            this.setState({
                areas,
                subways,
                subwayId: subways[0]?.id,
            });
            this.getStations(subways[0]?.id);
        },
    },
    data: {
        open: false,
        stationIds: [],
    },
    properties: {
        areaId: '',
        onCancel: undefined,
        onConfirm: undefined,
        selectIds: [],
    },
    methods: {
        setAeraId(areaId) {
            this.setState({
                areaId,
            });
        },
        setCheckedList(value, flag) {
            const { stationIds } = this.state;
            if (flag) {
                this.setState({
                    stationIds: stationIds.concat(value),
                });
                // stationIds.push(value);
            }
            else {
                var index = stationIds.indexOf(value);
                // stationIds.splice(index, 1);
                this.setState({
                    stationIds: pull(stationIds, value),
                });
            }
        },
        async getSubways(areaId) {
            this.setState({
                areaId,
            });
            const { data: subways } = await this.features.cache.refresh('subway', {
                data: {
                    id: 1,
                    name: 1,
                },
                filter: {
                    areaId,
                },
            });
            this.getStations(subways[0].id);
            this.setState({
                subways,
            });
        },
        async getStations(subwayId) {
            this.setState({
                subwayId,
            });
            const { data: subwayStations } = await this.features.cache.refresh('subwayStation', {
                data: {
                    id: 1,
                    subwayId: 1,
                    stationId: 1,
                    station: {
                        id: 1,
                        name: 1,
                    },
                },
                filter: {
                    subwayId,
                },
            });
            const stations = subwayStations?.map((ele) => ({
                label: ele.station.name,
                value: ele.station.id,
            }));
            this.setState({
                stations,
            });
        },
        cancel() {
            this.setState({
                stationIds: [],
            });
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        },
        confirm() {
            if (this.props.onConfirm) {
                this.props.onConfirm(this.state.stationIds);
            }
            this.setState({
                stationIds: [],
            });
        },
    },
});
