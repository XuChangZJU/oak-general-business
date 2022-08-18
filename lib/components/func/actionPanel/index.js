"use strict";
Component({
    properties: {
        actions: Array,
        actionDescriptions: Object,
        show: {
            type: Boolean,
            value: false,
        }
    },
    methods: {
        onClick: function (touch) {
            var index = touch.currentTarget.dataset.index;
            var actions = this.data.actions;
            var action = actions[index];
            this.triggerEvent('click', { action: action });
        },
        closeDrawer: function () {
            this.triggerEvent('close');
        }
    },
    observers: {
        actions: function (actions) {
            var actionDescriptions = this.data.actionDescriptions;
            var actionss = actions.map(function (action) { return actionDescriptions[action]; });
            this.setData({ actionss: actionss });
        },
    },
    lifetimes: {
        ready: function () {
            var _a = this.data, actions = _a.actions, actionDescriptions = _a.actionDescriptions;
            var actionss = actions.map(function (action) { return actionDescriptions[action]; });
            this.setData({ actionss: actionss });
        }
    }
});
