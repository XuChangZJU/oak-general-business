
export default OakComponent({
    isList: false,
    properties: {
        shape: 'circle' as string,
        size: 0 as number | string,
        iconColor: 'primary' as string,
        iconName: 'user' as string,
    },
    formData({ features }) {
        const userInfo = features.token.getUserInfo();
        if (userInfo) {
            const extraFile = userInfo?.extraFile$entity?.find(
                (ele) => ele.tag1 === 'avatar'
            );

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
