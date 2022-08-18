import { firstLetterUpperCase } from "oak-domain/lib/utils/string";

export default OakPage(
    {
        path: 'userRelation:detail',
        isList: true,
        formData: async function ({ data, props }) {
            const { nameProperty } = props;
            const { oakEntity } = this.props;
            const entityStr = firstLetterUpperCase(oakEntity);

            const rows = data?.map(
                (ele) => {
                    const { id, [nameProperty!]: name, [`user${entityStr}$${oakEntity}`]: userEntity } = ele as any;                    
                    const relations = userEntity?.map((ele: any) => ele.relation);
                    const hasRelation: boolean[] = props.relations!.map(ele2 => relations.includes(ele2));
                    return {
                        id,
                        name,
                        hasRelation,
                    };
                }
            );
            return {
                rows,
            };
        },
        properties: {
            nameProperty: String,
            user: Object,
            relations: Array,
        },
        methods: {            
            onChange(input: any) {
                const { dataset, checked } = this.resolveInput(input, ['checked']);
                const { id: entityId, relation, index } = dataset as {
                    id: string,
                    relation: string,
                    index: number;
                };
                const { oakEntity, user } = this.props;
                const entityStr = firstLetterUpperCase(oakEntity!);
                this.toggleNode({
                    relation,
                    userId: user.id,
                }, checked, `${index}.user${entityStr}$${oakEntity}`)
            },
            async confirm() {
                await this.execute();
                await this.navigateBack();
            }
        },
    }
);
