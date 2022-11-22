"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'userEntityGrant',
    isList: false,
    formData: function (_a) {
        var data = _a.data;
        return {};
    },
    actions: ['disable'],
    methods: {
        tapAction: function (action) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var id;
                return tslib_1.__generator(this, function (_a) {
                    id = this.props.oakId;
                    switch (action) {
                        case 'disable': {
                            this.update({
                                expired: true,
                            }, 'disable');
                            this.execute();
                            break;
                        }
                        // case 'remove': {
                        //     await this.addOperation({
                        //         action: 'remove',
                        //         data: {},
                        //         filter: {
                        //             id,
                        //         },
                        //     });
                        //     this.execute();
                        //     break;
                        // }
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
