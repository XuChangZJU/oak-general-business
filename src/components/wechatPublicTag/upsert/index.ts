import { assert } from 'oak-domain/lib/utils/assert';

export default OakComponent({
    isList: false,
    properties: {
        isUpdate: false,
        text: '',
        tagName: '',
        open: false,
        changeOpen: (open: boolean) => undefined as void,
        editTag: () => undefined as void,
        addTag: () => undefined as void,
        changeText: (text: string) => undefined as void,
    },
    methods: {},
});
