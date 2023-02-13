"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
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
    isList: false,
    formData: function (_a) {
        var message = _a.data;
        return message || {};
    },
    observers: {
        'visitState,userId': function (visitState, userId) {
            var userId2 = this.features.token.getUserId(true);
            if (userId === userId2) {
                if (visitState === 'unvisited') {
                    this.execute('visit', false);
                }
            }
        },
    },
    methods: {
        goPage: function () {
            var params = this.state.params;
            var pathname = params === null || params === void 0 ? void 0 : params.pathname;
            var props = (params === null || params === void 0 ? void 0 : params.props) || {};
            var state = params === null || params === void 0 ? void 0 : params.state;
            if (!pathname) {
                return;
            }
            this.redirectTo(tslib_1.__assign({ url: pathname }, props), state, true);
        },
    },
});
