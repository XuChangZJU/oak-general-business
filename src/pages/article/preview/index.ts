

export default OakPage({
    path: 'article:preview',
    isList: false,
    formData: async function ({ features }) {
        return {};
    },
    observers: {
        content: (val) => {
            const ac = window.document.getElementById('article-content');
            if (ac) {
                ac.innerHTML = val;
            }
        },
    },
    data: {
        content: '',
        title: '',
        author: '',
    },
    methods: {
        onLoad() {
            const data = this.load('article_html') || '{}';
            const data2 = typeof data === 'string' ? JSON.parse(data) : data;
            this.setState({
                content: data2?.content,
                title: data2?.title,
                author: data2?.author,
            });
        },
        onUnload() {
            this.save('article_html', '{}');
        },
    },
});
