export default OakComponent({
  entity: 'article',
  isList: false,
  projection: {
      id: 1,
      name: 1,
      content: 1,
      articleMenu: {
          id: 1,
          name: 1,
          isArticle: 1,
          isLeaf: 1,
      },
  },
  formData: function ({ data: article }) {
      return {
          content: article?.content,
          name: article?.name,
      };
  },
  methods: {
    copy(articleId: string) {
        const url = `${window.location.host}/article/preview?oakId=${articleId}`;
        navigator.clipboard.writeText(url).then(() => {
            this.setMessage({
                content: '复制链接成功',
                type: 'success',
            });
        });
    },
  }
});
