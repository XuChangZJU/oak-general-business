// index.ts

OakComponent({
    entity: 'area',
    isList: false,
    formData: ({ data: area }) => ({
        name: area?.name!,
    }),
});