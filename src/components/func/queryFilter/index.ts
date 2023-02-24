import { EntityDict } from '../../../general-app-domain';

export default OakComponent({
    entity() {
        const { entity } = this.props;
        return entity as keyof EntityDict;
    },
    isList: true,
    data: {
        open: false,
    },
    properties: {
        entity: String,
        columns: Array,
    },
    methods: {
        getNamedFilters() {
            if (this.state.oakFullpath) {
                const namedFilters = this.features.runningTree.getNamedFilters(
                    this.state.oakFullpath
                );
                return namedFilters;
            }
            return [];
        },
    },
});
