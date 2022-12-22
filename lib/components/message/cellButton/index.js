"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'message',
    isList: false,
    formData: function (_a) {
        var data = _a.data;
        return {};
    },
    actions: ['visit'],
    methods: {
        tapAction: function (action) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var id;
                return tslib_1.__generator(this, function (_a) {
                    id = this.props.oakId;
                    switch (action) {
                        case 'visit': {
                            this.execute('visit', false);
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                    return [2 /*return*/];
                });
            });
        },
    },
});
