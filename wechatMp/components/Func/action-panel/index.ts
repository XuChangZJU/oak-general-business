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
        onClick(touch: WechatMiniprogram.Touch) {
            const { index } = touch.currentTarget.dataset;
            const { actions } = this.data;

            const action = actions[index];
            this.triggerEvent('click', { action });
        },
        closeDrawer() {
            this.triggerEvent('close');
        }
    },

    observers: {
        actions: function (actions) {
            const { actionDescriptions } = this.data;

            const actionss = actions.map(
                (action: string) => actionDescriptions[action]
            );

            this.setData({ actionss });
        },
    },

    lifetimes: {
        ready() {
            const { actions, actionDescriptions } = this.data;

            const actionss = actions.map(
                action => actionDescriptions[action]
            );

            this.setData({ actionss });
        }
    }
});
