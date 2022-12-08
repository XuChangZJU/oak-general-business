"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Component({
    properties: {
        actions: Array,
        actionDescriptions: Object,
        show: {
            type: Boolean,
            value: false,
        },
    },
    methods: {
        onClick: function (action) {
            this.onActionClick(action);
        },
    },
    observers: {
        actions: function (actions) {
            var actionDescriptions = this.data.actionDescriptions;
            var actionss = actions.map(function (action) { return Object.assign({}, actionDescriptions[action], { action: action }); });
            this.setData({ actionss: actionss });
        },
    },
    lifetimes: {
        ready: function () {
            var _a = this.data, actions = _a.actions, actionDescriptions = _a.actionDescriptions;
            if (actions) {
                var actionss = actions.map(function (action) { return Object.assign({}, actionDescriptions[action], { action: action }); });
                this.setData({ actionss: actionss });
            }
        }
    }
});
