Component({
    behaviors: ['wx://form-field'],

    properties: {
        title: {
            type: String
        },
        // text || textarea || password || number
        type: {
            type: String,
            value: 'text'
        },
        disabled: {
            type: Boolean,
            value: false
        },
        placeholder: {
            type: String,
            value: ''
        },
        focus: {
            type: Boolean,
            value: false
        },
        mode: {
            type: String,
            value: 'normal'
        },
        right: {
            type: Boolean,
            value: false
        },
        error: {
            type: Boolean,
            value: false
        },
        maxlength: {
            type: Number,
            value: 140,
        }
    },

    methods: {
        handleInputChange(event: WechatMiniprogram.Input) {
            const { detail } = event;
            const { value } = detail;
            this.setData({ value });

            this.triggerEvent('change', event.detail);
        },

        handleInputFocus(event: WechatMiniprogram.InputFocus) {
            this.triggerEvent('focus', event.detail);
        },

        handleInputBlur(event: WechatMiniprogram.InputBlur) {
            this.triggerEvent('blur', event.detail);
        }
    }
});
