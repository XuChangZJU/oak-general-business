
export default OakComponent(
    {
        path: 'userSearch:search',
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
            // extraFile$entity: {
            //     $entity: 'extraFile',
            //     data: {
            //         id: 1,
            //         tag1: 1,
            //         origin: 1,
            //         bucket: 1,
            //         objectId: 1,
            //         filename: 1,
            //         extra1: 1,
            //         type: 1,
            //         entity: 1,
            //         extension: 1,
            //     },
            //     filter: {
            //         tag1: 'avatar',
            //     },
            //     indexFrom: 0,
            //     count: 1,
            // },
        },
        filters: [
            // {
            //     filter: async ({ onLoadOptions }) => {
            //         return {
            //             id: {
            //                 $in: {
            //                     entity: 'mobile',
            //                     data: {
            //                         userId: 1,
            //                     },
            //                     filter: {
            //                         mobile: {
            //                             $eq: '111111111112',
            //                         }
            //                     }
            //                 }
            //             }
            //         };
            //     },
            //     '#name': 'mobile',
            // },
        ],
        isList: false,
        formData: async function ({ data: users, params, features }) {

            const isRoot = await features.token.isRoot();
            const filter = await this.getFilterByName('name');

            return {
                users: users?.map((ele: any) => {
                    const { mobile$user, extraFile$entity } =
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
                isRoot,
            };
        },
        properties: {
        },
        data: {},
        lifetimes: {
            ready() {
                const searchStr = wx.getStorageSync('user_searchList') as string;
                if (searchStr.length) {
                    const searchArr = JSON.parse(searchStr) as Array<string>;
                    this.addNamedFilter({
                        filter: {
                            id: {
                                $in: {
                                    entity: 'mobile',
                                    data: {
                                        userId: 1,
                                    },
                                    filter: {
                                        $or: searchArr.map(ele => {
                                            {
                                                mobile: {
                                                    $eq: ele
                                                }
                                            }
                                        })
                                    }
                                }
                            }
                        },
                        '#name': 'mobile',
                    })
                }
            }
        },
        methods: {
            async searchChange(input: any) {
            },
            async searchCancel() {
                this.setState({
                    searchValue: '',
                })
            },
            async searchConfirm(input: any) {
                const { value } = this.resolveInput(input);
                if (value.length < 11) {
                    this.setState({
                        msgType: 'warning',
                        showMsg: true,
                        content: '手机号位数不足11位'
                    })
                    return;
                }
                const searchStr = wx.getStorageSync('user_searchList') as string;
                let searchArr: Array<string> = [];
                if (!searchStr) {
                    searchArr.push(value)
                }
                else {
                    searchArr = JSON.parse(searchStr) as Array<string>;
                }
                wx.setStorageSync('user_searchList', JSON.stringify(searchArr));
                this.addNamedFilter({
                    filter: {
                        id: {
                            $in: {
                                entity: 'mobile',
                                data: {
                                    userId: 1,
                                },
                                filter: {
                                    mobile: {
                                        $eq: value,
                                    }
                                }
                            }
                        }
                    },
                    '#name': 'mobile',
                });
                this.refresh();
            },
            goUpsertUser() {
                const { entity, entityId } = this.props;
                this.navigateTo({
                    url: '/user/manage/upsert',
                });
            },
            handleCardClick(event: any) {
                const { entity, entityId } = this.props;
                const { dataset } = this.resolveInput(event);
                const { id } = dataset!;
                this.navigateTo({
                    url: '/user/manage/detail',
                    oakId: id,
                    entity,
                    entityId,
                    relations: JSON.stringify(['manager', 'owner']),
                });
            },
        },
    }
);
