"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    properties: {
        actions: Array,
        actionDescriptions: Object,
        iconSize: String,
        rowNum: {
            type: Number,
            value: 4,
        },
    },
    methods: {
        onClickMp: function (e) {
            var index = e.detail.index;
            var action = this.props.actions[index];
            this.triggerEvent('action', { action: action });
        },
    },
    observers: {
        actions: function (actions) {
            var actionDescriptions = this.props.actionDescriptions;
            var actionss = actions.map(function (action) {
                return Object.assign({}, actionDescriptions[action], { action: action });
            });
            this.setState({ actionss: actionss });
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
