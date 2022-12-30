export default OakComponent({
    entity: 'mobile',
    isList: true,
    projection: {
        id: 1,
        mobile: 1,
    },
    formData({ data }) {
        return {
            mobiles: data && data.filter(
                ele => !ele.$$deleteAt$$
            ),
        };
    },
    methods: {
        onAddMp() {
            this.addItem({
                mobile: '',
            });
        },
        onMobileSetMp(e: WechatMiniprogram.Input) {
            const { id } = e.currentTarget.dataset;
            const { value } = e.detail;
            this.updateItem({
                mobile: value,
            }, id);
        },
        onDeleteMp(e: WechatMiniprogram.TouchEvent) {
            const { id } = e.currentTarget.dataset;
            this.removeItem(id);
        }
    }
})