import { firstLetterUpperCase } from "oak-domain/lib/utils/string";
import { composeFileUrl } from "../../../../src/utils/extraFile";

export default OakPage(
    {
        path: 'userRelation:detail',
        entity: 'user',
        projection: {
            id: 1,
            nickname: 1,
            name: 1,
            userState: 1,
            idState: 1,
            extraFile$entity: {
                $entity: 'extraFile',
                data: {
                    id: 1,
                    tag1: 1,
                    origin: 1,
                    bucket: 1,
                    objectId: 1,
                    filename: 1,
                    extra1: 1,
                    type: 1,
                    entity: 1,
                    extension: 1,
                },
                filter: {
                    tag1: 'avatar',
                },
                indexFrom: 0,
                count: 1,
            },
            mobile$user: {
                $entity: 'mobile',
                data: {
                    id: 1,
                    mobile: 1,
                },
            },
        },
        filters: [
            // 由调用者注入oakFilter
            {
                filter: async ({ features, props, onLoadOptions }) => {
                    const { userIds } = props;
                    return {
                        id: {
                            $in: userIds,
                        },
                    };
                },
            },
        ],
        isList: true,
        formData: async function ({ data: users, props, features }) {
            const filter = await this.getFilterByName('name');
            return {
                users: users?.map((ele: any) => {
                    const { mobile$user, extraFile$entity  } =
                        ele || {};
                    const mobile = mobile$user && mobile$user[0]?.mobile;
                    const avatar =
                        extraFile$entity &&
                        extraFile$entity[0] &&
                        composeFileUrl(extraFile$entity[0]);
                    const user2 = Object.assign({}, ele, {
                        mobile,
                        avatar,
                    });
                    return user2;
                }),
                searchValue: (
                    filter?.$or as [{ name: { $includes: string } }]
                )[0].name.$includes,
            };
        },
        properties: {
            userIds: Array,
        },
        methods: {
            handleChange(event: any) {
                const { key, checked } = event.detail;
                const { users } = this.state;
                Object.assign(users[key], {
                    isChecked: checked,
                })
            },
            addUserRelation(){}
        },
    }
);
