import { composeFileUrl } from '../../../../src/utils/extraFile';
OakComponent({
    entity: 'extraFile',
    formData: async (_rows, _features) => {        
        return {
            src: composeFileUrl(_rows[0]!),
        }
    }
}, {
    methods: {
    },
    lifetimes: {
    }
});