Component({
    externalClasses: ['item-container', 'item'],
    properties: {
        oakValue: Array,
        maxCount: Number,
        disableInsert: Boolean,
    },

    methods: {
        onClick(touch: WechatMiniprogram.Touch) {
        },
        checkAllowInsert(value?: Array<any>, count?: number) {
            const count2 = count || this.data.maxCount;
            const value2 = value || this.data.oakValue;
            if (typeof count2 === 'number' && value2?.length >= count2) {
                this.setData({
                    disableInsert: true,
                });
            }
        }
    },

    observers: {
        oakValue: function (oakValue) {
            this.checkAllowInsert(oakValue);
        },
        maxCount: function (maxCount) {
            this.checkAllowInsert(undefined, maxCount);
        }
    },

    lifetimes: {
        ready() {
            this.checkAllowInsert();
        }
    }
});
