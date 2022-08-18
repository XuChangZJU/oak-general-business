import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
import { composeFileUrl } from "../../../utils/extraFile";

export default OakComponent(
    {
        entity: 'user',
        isList: false,
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
                composeFileUrl(extraFile$entity[0] as any);
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
                const { checked } = this.state;
                const { id } = e.currentTarget.dataset;
                this.setState({
                    checked: !checked,
                })
                // this.triggerEvent('myClick', e, { id });
            },
            handleChange() {
                const { checked } = this.state;
                this.setState({
                    checked: !checked,
                })
            }
        },
    }
);
