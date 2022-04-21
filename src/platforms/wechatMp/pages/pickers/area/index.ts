import { OpSchema as Area } from 'oak-app-domain/Area/Schema';
import { OakPage } from '../../../../../typings/polyfill';

OakPage({
    path: 'area-picker',
    entity: 'area',
    projection: {
        id: 1,
        name: 1,
        depth: 1,
        level: 1,        
    },
    filters: [
        {
            parent: {
                level: 'country',
            },
        }
    ],
    isList: true,
    formData: (arealist) => ({
        arealist,
    }),
}, {
    properties: {
        depth: Number,
    },
    methods: {
        onItemClicked(options: WechatMiniprogram.Touch) {            
            const item = (this.data.arealist as Array<Area>).find(
                (ele) => ele.id === options.currentTarget.dataset.id
            );

            const { depth, id } = item!;
            if (depth !== this.data.depth) {
                this.setFilters([{
                    parentId: id,
                }]);
            }
            else {
                this.setForeignKey(id);
            }
        }
    }
});