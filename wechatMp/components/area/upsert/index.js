"use strict";
// index.ts
OakComponent({
    entity: 'area',
    formData: async ([area]) => ({
        name: area.name,
    }),
}, {});
