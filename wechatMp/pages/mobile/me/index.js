"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
OakPage({
    path: 'mobile:me',
    entity: 'mobile',
    isList: true,
    projection: {
        id: 1,
        mobile: 1,
        userId: 1,
    },
    formData: async (mobiles) => ({
        mobiles,
    }),
}, {
    methods: {
        async onRefreshMobile(e) {
            this.setData({
                refreshing: true,
            });
            try {
                console.log(e.detail.code);
            }
            catch (err) {
                console.error(err);
            }
            this.setData({
                refreshing: false,
            });
        }
    }
});
