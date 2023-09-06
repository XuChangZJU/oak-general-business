import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
export default OakComponent({
    isList: true,
    formData({ data }) {
        const { nameProperty, oakEntity } = this.props;
        const entityStr = firstLetterUpperCase(oakEntity);
        const rows = data?.map((ele) => {
            const { id, [nameProperty]: name, [`user${entityStr}$${oakEntity}`]: userEntity, } = ele;
            const relations = userEntity?.map((ele) => ele.relation);
            const hasRelation = this.props.relations.map((ele2) => relations.includes(ele2));
            return {
                id,
                name,
                hasRelation,
            };
        });
        return {
            rows,
        };
    },
    properties: {
        nameProperty: '',
        user: {},
        relations: [],
        oakEntity: '',
    },
    methods: {
        onChange(input) {
            const { dataset, checked } = this.resolveInput(input, ['checked']);
            const { id: entityId, relation, index, } = dataset;
            const { oakEntity, user } = this.props;
            const entityStr = firstLetterUpperCase(oakEntity);
            // todo 需要修改为最新写法
            // this.toggleNode(
            //     {
            //         relation,
            //         userId: user.id,
            //     },
            //     checked,
            //     `${index}.user${entityStr}$${oakEntity}`
            // );
        },
        async confirm() {
            await this.execute();
            await this.navigateBack();
        },
    },
});
