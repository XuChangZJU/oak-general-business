export default OakComponent({
    isList: false,
    formData({ data, features }) {
        const userInfo = features.token.getUserInfo();
        const mobile = userInfo?.mobile$user && userInfo?.mobile$user[0]?.mobile;
        const extraFile = userInfo?.extraFile$entity?.find((ele) => ele.tag1 === 'avatar');
        const avatarUrl = features.extraFile.getUrl(extraFile);
        return {
            mobile,
            avatarUrl,
            nickname: userInfo?.nickname,
            name: userInfo?.name,
        };
    },
    methods: {},
});
