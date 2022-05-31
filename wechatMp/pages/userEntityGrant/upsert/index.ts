import { EntityDict } from "oak-app-domain";
import { DeduceCreateOperation, DeduceCreateSingleOperation, OakException, OakCongruentRowExists } from "oak-domain/lib/types";

OakPage({
    path: 'userEntityGrant:upsert',
    entity: 'userEntityGrant',
    
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relation: 1,
        action: 1,
        remark: 1,
        granterId: 1,
        granteeId: 1,
    },
    isList: false,
    formData: async ({ data: userEntityGrant }) => ({
        ...userEntityGrant
    }),
}, {
    properties: {
        entity: String,
        entityId: String,
        relations: String,
    },
    data: {
    },
    lifetimes: {
        ready() {
            this.setUpdateData('entity', this.data.entity);
            this.setUpdateData('entityId', this.data.entityId);
            this.setUpdateData('action', 'grant');
            this.setData({
                relationArr: JSON.parse(this.data.relations),
            })
        }
    },
    methods: {
        radioChange(e: WechatMiniprogram.RadioGroupChange) {
            this.setUpdateData('relation', e.detail.value);
        },
        async handleConfirm() {
            try {
                const result = await this.execute(
                    this.data.oakId ? 'update' : 'create',
                    [OakCongruentRowExists.name]
                );

                console.log(result);
                const { data } = result as DeduceCreateSingleOperation<EntityDict['userEntityGrant']['OpSchema']>;
                const { id } = data;

                this.navigateTo({
                    url: '../detail/index',
                    oakId: id,
                });
            }
            catch (error) {
                console.log(error);
                if ((<OakException>error).constructor.name === OakCongruentRowExists.name) {
                    // 这里由于编译的问题，用instanceof会不通过检查
                    const data = (<OakCongruentRowExists<EntityDict, 'userEntityGrant'>>error).getData();
                    console.log(data);
                    this.navigateTo({
                        url: '../detail/index',
                        oakId: data.id,
                    });
                }
            }
        }
    }
});