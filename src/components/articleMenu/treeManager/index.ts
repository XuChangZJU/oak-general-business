// import { relationHierarchy, rootRelations } from '@project/auth/company';
import { uniq } from 'oak-domain/lib/utils/lodash';

export default OakComponent({
    isList: true,
    methods: {
        gotoDoc() {
            window.open('/article/doc');
        },
        gotoArticleDetail(oakId: string) {
            window.open(`/article/detail?oakId=${oakId}`)
        }
    },
    properties: {
        entity: '',
        entityId: '',
        show: '',
        articleMenuId: '',
    },
});
