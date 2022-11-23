"use strict";
// index.ts
OakComponent({
    entity: 'area',
    isList: false,
    formData: function (_a) {
        var area = _a.data;
        return ({
            name: area === null || area === void 0 ? void 0 : area.name,
        });
    },
});
