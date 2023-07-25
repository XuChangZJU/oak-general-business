"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: true,
    methods: {
        gotoDoc: function () {
            window.open('/article/doc');
        },
        gotoArticleDetail: function (oakId) {
            window.open("/article/detail?oakId=".concat(oakId));
        }
    },
    properties: {
        entity: '',
        entityId: '',
        show: '',
        articleMenuId: '',
    },
});
