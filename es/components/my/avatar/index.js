export default OakComponent({
    isList: false,
    properties: {
        shape: 'circle',
        size: 0,
        iconColor: 'primary',
        iconName: 'user',
    },
    formData({ features }) {
        const userInfo = features.token.getUserInfo();
        if (userInfo) {
            const extraFile = userInfo?.extraFile$entity?.find((ele) => ele.tag1 === 'avatar');
            const avatarUrl = extraFile && features.extraFile.getUrl(extraFile);
            return {
                avatarUrl,
            };
        }
        return {
            avatarUrl: '',
        };
    },
});
