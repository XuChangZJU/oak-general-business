"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    properties: {
        onActionClick: undefined,
        actions: [],
        actionDescriptions: {},
        iconSize: '',
        rowNum: 4,
    },
    methods: {
        onClickMp: function (e) {
            var index = e.detail.index;
            var action = this.props.actions[index];
            this.triggerEvent('action', { action: action });
        },
    },
    listeners: {
        actions: function (prev, next) {
            var _a;
            if (prev.actions !== next.actions) {
                var actionDescriptions_1 = this.props.actionDescriptions;
                var actionss = (_a = next.actions) === null || _a === void 0 ? void 0 : _a.map(function (action) {
                    return Object.assign({}, actionDescriptions_1[action], {
                        action: action,
                    });
                });
                this.setState({ actionss: actionss });
            }
        },
    },
    lifetimes: {
        ready: function () {
            var _a = this.props, actions = _a.actions, actionDescriptions = _a.actionDescriptions;
            if (actions) {
                var actionss = actions.map(function (action) {
                    return Object.assign({}, actionDescriptions[action], { action: action });
                });
                this.setState({ actionss: actionss });
            }
        },
    },
});
