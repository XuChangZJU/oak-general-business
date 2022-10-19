"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var lodash_1 = require("oak-domain/lib/utils/lodash");
exports.default = OakComponent({
    isList: false,
    properties: {
        config: Object,
        entity: String,
        name: String,
        entityId: String,
    },
    data: {
        initialConfig: {},
        dirty: false,
        currentConfig: {},
    },
    observers: {
        config: function (config) {
            this.setState({
                initialConfig: config,
                dirty: false,
                currentConfig: (0, lodash_1.cloneDeep)(config),
            });
        }
    },
    methods: {
        setValue: function (path, value) {
            var currentConfig = this.state.currentConfig;
            var newConfig = (0, lodash_1.cloneDeep)(currentConfig);
            (0, lodash_1.set)(newConfig, path, value);
            this.setState({
                currentConfig: newConfig,
                dirty: true,
            });
        },
        removeItem: function (path, index) {
            var currentConfig = this.state.currentConfig;
            var array = (0, lodash_1.get)(currentConfig, path);
            array.splice(index, 1);
            var newConfig = (0, lodash_1.cloneDeep)(currentConfig);
            this.setState({
                currentConfig: newConfig,
                dirty: true,
            });
        },
        resetConfig: function () {
            var initialConfig = this.state.initialConfig;
            this.setState({
                dirty: false,
                currentConfig: (0, lodash_1.cloneDeep)(initialConfig),
            });
        },
        updateConfig: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var currentConfig, _a, entity, entityId;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            currentConfig = this.state.currentConfig;
                            _a = this.props, entity = _a.entity, entityId = _a.entityId;
                            return [4 /*yield*/, this.features.config.updateConfig(entity, entityId, currentConfig)];
                        case 1:
                            _b.sent();
                            this.setMessage({
                                content: '操作成功',
                                type: 'success',
                            });
                            return [2 /*return*/];
                    }
                });
            });
        }
    },
});
