"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    entity: 'application',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        description: 1,
        type: 1,
        systemId: 1,
        system: {
            id: 1,
            name: 1,
        },
    },
    formData: function (_a) {
        var data = _a.data;
        return data || {};
    },
    methods: {
        goWechatPublicTagList: function () {
            var oakId = this.props.oakId;
            this.navigateTo({
                url: '/wechatPublic/tag/list',
                applicationId: oakId,
            });
        }
    },
});
