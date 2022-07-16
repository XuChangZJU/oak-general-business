
export default OakPage(
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
        },
        filters: [
            {
                filter: {
                    id: {
                        $in: {
                            entity: 'mobile',
                            data: {
                                userId: 1,
                            },
                            filter: {
                                mobile: {
                                    $eq: '11111111112',
                                }
                            }
                        }
                    }
                },
                '#name': 'userSearch'
            }
        ],
        isList: true,
        formData: async function ({ data: users, params, features }) {
            const { searchValue, go } = this.data;
            go && this.goPage(users);
            const isRoot = await features.token.isRoot();
            let nodeStr = '';
            const userIds: Array<string> = [];
            if (users.length) {
                for (let i = 0; i < users.length; i++) {
                    userIds.push(users[i].id);
                    const { mobile$user, name } = users[i] || {};
                    let itemStr: String = name || '';
                    const mobile = mobile$user && mobile$user[0]?.mobile;
                    if (!mobile && !name) {
                        continue;
                    }
                    if (mobile) {
                        itemStr += " " + mobile;
                    }
                    const itemStr2 = itemStr.replace(searchValue, `<span class='search-value'>${searchValue}</span>`)
                    nodeStr += `<div class="drawer-item" bind:tap="itemClick"><span>${itemStr2}</span></divider>`
                }
            }
            return {
                users,
                userIds,
                nodeStr,
                isRoot,
            };
        },
        properties: {
            toUrl: String,
        },
        data: {
            go: false,
            showList: false,
        },
        lifetimes: {
            ready() {
                const searchStr = wx.getStorageSync('user_searchList') as string;
                if (searchStr.length) {
                    this.setState({
                        searchArr: JSON.parse(searchStr),
                    })
                }
            }
        },
        methods: {
            setFilter(value: string) {
                this.addNamedFilter({
                    filter: {
                        $or: [
                            {
                                name: {
                                    $includes: value!,
                                },
                            },
                            {
                                id: {
                                    $in: {
                                        entity: 'mobile',
                                        data: {
                                            userId: 1,
                                        },
                                        filter: {
                                            mobile: {
                                                $includes: value!,
                                            }
                                        }
                                    }
                                }
                            }
                        ],
                    },
                    '#name': 'userSearch',
                });
            },
            goPage(data: any) {
                const { toUrl } = this.data;
                const userIds = data?.map((ele: any) => ele.id);
                this.navigateTo({
                    url: toUrl,
                    userIds,
                });
                this.setState({
                    go: false,
                })
            },
            tagClick(event: any) {
                const { value } = event.currentTarget.dataset;
                this.setFilter(value);
                this.setState({
                    go: true,
                })
                this.refresh();
            },
            itemClick(event: any) {
                //由于rich-text屏蔽了所有子节点的事件，所以这里根据触摸点进行判断
                //搜索栏高度40px 每个可点击项38px
                const { toUrl, searchValue, userIds } = this.data;
                const { pageY } = event.touches[0];
                const index = Math.floor((pageY - 40) / 38);
                if (index + 1 > userIds.length) {
                    this.setState({
                        showList: false,
                    })
                    return;
                }
                const searchStr = wx.getStorageSync('user_searchList') as string;
                let searchArr: Array<string> = [];
                if (!searchStr) {
                    searchArr.push(searchValue)
                }
                else {
                    searchArr = JSON.parse(searchStr) as Array<string>;
                    if (!searchArr.includes(searchValue)) {
                        searchArr.push(searchValue);
                    }
                }
                wx.setStorageSync('user_searchList', JSON.stringify(searchArr));
                this.navigateTo({
                    url: toUrl,
                    userIds: userIds[index],
                })
            },
            clearSearchHistory() {
                this.setState({
                    searchArr: [],
                });
                wx.setStorageSync('user_searchList', '');
            },
            async searchChange(input: any) {
                const { value } = this.resolveInput(input);
                const { users } = this.state;
                if (!value) {
                    this.setState({
                        searchValue: value,
                        showList: false,
                    })
                    return;
                }
                if (users.length) {
                    this.setState({
                        showList: true,
                    })
                }
                this.setFilter(value);
                this.setState({
                    searchValue: value,
                })
                this.refresh();
            },
            async searchCancel() {
                this.setState({
                    searchValue: '',
                    showList: false,
                })
            },
            async searchConfirm(input: any) {
                const { value } = this.resolveInput(input);
                const searchStr = wx.getStorageSync('user_searchList') as string;
                let searchArr: Array<string> = [];
                if (!searchStr) {
                    searchArr.push(value)
                    this.setState({
                        searchArr,
                    })
                }
                else {
                    searchArr = JSON.parse(searchStr) as Array<string>;
                    if (!searchArr.includes(value)) {
                        searchArr.push(value);
                    }
                    this.setState({
                        searchArr,
                    })
                }
                wx.setStorageSync('user_searchList', JSON.stringify(searchArr));
                this.setFilter(value);
                this.refresh();
            },
        },
    }
);
