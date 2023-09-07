export default OakComponent({
    isList: false,
    entity: 'article',
    projection: {
        id: 1,
        name: 1,
        content: 1,
        articleMenu: {
            id: 1,
        }
    },
    formData: function ({ data: article, features }) {
        return {
            id: article?.id,
            content: article?.content,
            name: article?.name,
        };
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
