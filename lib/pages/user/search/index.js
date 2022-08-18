"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakPage({
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
    formData: function (_a) {
        var _b;
        var users = _a.data, features = _a.features;
        return __awaiter(this, void 0, void 0, function () {
            var _c, searchValue, go, isRoot, nodeStr, userIds, i, _d, mobile$user, name_1, itemStr, mobile, itemStr2;
            return __generator(this, function (_e) {
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
            return __awaiter(this, void 0, void 0, function () {
                var value, users;
                return __generator(this, function (_a) {
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
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.setState({
                        searchValue: '',
                        showList: false,
                    });
                    return [2 /*return*/];
                });
            });
        },
        searchConfirm: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var value, searchStr, searchArr;
                return __generator(this, function (_a) {
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
