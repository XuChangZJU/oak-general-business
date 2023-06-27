export default OakComponent({
  entity: 'article',
  isList: true,
  projection: {
    id: 1,
    name: 1,
    content: 1,
    articleMenu: {
      id: 1,
      name: 1,
      isArticle: 1,
      isLeaf: 1,
    }
  },
  methods: {
    async onRemoveArticle(id: string) {
      this.removeItem(id);
      await this.execute();
    },
    gotoArticleEdit(articleId: string) {
      this.navigateTo({
        url: '/article2/upsert',
        oakId: articleId
      })
    },
  },
});
