
export default OakComponent({
    isList: false,
    properties: {
        id: '',
        config: null as any,
        menuIndex: 0,
        changeConfig: (config: any) => undefined as void,
        menuType: '',
        getSelectedBtn: (selectedBtn: number) => undefined as void,
        getSelectedSubBtn: (selectedSubBtn: number) => undefined as void,
        getCurrentIndex: (currentIndex: number) => undefined as void,
        errorIndex: [] as number[],
        isPreview: false,
        open: false,
    },
    data: {

    },
    methods: {
        deleteMenuItem(index: number) {
            const { config, changeConfig, menuIndex, menuType } = this.props;
            config!.button!.splice(index, 1);
            changeConfig!(config);
            this.setMessage({
                content: '操作成功',
                type: 'success'
            })
        },
        toRight(index: number) {
            const { config, changeConfig, menuIndex, menuType } = this.props;
            config.button = [
                ...config!.button!.slice(0, index - 1),
                config!.button![index],
                config!.button![index - 1],
                ...config!.button!.slice(index + 1)
            ]
            changeConfig!(config);
        },
        toLeft(index: number) {
            const { config, changeConfig, menuIndex, menuType } = this.props;
            config.button = [
                ...config!.button!.slice(0, index - 2),
                config!.button![index - 1],
                config!.button![index - 2],
                ...config!.button!.slice(index)
            ]
            changeConfig!(config);

        },
        toUp(currentIndex: number, index: number) {
            const { config, changeConfig, menuIndex, menuType } = this.props;
            let menu = config!.button![currentIndex];
            const subMenu = [
                ...menu.sub_button.slice(0, index - 2),
                menu.sub_button[index - 1],
                menu.sub_button[index - 2],
                ...menu.sub_button.slice(index)
            ];
            config!.button![currentIndex].sub_button = subMenu;
            changeConfig!(config);
        },
        toDown(currentIndex: number, index: number) {
            const { config, changeConfig, menuIndex, menuType } = this.props;
            let menu = config!.button![currentIndex];
            const subMenu = [
                ...menu.sub_button.slice(0, index - 1),
                menu.sub_button[index],
                menu.sub_button[index - 1],
                ...menu.sub_button.slice(index + 1)
            ];
            config!.button![currentIndex].sub_button = subMenu;
            changeConfig!(config);
        },
        deleteSubMenuItem(index: number, currentIndex: number) {
            const { config, changeConfig, menuIndex, menuType } = this.props;
            config!.button![currentIndex].sub_button.splice(index, 1);
            changeConfig!(config);
            this.setMessage({
                content: '操作成功',
                type: 'success'
            })
        },
    }
});