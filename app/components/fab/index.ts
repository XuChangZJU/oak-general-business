Component({
  
  properties: {
    // button组建标识
    bottom: {
      type: Number,
      value: 50,
    },
    right: {
      type: Number,
      value: 32,
    },
    name: {
      type: String,
      value: 'lin'
    },
    type: {
      type: String,
      value: 'default',
      options: ['warning', 'success', 'error', 'default']
    },
    plain: Boolean,
    size: {
      type: String,
      value: 'medium',
      options: ['medium', 'large', 'mini', 'long']
    },
    shape: {
      type: String,
      value: 'circle',
      options: ['square', 'circle', 'semicircle']
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    special: {
      type: Boolean,
      value: false,
    },
    // 微信原生接口
    width: Number,
    height: Number,
    icon: String,
    image: String,
    bgColor: String,
    iconColor: String,
    iconSize: String,
    openType: String,
    appParameter: String,
    lang: String,
    hoverStopPropagation: Boolean,
    hoverStartTime: {
      type: Number,
      value: 20
    },
    hoverStayTime: {
      type: Number,
      value: 70
    },
    sessionFrom: {
      type: String,
      value: ''
    },
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    formType: String,
    disabledHover: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    // button点击事件
    handleTap() {
      if (this.data.disabled || this.data.loading) return false;
      this.triggerEvent('click', {}, {
        bubbles: true,
        composed: true
      });
    },
    // 开放能力事件回调
    openTypeEvent(data:any) {
      this.triggerEvent(data.type, data.detail, {});
    }
  }
});
