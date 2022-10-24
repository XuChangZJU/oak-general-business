"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
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
    formData: function (_a) {
        var _b;
        var users = _a.data, features = _a.features;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _c, searchValue, go, isRoot, nodeStr, userIds, i, _d, mobile$user, name_1, itemStr, mobile, itemStr2;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _c = this.state, searchValue = _c.searchValue, go = _c.go;
                        go && this.goPage(users);
                        return [4 /*yield*/, features.token.isRoot()];
                    case 1:
                        isRoot = _e.sent();
                        nodeStr = '';
                        userIds = [];
                        if (users.length) {
                            for (i = 0; i < users.length; i++) {
                                userIds.push(users[i].id);
                                _d = users[i] || {}, mobile$user = _d.mobile$user, name_1 = _d.name;
                                itemStr = name_1 || '';
                                mobile = mobile$user && ((_b = mobile$user[0]) === null || _b === void 0 ? void 0 : _b.mobile);
                                if (!mobile && !name_1) {
                                    continue;
                                }
                                if (mobile) {
                                    itemStr += " " + mobile;
                                }
                                itemStr2 = itemStr.replace(searchValue, "<span class='search-value'>".concat(searchValue, "</span>"));
                                nodeStr += "<div class=\"drawer-item\" bind:tap=\"itemClick\"><span>".concat(itemStr2, "</span></divider>");
                            }
                        }
                        return [2 /*return*/, {
                                users: users,
                                userIds: userIds,
                                nodeStr: nodeStr,
                                isRoot: isRoot,
                            }];
                }
            });
        });
    },
    properties: {
        toUrl: String,
    },
    data: {
        go: false,
        showList: false,
        searchValue: '',
        searchArr: [],
    },
    lifetimes: {
        ready: function () {
            var searchStr = this.load('user_searchList');
            if (searchStr.length) {
                this.setState({
                    searchArr: JSON.parse(searchStr),
                });
            }
        }
    },
    methods: {
        closeList: function () {
            this.setState({
                showList: false,
            });
        },
        setFilter: function (value) {
            this.addNamedFilter({
                filter: {
                    $or: [
                        {
                            name: {
                                $includes: value,
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
                                            $includes: value,
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
        goPage: function (data) {
            var toUrl = this.props.toUrl;
            var userIds = data === null || data === void 0 ? void 0 : data.map(function (ele) { return ele.id; });
            this.navigateTo({
                url: toUrl,
                userIds: userIds,
            });
            this.setState({
                showList: false,
                go: false,
            });
        },
        tagClick: function (event) {
            var value = event.currentTarget.dataset.value;
            this.setFilter(value);
            this.setState({
                go: true,
            });
            this.refresh();
        },
        //搜索框聚焦时，如果有输入值且搜索有值，也应该显示搜索结果list
        onFocus: function (event) {
            var _a = this.state, searchValue = _a.searchValue, userIds = _a.userIds;
            if (searchValue && userIds.length) {
                this.setState({
                    showList: true,
                });
            }
        },
        itemClick: function (event) {
            //由于rich-text屏蔽了所有子节点的事件，所以这里根据触摸点进行判断
            //搜索栏高度40px 每个可点击项38px
            var toUrl = this.props.toUrl;
            var _a = this.state, searchValue = _a.searchValue, userIds = _a.userIds;
            var pageY = event.touches[0].pageY;
            var index = Math.floor((pageY - 40) / 38);
            if (index + 1 > userIds.length) {
                this.setState({
                    showList: false,
                });
                return;
            }
            var searchStr = this.load('user_searchList');
            var searchArr = [];
            if (!searchStr) {
                searchArr.push(searchValue);
            }
            else {
                searchArr = JSON.parse(searchStr);
                if (!searchArr.includes(searchValue)) {
                    searchArr.push(searchValue);
                }
            }
            this.save('user_searchList', JSON.stringify(searchArr));
            this.setState({ showList: false });
            this.navigateTo({
                url: toUrl,
                userIds: [userIds[index]],
            });
        },
        clearSearchHistory: function () {
            this.setState({
                searchArr: [],
            });
            this.save('user_searchList', '');
        },
        searchChange: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value, users;
                return tslib_1.__generator(this, function (_a) {
                    value = this.resolveInput(input).value;
                    users = this.state.users;
                    if (!value) {
                        this.setState({
                            searchValue: value,
                            showList: false,
                        });
                        return [2 /*return*/];
                    }
                    if (users.length) {
                        this.setState({
                            showList: true,
                        });
                    }
                    this.setFilter(value);
                    this.setState({
                        searchValue: value,
                    });
                    this.refresh();
                    return [2 /*return*/];
                });
            });
        },
        searchCancel: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.setState({
                        searchValue: '',
                        showList: false,
                    });
                    return [2 /*return*/];
                });
            });
        },
        searchConfirm: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value, searchStr, searchArr;
                return tslib_1.__generator(this, function (_a) {
                    value = this.resolveInput(input).value;
                    searchStr = this.load('user_searchList');
                    searchArr = [];
                    if (!searchStr) {
                        searchArr.push(value);
                        this.setState({
                            searchArr: searchArr,
                            go: true,
                        });
                    }
                    else {
                        searchArr = JSON.parse(searchStr);
                        if (!searchArr.includes(value)) {
                            searchArr.push(value);
                        }
                        this.setState({
                            searchArr: searchArr,
                            go: true,
                        });
                    }
                    this.save('user_searchList', JSON.stringify(searchArr));
                    this.setFilter(value);
                    this.refresh();
                    return [2 /*return*/];
                });
            });
        },
    },
});
