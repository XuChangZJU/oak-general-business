

export default OakComponent({
    entity: 'article',
    projection: {
        id: 1,
        iState: 1,
        title: 1,
        author: 1,
        abstract: 1,
        content: 1,
    },
    isList: false,
    formData: async function ({ data: article, features }) {
        return {
            id: article?.id,
            iState: article?.iState,
            title: article?.title,
            abstract: article?.abstract,
            author: article?.author,
            content: article?.content,
        };
    },
    observers: {
        'content': (val) => {
            const ac = window.document.getElementById('article-content');
            if (ac) {
                 ac.innerHTML = val;
            }
        }
    },    
});
