var ECode;
(function (ECode) {
    ECode["forbidden"] = "403";
    ECode["notFound"] = "404";
    ECode["error"] = "500";
    ECode["networkError"] = "network-error";
    ECode["maintenance"] = "maintenance";
})(ECode || (ECode = {}));
;
const DefaultErrorInfo = {
    [ECode.forbidden]: {
        title: '403 Forbidden',
        desc: '抱歉，您无权限访问此页面',
        imagePath: './assets/svg/assets-result-403.svg',
    },
    [ECode.notFound]: {
        title: '404 Not Found',
        desc: '抱歉，您访问的页面不存在。',
        imagePath: './assets/svg/assets-result-404.svg',
    },
    [ECode.error]: {
        title: '500 Internal Server Error',
        desc: '抱歉，服务器出错啦！',
        imagePath: './assets/svg/assets-result-500.svg',
    },
    [ECode.networkError]: {
        title: '网络异常',
        desc: '网络异常，请稍后再试',
        imagePath: './assets/svg/assets-result-network-error.svg',
    },
    [ECode.maintenance]: {
        title: '系统维护中',
        desc: '系统维护中，请稍后再试。',
        imagePath: './assets/svg/assets-result-maintenance.svg',
    },
};
export default Component({
    properties: {
        code: String,
        title: String,
        desc: String,
        icon: String,
        imagePath: String,
    },
    lifetimes: {
        ready() {
            const { title, desc, code, imagePath } = this.data;
            let title2 = title;
            if (code) {
                this.setData({
                    desc: desc || DefaultErrorInfo[code].desc,
                    imagePath: imagePath || DefaultErrorInfo[code].imagePath,
                });
                if (!title2) {
                    title2 = DefaultErrorInfo[code].title;
                }
                wx.setNavigationBarTitle({
                    title: title2,
                });
            }
        }
    },
    methods: {
        goBack() {
            wx.navigateBack();
        }
    }
});
