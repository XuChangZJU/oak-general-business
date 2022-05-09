Component({
  properties: {
    name: String,
    color: {
      type: String,
      value: '#3963bc'
    },
    size: {
      type: String,
      value: '44'
    },
  },

  ready: function () {
    if (!this.properties.name) {
      console.error('请传入Icon组件的name属性');
    }
  },
  methods: {
  }
});
