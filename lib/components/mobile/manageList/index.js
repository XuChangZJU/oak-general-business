"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'mobile',
    isList: true,
    projection: {
        id: 1,
        mobile: 1,
    },
    formData: function (_a) {
        var data = _a.data;
        return {
            mobiles: data && data.filter(function (ele) { return !ele.$$deleteAt$$; }),
        };
    },
    methods: {
        onAddMp: function () {
            this.addItem({
                mobile: '',
            });
        },
        onMobileSetMp: function (e) {
            var id = e.currentTarget.dataset.id;
            var value = e.detail.value;
            this.updateItem({
                mobile: value,
            }, id);
        },
        onDeleteMp: function (e) {
            var id = e.currentTarget.dataset.id;
            this.removeItem(id);
        }
    }
});
