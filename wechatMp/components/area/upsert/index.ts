// index.ts

OakComponent({
    entity: 'area',
    isList: false,
    formData: async ({ data: area }) => ({
        name: area?.name!,
    }),
});