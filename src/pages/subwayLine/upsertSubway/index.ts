import { EntityDict } from '../../../general-app-domain';

export default OakComponent({
    entity: 'subway',
    projection: {
        id: 1,
        name: 1,
    },
    isList: false,
    formData({ data: subway, features }) {

        return {
            id: subway?.id,
            name: subway?.name,
        };
    },
    filters: [],
    properties: {
        openSubway: false,
        onClose: () => undefined as void,
    },
    data: {
    },
    lifetimes: {
        async ready() { },
    },
    methods: {},
});
