Component({
    options: {
        multipleSlots: true,
    },
    externalClasses: [
        'l-class',
        'l-panel-class',
        'l-content-class',
        'l-title-box-class',
        'l-title-class',
    ],
    properties: {
        title: {
            type: String,
            value: '',
        },
        hideTop: {
            type: Boolean,
            value: false,
        },
        showCircle: {
            type: Boolean,
            value: true,
        },
        showTitle: {
            type: Boolean,
            value: true,
        },
    },
});
