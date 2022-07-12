Component({
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
            value: 'primary',
            options: ['primary', 'warning', 'success', 'error'],
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
            this.setData({
                status: true,
            });
            // @ts-ignore
            if (this.data.timer) clearTimeout(this.data.timer);
            // @ts-ignore
            this.data.timer = setTimeout(() => {
                this.setData({
                    status: false,
                });
                // @ts-ignore
                if (this.data.success) this.data.success();
                // @ts-ignore
                this.data.timer = null;
            }, this.properties.duration);
        },
        initMessage() {
            // @ts-ignore
            wx.oak = wx.oak || {};
            // @ts-ignore
            wx.oak.showMessage = (options = {}) => {
                const {
                    content = '',
                    image = '',
                    type = 'primary',
                    duration = 1500,
                    success = null,
                    top = 0,
                } = options as {
                    content: string;
                    image: string;
                    type: string;
                    duration: number;
                    success: any;
                    top: number;
                };
                // @ts-ignore
                this.data.success = success;
                this.setData({
                    content,
                    image,
                    duration,
                    type,
                    top,
                });
                this.changeStatus();
                return this;
            };
            // @ts-ignore
            wx.oak.hideMessage = () => {
                this.setData({
                    status: false,
                });
            };
        },
    },
});
