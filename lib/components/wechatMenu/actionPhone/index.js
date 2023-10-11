"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    properties: {
        id: '',
        config: null,
        menuIndex: 0,
        changeConfig: (config) => undefined,
        menuType: '',
        getSelectedBtn: (selectedBtn) => undefined,
        getSelectedSubBtn: (selectedSubBtn) => undefined,
        getCurrentIndex: (currentIndex) => undefined,
        errorIndex: [],
        isPreview: false,
        open: false,
        tabKey: '',
    },
    data: {},
    methods: {
        deleteMenuItem(index) {
            const { config, changeConfig, menuIndex, menuType } = this.props;
            config.button.splice(index, 1);
            changeConfig(config);
            this.setMessage({
                content: '操作成功',
                type: 'success'
            });
        },
        toRight(index) {
            const { config, changeConfig, menuIndex, menuType } = this.props;
            config.button = [
                ...config.button.slice(0, index - 1),
                config.button[index],
                config.button[index - 1],
                ...config.button.slice(index + 1)
            ];
            changeConfig(config);
        },
        toLeft(index) {
            const { config, changeConfig, menuIndex, menuType } = this.props;
            config.button = [
                ...config.button.slice(0, index - 2),
                config.button[index - 1],
                config.button[index - 2],
                ...config.button.slice(index)
            ];
            changeConfig(config);
        },
        toUp(currentIndex, index) {
            const { config, changeConfig, menuIndex, menuType } = this.props;
            let menu = config.button[currentIndex];
            const subMenu = [
                ...menu.sub_button.slice(0, index - 2),
                menu.sub_button[index - 1],
                menu.sub_button[index - 2],
                ...menu.sub_button.slice(index)
            ];
            config.button[currentIndex].sub_button = subMenu;
            changeConfig(config);
        },
        toDown(currentIndex, index) {
            const { config, changeConfig, menuIndex, menuType } = this.props;
            let menu = config.button[currentIndex];
            const subMenu = [
                ...menu.sub_button.slice(0, index - 1),
                menu.sub_button[index],
                menu.sub_button[index - 1],
                ...menu.sub_button.slice(index + 1)
            ];
            config.button[currentIndex].sub_button = subMenu;
            changeConfig(config);
        },
        deleteSubMenuItem(index, currentIndex) {
            const { config, changeConfig, menuIndex, menuType } = this.props;
            config.button[currentIndex].sub_button.splice(index, 1);
            changeConfig(config);
            this.setMessage({
                content: '操作成功',
                type: 'success'
            });
        },
    }
});
