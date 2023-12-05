export default OakComponent({
    isList: false,
    entity: 'system',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        description: 1,
        super: 1,
        folder: 1,
        domain$system: {
            $entity: 'domain',
            data: {
                id: 1,
                systemId: 1,
                url: 1,
            },
        },
        application$system: {
            $entity: 'application',
            data: {
                id: 1,
                name: 1,
                config: 1,
                description: 1,
                type: 1,
            }
        }
    },
    formData({ data }) {
        return data || {};
    },
});
