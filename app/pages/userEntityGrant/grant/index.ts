import { EntityDict } from 'general-app-domain';
import { DeduceCreateOperation, DeduceCreateSingleOperation, OakException, OakCongruentRowExists } from "oak-domain/lib/types";

export default OakPage({
    path: 'userEntityGrant:upsert',
    entity: 'userEntityGrant',

    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relation: 1,
        type: 1,
        remark: 1,
        granterId: 1,
        granteeId: 1,
    },
    isList: false,
    formData: async ({ data: userEntityGrant }) => ({
        ...userEntityGrant,
    }),
    properties: {
        entity: String,
        entityId: String,
        relations: String,
        type: String,
    },
    data: {},
    lifetimes: {
        ready() {
            this.setUpdateData('entity', this.props.entity);
            this.setUpdateData('entityId', this.props.entityId);
            this.setUpdateData('type', this.props.type);
            this.setState({
                relationArr: JSON.parse(this.props.relations),
            });
        },
    },
    methods: {
        radioChange(input: any) {
            const { value } = this.resolveInput(input);
            this.setUpdateData('relation', value!);
        },
        async handleConfirm() {
            try {
                const result = await this.execute(
                    this.props.oakId ? 'update' : 'create',
                    [OakCongruentRowExists.name]
                );

                const { data } = result as DeduceCreateSingleOperation<
                    EntityDict['userEntityGrant']['OpSchema']
                >;
                const { id } = data;

                this.navigateTo({
                    url: '../detail/index',
                    oakId: id,
                });
            } catch (error) {
                if (
                    (<OakException>error).constructor.name ===
                    OakCongruentRowExists.name
                ) {
                    // 这里由于编译的问题，用instanceof会不通过检查
                    const data = (<
                        OakCongruentRowExists<EntityDict, 'userEntityGrant'>
                    >error).getData();
                    this.navigateTo({
                        url: '../detail/index',
                        oakId: data.id,
                    });
                }
            }
        },
    },
});