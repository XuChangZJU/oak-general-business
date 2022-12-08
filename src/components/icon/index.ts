Component({    
    properties: {
        type: {
            type: String,
            value: '',
        },
        size: {
            type: [String, Number],
            value: 0,
        },
        color: {
            type: String,
            value: '',
        },
        name: {
            type: String,
            value: '',
        }
    },
    methods: {
        // updated() {
        //     const { type } = this.data;
        //     if (['fas', 'far'].includes(type)) {
        //         const { size, name, color } = this.data;
        //         this.setData({
        //             clazz: `${type} fa-${size || '1x'} fa-${name} ${color || 'primary'}`,
        //         });
        //     }
        // },
    },
    // attached() {
    //     this.updated()
    // },
})