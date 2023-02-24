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
        mode: {
            type: String,
            value: 'cell',
        },
        column: {
            type: Number,
            value: 3,
        },
    },
    data: {
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
                    ((_a = prev.oakLegalActions) === null || _a === void 0 ? void 0 : _a.length) !==
                        ((_b = next.oakLegalActions) === null || _b === void 0 ? void 0 : _b.length)) {
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
                var oakId, _a, item, type, popover, dialog, alertContent, text, detail;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            oakId = this.state.oakId;
                            _a = e.currentTarget.dataset, item = _a.item, type = _a.type;
                            if (type === 'popover') {
                                popover = this.selectComponent('#popover');
                                popover.onHide();
                            }
                            if (item.alerted) {
                                dialog = this.selectComponent('#my-action-btn-dialog');
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
                            _b.sent();
                            if (item.afterAction) {
                                this.triggerEvent('afterAction', detail);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        getItemsMp: function () {
            var _this = this;
            var _a = this.state, oakLegalActions = _a.oakLegalActions, items = _a.items, column = _a.column;
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
            var newItems = items2;
            var moreItems = [];
            if (column && items2.length > column) {
                newItems = tslib_1.__spreadArray([], tslib_1.__read(items2), false).splice(0, column);
                moreItems = tslib_1.__spreadArray([], tslib_1.__read(items2), false).splice(column, items2.length);
            }
            this.setState({
                newItems: newItems,
                moreItems: moreItems,
            });
        },
        handleMoreClick: function (e) {
            // 获取按钮元素的坐标信息
            var id = e.currentTarget.id;
            // let scrollTop = 0;
            // wx.createSelectorQuery()
            //     .selectViewport()
            //     .scrollOffset(function (res) {
            //         scrollTop = res.scrollTop;
            //     })
            //     .exec();
            var popover = this.selectComponent('#popover');
            wx.createSelectorQuery()
                .in(this)
                .select('#' + id)
                .boundingClientRect(function (res) {
                popover.onDisplay(res);
            })
                .exec();
        },
    },
});
