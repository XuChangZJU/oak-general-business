import { EntityDict } from '../../../general-app-domain';
import { assert } from 'oak-domain/lib/utils/assert';

export default OakComponent({
    entity() {
        const { entity } = this.props;
        return entity as keyof EntityDict;
    },
    projection() {
        const { projection } = this.props;
        return projection;
    },
    formData({ data: rows }) {
        return {
            rows,
        };
    },
    isList: true,
    data: {
        open: false,
    },
    properties: {
        entity: String,
        projection: Object,
    },
    methods: {},
});
