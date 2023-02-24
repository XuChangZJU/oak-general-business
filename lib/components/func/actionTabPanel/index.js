"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: function () {
        var entity = this.props.entity;
        return entity;
    },
    isList: false,
    actions: function () {
        var items = this.props.items;
        var actions = (items === null || items === void 0 ? void 0 : items.filter(function (ele) { return !!ele.action; }).map(function (ele) { return ele.action; })) || [];
        return actions;
    },
    data: {
        slideWidth: 0,
        slideLeft: 0,
        slideShow: false,
        commonAction: [
            'create',
            'update',
            'remove',
            'confirm',
            'cancel',
            'grant',
            'revoke',
        ],
    },
    properties: {
        entity: String,
        actions: {
            type: Array,
            value: [],
        },
        items: {
            type: Array,
            value: [],
        },
        rows: {
            type: Number,
            value: 2,
        },
        column: {
            type: Number,
            value: 5,
        },
        mode: {
            type: String,
            value: 'text',
        },
    },
    lifetimes: {
        ready: function () {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                this.getItemsMp();
            }
        },
    },
    listeners: {
        oakLegalActions: function (prev, next) {
            var _a, _b;
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                if (prev.oakLegalActions !== next.oakLegalActions ||
                    ((_a = prev.oakLegalActions) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = next.oakLegalActions) === null || _b === void 0 ? void 0 : _b.length)) {
                    this.getItemsMp();
                }
            }
        },
    },
    methods: {
        linconfirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, selectItem, oakId, detail;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.state, selectItem = _a.selectItem, oakId = _a.oakId;
                            detail = {
                                item: selectItem,
                                oakId: oakId,
                            };
                            if (selectItem.click) {
                                this.triggerEvent('click', detail);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.execute(selectItem.action)];
                        case 1:
                            _b.sent();
                            if (selectItem.afterAction) {
                                this.triggerEvent('afterAction', detail);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        lincancel: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.setState({
                        selectItem: '',
                    });
                    return [2 /*return*/];
                });
            });
        },
        getActionName: function (action) {
            var entity = this.props.entity;
            var commonAction = this.state.commonAction;
            var text = '';
            if (action) {
                if (commonAction.includes(action)) {
                    text = this.t("common:action.".concat(action));
                }
                else {
                    text = this.t("".concat(entity, ":action.").concat(action));
                }
            }
            return text;
        },
        handleClick: function (e) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var oakId, item, dialog, alertContent, text, detail;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            oakId = this.state.oakId;
                            item = e.currentTarget.dataset.item;
                            if (item.alerted) {
                                dialog = this.selectComponent('#my-action-tab-dialog');
                                alertContent = '';
                                if (item.action) {
                                    text = this.getActionName(item.action);
                                    alertContent = "\u786E\u8BA4".concat(text, "\u8BE5\u6570\u636E");
                                }
                                dialog.linShow({
                                    title: item.alertTitle || '温馨提示',
                                    type: 'confirm',
                                    content: item.alertContent || alertContent,
                                    'confirm-text': item.confirmText || '确定',
                                    'cancel-text': item.cancelText || '取消',
                                });
                                this.setState({
                                    selectItem: item,
                                });
                                return [2 /*return*/];
                            }
                            detail = {
                                item: item,
                                oakId: oakId,
                            };
                            if (item.click) {
                                this.triggerEvent('click', detail);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.execute(item.action)];
                        case 1:
                            _a.sent();
                            if (item.afterAction) {
                                this.triggerEvent('afterAction', detail);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        scroll: function (e) {
            this.setData({
                slideLeft: e.detail.scrollLeft * this.state.slideRatio,
            });
        },
        getItemsMp: function () {
            var _this = this;
            var _a = this.state, oakLegalActions = _a.oakLegalActions, items = _a.items, rows = _a.rows, column = _a.column;
            var items2 = items
                .filter(function (ele) {
                var action = ele.action, filter = ele.filter;
                var authResult = !action ||
                    (action &&
                        (oakLegalActions === null || oakLegalActions === void 0 ? void 0 : oakLegalActions.includes(action)));
                var filterResult = ele.hasOwnProperty('filter') && filter
                    ? filter()
                    : true;
                return authResult && filterResult;
            })
                .map(function (ele) {
                var label = ele.label, action = ele.action;
                var text;
                if (label) {
                    text = label;
                }
                else {
                    text = _this.getActionName(action);
                }
                return Object.assign(ele, {
                    text: text,
                });
            });
            var count = rows * column;
            var num = 1;
            if (items2.length > 0) {
                num =
                    items2.length % count !== 0
                        ? parseInt((items2.length / count).toString(), 10) + 1
                        : items2.length / count;
            }
            var tabNums = [];
            for (var i = 1; i <= num; i++) {
                tabNums.push(i);
            }
            var res = wx.getSystemInfoSync();
            var _totalLength = tabNums.length * 750; //分类列表总长度
            var _ratio = (100 / _totalLength) * (750 / res.windowWidth); //滚动列表长度与滑条长度比例
            var _showLength = (750 / _totalLength) * 100; //当前显示红色滑条的长度(保留两位小数)
            this.setState({
                tabNums: tabNums,
                slideWidth: _showLength,
                totalLength: _totalLength,
                slideShow: num > 1,
                slideRatio: _ratio,
                newItems: items2,
                count: count,
            });
        },
    },
});
