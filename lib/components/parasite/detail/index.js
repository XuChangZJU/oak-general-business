"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'parasite',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        expired: 1,
        expiresAt: 1,
        userId: 1,
    },
    isList: false,
    formData: function (_a) {
        var parasite = _a.data, props = _a.props;
        var hostname = window.location.hostname;
        var port = window.location.port ? ":".concat(window.location.port) : '';
        var colon = window.location.protocol.endsWith(':') ? '' : ':';
        var url = "".concat(window.location.protocol).concat(colon, "//").concat(hostname).concat(port, "/parasite/excess?oakId=").concat(props.oakId);
        return {
            entity: parasite === null || parasite === void 0 ? void 0 : parasite.entity,
            url: url,
            expired: parasite === null || parasite === void 0 ? void 0 : parasite.expired,
            expiresAt: parasite === null || parasite === void 0 ? void 0 : parasite.expiresAt,
        };
    },
    methods: {
        copy: function (text) {
            var _this = this;
            if (text) {
                navigator.clipboard.writeText(text).then(function () {
                    _this.setMessage({
                        content: '复制成功',
                        type: 'success',
                    });
                });
            }
        },
    }
});
