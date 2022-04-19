"use strict";
// index.ts
// 获取应用实例
OakComponent({
    entity: 'area',
    formData: ([area]) => ({
        name: area?.name,
    }),
}, {});
