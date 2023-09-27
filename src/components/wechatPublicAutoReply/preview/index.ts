import { ReplyType } from "../../../types/WeChat";
export default OakComponent({
    isList: false,
    properties: {
        type: '' as ReplyType,
        content: {text: '', image: '', video: '', voice: ''},
    },
    methods: {
    },
});
