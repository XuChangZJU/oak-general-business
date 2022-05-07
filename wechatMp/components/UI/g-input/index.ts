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
        autofocus: {
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
        handleInputChange(event:any) {
            const { detail = {} } = event;
            const { value = '' } = detail;
            this.setData({ value });

            this.triggerEvent('change', event);
        },

        handleInputFocus(event:any) {
            this.triggerEvent('focus', event);
        },

        handleInputBlur(event:any) {
            this.triggerEvent('blur', event);
        }
    }
});
