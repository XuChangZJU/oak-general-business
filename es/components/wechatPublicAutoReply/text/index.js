export default OakComponent({
    isList: false,
    properties: {
        text: '',
        getContent: (content) => undefined,
    },
    data: {
        editor: null,
    },
    lifetimes: {
        detached() {
            const { editor } = this.state;
            if (editor == null)
                return;
            editor.destroy();
            this.setEditor(null);
        },
    },
    listeners: {
        'editor,value'(prev, next) {
            if (prev.editor !== next.editor ||
                prev.value !== next.value) {
                if (next.editor && next.value) {
                    next.editor.setHtml(next.value);
                }
            }
        },
    },
    methods: {
        setEditor(editor) {
            this.setState({
                editor,
            });
        },
        async setHtml(html) {
            this.setState({
                html,
            });
            if (html && html !== '<p><br></p>') {
            }
        },
    }
});
