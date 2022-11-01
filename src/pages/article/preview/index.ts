

export default OakComponent({
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
