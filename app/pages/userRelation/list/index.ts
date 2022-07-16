import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { composeFileUrl } from '../../../../src/utils/extraFile';

export default OakPage(
    {
        path: 'userRelation:list',
        entity: 'user',
        projection: {
            id: 1,
            name: 1,
            nickname: 1,
            mobile$user: {
                $entity: 'mobile',
                data: {
                    id: 1,
                    userId: 1,
                    mobile: 1,
                },
            },
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
            entity: String,
            entityId: String,
            userIds: Array,
        },
        data: {
            show: false,
            searchValue: '',
            deleteIndex: '',
        },
        lifetimes: {},
        methods: {
            onRemove(event: any) {
                const { index } = event.target.dataset;
                this.setState({
                    show: true,
                    deleteIndex: index,
                })
            },
            handleCancel() {
                this.setState({
                    show: false,
                    deleteIndex: '',
                })
            },
            handleConfirm() {
                const { entity } = this.props;
                const entityStr = firstLetterUpperCase(entity);
                const { deleteIndex } = this.state;
                deleteIndex && this.toggleNode({}, false, `${deleteIndex}.user${entityStr}$user`);
                this.setState({
                    show: false,
                })
            },
            goSearch() {
                this.navigateTo({
                    url: '/user/search',
                    toUrl: '/userRelation/detail'
                })
            }
        },
    }
);
