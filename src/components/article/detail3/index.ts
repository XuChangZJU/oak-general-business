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
  }
});
