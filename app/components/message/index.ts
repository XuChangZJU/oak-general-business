export default OakComponent({
    options: {
        multipleSlots: true,
    },
    externalClasses: ['l-class', 'l-image-class', 'l-lass-image'],
    properties: {
        zIndex: {
            type: Number,
            value: 777,
        },
        show: Boolean,
        icon: String,
        iconColor: {
            type: String,
            value: '#fff',
        },
        iconSize: {
            type: String,
            value: '28',
        },
        image: String,
        content: String,
        type: {
            type: String,
            value: 'info',
            options: ['info', 'warning', 'success', 'error', 'loading'],
        },
        duration: {
            type: Number,
            value: 1500,
        },
        openApi: {
            type: Boolean,
            value: true,
        },
        /**
         * message距离顶部的距离
         */
        top: {
            type: Number,
            value: 0,
        },
    },

    data: {
        status: false,
    },

    // 解决 addListener undefined 的错误
    observers: {
        show: function (show) {
            show && this.changeStatus();
            if (!show)
                this.setData({
                    status: show,
                });
        },
    },

    lifetimes: {
        attached() {
            this.initMessage();
        },
    },

    pageLifetimes: {
        show() {
            this.initMessage();
        },
    },

    methods: {
        changeStatus() {
            this.setState({
                status: true,
            });
            // @ts-ignore
            if (this.data.timer) clearTimeout(this.data.timer);
            // @ts-ignore
            this.data.timer = setTimeout(() => {
                this.setState({
                    status: false,
                });
                // @ts-ignore
                if (this.data.success) this.data.success();
                // @ts-ignore
                this.data.timer = null;
            }, this.data.duration);
        },
        initMessage() {
            let oak;
            // 小程序有wx、web有window
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                // @ts-ignore
                oak = wx.oak || {};
            } else {
                // @ts-ignore
                oak = window.oak || {};
            }
            oak.showMessage = (options: {
                content: string;
                image: string;
                type: string;
                duration: number;
                success: any;
                top: number;
            }) => {
                const {
                    content = '',
                    image = '',
                    type = 'info',
                    duration = 1500,
                    success = null,
                    top = 0,
                } = options;
                this.data.success = success;
                this.setState({
                    // @ts-ignore
                    content,
                    image,
                    duration,
                    type,
                    top,
                });
                this.changeStatus();
                return this;
            };
            oak.hideMessage = () => {
                this.setState({
                    status: false,
                });
            };
        },
    },
});
