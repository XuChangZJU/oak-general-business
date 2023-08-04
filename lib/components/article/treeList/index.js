"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'article',
    isList: true,
    properties: {
        articleMenuId: '',
        onChildEditArticleChange: function (data) { return undefined; },
        show: '',
        getBreadcrumbItemsByParent: function (breadcrumbItems) { return undefined; },
        breadcrumbItems: [],
        drawerOpen: false,
        changeDrawerOpen: function (open) { return undefined; },
        selectedArticleId: '',
        openArray: [],
    },
    projection: {
        id: 1,
        name: 1,
        articleMenuId: 1,
    },
    filters: [
        {
            filter: function () {
                var articleMenuId = this.props.articleMenuId;
                return {
                    articleMenuId: articleMenuId,
                };
            }
        }
    ],
    formData: function (_a) {
        var rows = _a.data;
        return {
            rows: rows,
        };
    },
    methods: {
        createOne: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var articleMenuId;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            articleMenuId = this.props.articleMenuId;
                            this.addItem({
                                name: '文章标题',
                                content: '',
                                articleMenuId: articleMenuId,
                            });
                            return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
    }
});
