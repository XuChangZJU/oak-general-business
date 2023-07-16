import { relationHierarchy, rootRelations } from '@project/auth/company';
import { uniq } from 'oak-domain/lib/utils/lodash';

export default OakComponent({
    isList: true,
    methods: {},
    properties: {
        entity: '',
        entityId: '',
    },
});
