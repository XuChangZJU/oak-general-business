Component({
    externalClasses: ['g-class', 'g-title-class', 'g-content-class'],
    properties: {
        title: {
            type: String,
            value: '',
        },
        // 标题顶部距离
        hideTop: {
            type: Boolean,
            value: false,
        },
        hideBorder: {
            type: Boolean,
            value: false,
        },
    },
});
