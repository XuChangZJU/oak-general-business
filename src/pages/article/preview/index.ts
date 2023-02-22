

export default OakComponent({
    isList: false,
    formData: async function ({ features }) {
        return {};
    },
    listeners: {
        content(prev, next) {
            if (prev.content !== next.content) {
                const ac = window.document.getElementById('article-content');
                if (ac) {
                    ac.innerHTML = next.content;
                }
            }
        },
    },
    data: {
        content: '',
        title: '',
        author: '',
    },
    lifetimes: {
        attached() {
            const data = this.load('article_html') || '{}';
            const data2 = typeof data === 'string' ? JSON.parse(data) : data;
            this.setState({
                content: data2?.content,
                title: data2?.title,
                author: data2?.author,
            });
        },
        detached() {
            this.save('article_html', '{}');
        },
    },
    methods: {},
});
