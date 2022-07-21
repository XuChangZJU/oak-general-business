import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
import { composeFileUrl } from "../../../../src/utils/extraFile";

export default OakComponent(
    {
        path: 'user:relation',
        entity: 'user',
        isList: true,
        formData: async ({ data: user }) => {
            const {
                id,
                nickname,
                userState,
                name,
                mobile$user,
                extraFile$entity,
            } = user || {};
            const mobile = mobile$user && mobile$user[0]?.mobile;
            const avatar =
                extraFile$entity &&
                extraFile$entity[0] &&
                composeFileUrl(extraFile$entity[0]);
            return {
                id,
                nickname,
                name,
                mobile,
                avatar,
                userState,
            };
        },
        properties: {
            oakFullpath: String,
            oakParent: String,
            oakPath: String,
            oakId: String,
        },
        data: {
            checked: false,
        },
        methods: {
            onClick(e: any) {
                const { checked } = this.data;
                const { id } = e.currentTarget.dataset;
                this.setState({
                    checked: !checked,
                })
                this.triggerEvent('myClick', e, { id });
            },
            handleChange() {
                const { checked } = this.data;
                this.setState({
                    checked: !checked,
                })
            }
        },
    }
);
