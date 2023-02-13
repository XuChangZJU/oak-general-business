"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    entity: 'message',
    projection: {
        id: 1,
        $$createAt$$: 1,
        type: 1,
        title: 1,
        content: 1,
        visitState: 1,
        userId: 1,
        user: {
            id: 1,
            name: 1,
        },
        params: 1,
    },
    formData: function (_a) {
        var message = _a.data, features = _a.features, props = _a.props;
        return message || {};
    },
    methods: {},
    actions: ['visit'],
});
