// index.ts

OakComponent({
    entity: 'area',
    formData: ([area]) => ({
        name: area?.name!,
    }),
}, {});