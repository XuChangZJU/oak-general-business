"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var lodash_1 = require("oak-domain/lib/utils/lodash");
exports.default = OakComponent({
    isList: false,
    properties: {
        config: {},
        entity: '',
        name: '',
        entityId: '',
        type: '',
        isService: true,
    },
    data: {
        initialConfig: {},
        dirty: false,
        currentConfig: {},
    },
    listeners: {
        config: function (prev, next) {
            var _a;
            if (prev.config !== next.config) {
                var config2 = next.config || {};
                if (!next.config || !((_a = next.config) === null || _a === void 0 ? void 0 : _a.type)) {
                    Object.assign(config2, {
                        type: this.props.type,
                    });
                }
                this.setState({
                    initialConfig: config2,
                    dirty: false,
                    currentConfig: (0, lodash_1.cloneDeep)(config2),
                });
            }
        },
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
        cleanKey: function (path, key) {
            var currentConfig = this.state.currentConfig;
            var obj = (0, lodash_1.get)(currentConfig, path);
            var obj2 = (0, lodash_1.omit)(obj, [key]);
            (0, lodash_1.set)(currentConfig, path, obj2);
            var newConfig = (0, lodash_1.cloneDeep)(currentConfig);
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
                            return [4 /*yield*/, this.features.config.updateApplicationConfig(entity, entityId, currentConfig)];
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
        },
    },
});
