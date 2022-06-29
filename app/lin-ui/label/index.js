// input/input.js
import eventBus from '../core/utils/event-bus.js';
import validator from '../behaviors/validator';
import rules from '../behaviors/rules';

Component({
    /**
     * 组件的属性列表
     */
    options: {
        multipleSlots: true,
    },
    behaviors: ['wx://form-field', validator, rules],
    externalClasses: [
        'l-class',
        'l-label-class',
        'l-error-text',
        'l-error-text-class',
        'l-desc-class',
        'l-row-class',
    ],
    properties: {
        // 表单标题（label）的文本
        label: String,
        // 是否隐藏label
        hideLabel: Boolean,
        // 是否自定义label部分
        labelCustom: Boolean,
        // 是否显示下划线
        showRow: {
            type: Boolean,
            value: true,
        },
        // 是否必选
        required: Boolean,
        // 占位文本
        placeholder: {
            type: String,
            value: '请选择',
        },
        arr: {
            type: Array,
        },
        // 传入的值
        value: {
            type: null,
            optionalTypes: [String, Number],
            value: '',
        },
        // 是否需要冒号
        colon: Boolean,
        // 获取焦点
        focus: Boolean,
        // 是否显示清除按钮
        clear: Boolean,
        showIcon: {
            type: Boolean,
            value: true,
        },
        // 表单项的宽度，单位rpx
        width: {
            type: Number,
            value: null,
        },
        // 表单项标题部分的宽度，单位rpx
        labelWidth: {
            type: Number,
            value: 200,
        },
        // label标题的显示位置 left top right
        labelLayout: {
            type: String,
            value: 'left',
            options: ['left', 'right'],
        },
        // 是否禁用
        disabled: Boolean,
        // 占位文字的样式
        placeholderStyle: String,
        special: {
            type: Boolean,
            value: false,
        },
    },

    /**
     * 组件的初始数据
     */
    data: {},
    attached() {
        // this.initRules();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        handleTap(e) {
            this.triggerEvent(
                'lintap',
                {
                    e,
                },
                { bubbles: true, composed: true }
            );
        },
        onClearTap(e) {
            this.triggerEvent(
                'linclear',
                {
                    e,
                },
                { bubbles: true, composed: true }
            );
        },
        getValues() {
            return this.data.value;
        },
    },
});
