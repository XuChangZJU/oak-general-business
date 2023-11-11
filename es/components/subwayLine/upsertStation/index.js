export default OakComponent({
    entity: 'station',
    projection: {
        id: 1,
        name: 1,
    },
    isList: false,
    formData({ data: station, features }) {
        return {
            id: station?.id,
            name: station?.name,
        };
    },
    filters: [],
    properties: {
        openStation: false,
        onClose: () => undefined,
        subwayId: '',
    },
    data: {},
    lifetimes: {
        async ready() { },
    },
    methods: {},
});
