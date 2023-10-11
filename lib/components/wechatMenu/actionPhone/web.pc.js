"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const { confirm } = antd_1.Modal;
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const icons_1 = require("@ant-design/icons");
function Render(props) {
    const { config, errorIndex, menuIndex, menuType, changeConfig, getSelectedBtn, getSelectedSubBtn, getCurrentIndex, isPreview, open, tabKey, } = props.data;
    const { deleteMenuItem, toRight, toLeft, toUp, toDown, deleteSubMenuItem, } = props.methods;
    const [selectedBtn, setSelectedBtn] = (0, react_1.useState)(0);
    const [selectedSubBtn, setSelectedSubBtn] = (0, react_1.useState)(0);
    const [currentIndex, setCurrentIndex] = (0, react_1.useState)(1);
    const [onlyOne, setOnlyOne] = (0, react_1.useState)(true);
    const [currentMenuType, setCurrentMenuType] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        if (config && config.button && config.button[0] && onlyOne) {
            setSelectedBtn(1);
            getSelectedBtn(1);
            setOnlyOne(false);
        }
    }, [config]);
    (0, react_1.useEffect)(() => {
        if (selectedBtn !== 0) {
            setSelectedSubBtn(0);
            getSelectedSubBtn(0);
            setCurrentIndex(selectedBtn - 1);
            getCurrentIndex(selectedBtn - 1);
        }
    }, [selectedBtn]);
    (0, react_1.useEffect)(() => {
        if (selectedSubBtn !== 0) {
            setSelectedBtn(0);
            getSelectedBtn(0);
        }
    }, [selectedSubBtn]);
    (0, react_1.useEffect)(() => {
        if (menuType && menuType === 'common') {
            setCurrentMenuType(1);
            return;
        }
        if (menuType && menuType === 'conditional') {
            setCurrentMenuType(2);
            return;
        }
    }, [menuType]);
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.phone, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.topBar, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.time, children: "1:21" }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.icons, children: (0, jsx_runtime_1.jsx)(icons_1.WifiOutlined, { style: { fontSize: 12 } }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.actionBar, children: [(0, jsx_runtime_1.jsx)(icons_1.LeftOutlined, { style: { fontSize: 18 } }), (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, { style: { fontSize: 18 } })] }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.page }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.bottomBar, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.keyBoard }), config && config.button && config.button.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.menu, children: [config.button.map((ele, index) => ((0, jsx_runtime_1.jsx)(antd_1.Popover, { open: !open && !isPreview && currentIndex === index && ((menuType === 'common' && currentMenuType === 1) || (menuType === 'conditional' && currentMenuType === 2)) && tabKey === 'menu', trigger: 'click', content: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.subMenu, children: config.button[index].sub_button.length > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [config.button[index].sub_button.map((ele, index2) => ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.subMenuContent, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.subMenuItem, style: errorIndex?.includes((index + 1) * 10 + index2) ? {
                                                                border: '1px solid #FF4D4F',
                                                                color: '#FF4D4F'
                                                            }
                                                                :
                                                                    selectedSubBtn === index2 + 1 ?
                                                                        {
                                                                            border: '1px solid #1677FF',
                                                                            color: '#1677FF'
                                                                        } :
                                                                        {}, onClick: () => {
                                                                setSelectedSubBtn(index2 + 1);
                                                                getSelectedSubBtn(index2 + 1);
                                                            }, children: ele.name }), selectedSubBtn === index2 + 1 &&
                                                            (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.subButtonGroup, children: [selectedSubBtn > 1
                                                                        && config.button[currentIndex].sub_button.length !== 1 &&
                                                                        (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                                                toUp(currentIndex, selectedSubBtn);
                                                                                setSelectedSubBtn(selectedSubBtn - 1);
                                                                                getSelectedSubBtn(selectedSubBtn - 1);
                                                                            }, children: (0, jsx_runtime_1.jsx)(icons_1.ArrowUpOutlined, {}) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                                            const modal = confirm({
                                                                                title: '确定删除该菜单吗？',
                                                                                content: '删除后不可恢复',
                                                                                okText: '确定',
                                                                                cancelText: '取消',
                                                                                onOk: async (e) => {
                                                                                    if (selectedSubBtn !== 1 && config.button[currentIndex].sub_button.length > 1) {
                                                                                        setSelectedSubBtn(selectedSubBtn - 1);
                                                                                        getSelectedSubBtn(selectedSubBtn - 1);
                                                                                    }
                                                                                    else if (selectedSubBtn === 1 && config.button[currentIndex].sub_button.length > 1) {
                                                                                        setSelectedSubBtn(1);
                                                                                        getSelectedSubBtn(1);
                                                                                    }
                                                                                    else {
                                                                                        setSelectedBtn(currentIndex + 1);
                                                                                        getSelectedBtn(currentIndex + 1);
                                                                                    }
                                                                                    deleteSubMenuItem(selectedSubBtn - 1, currentIndex);
                                                                                    modal.destroy();
                                                                                },
                                                                            });
                                                                        }, children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) }), selectedSubBtn < config.button[currentIndex].sub_button.length
                                                                        && config.button[currentIndex].sub_button.length > 1 &&
                                                                        (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                                                toDown(currentIndex, selectedSubBtn);
                                                                                setSelectedSubBtn(selectedSubBtn + 1);
                                                                                getSelectedSubBtn(selectedSubBtn + 1);
                                                                            }, children: (0, jsx_runtime_1.jsx)(icons_1.ArrowDownOutlined, {}) })] })] }))), config.button[index].sub_button.length !== 5 &&
                                                    (0, jsx_runtime_1.jsxs)("div", { style: { border: 0 }, className: web_module_less_1.default.subMenuItem, onClick: () => {
                                                            config.button[index] = {
                                                                name: config.button[index].name,
                                                                sub_button: [
                                                                    ...config.button[index].sub_button,
                                                                    {
                                                                        name: '子菜单名称',
                                                                    }
                                                                ]
                                                            };
                                                            changeConfig(config);
                                                            setSelectedSubBtn(config.button[index].sub_button.length);
                                                            getSelectedSubBtn(config.button[index].sub_button.length);
                                                        }, children: [(0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), "\u6DFB\u52A0"] })] })) : ((0, jsx_runtime_1.jsxs)("div", { style: { border: 0 }, className: web_module_less_1.default.subMenuItem, onClick: () => {
                                                config.button[index] = {
                                                    name: config.button[index].name,
                                                    sub_button: [
                                                        {
                                                            name: '子菜单名称',
                                                        }
                                                    ]
                                                };
                                                changeConfig(config);
                                                setSelectedSubBtn(1);
                                                getSelectedSubBtn(1);
                                            }, children: [(0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), "\u6DFB\u52A0"] })) }), children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.menuItem, onClick: () => { setSelectedBtn(index + 1); getSelectedBtn(index + 1); }, style: errorIndex?.includes(index) ?
                                            { margin: 0, border: '1px solid #FF4D4F' }
                                            :
                                                selectedBtn === index + 1 ?
                                                    { margin: 0, border: '1px solid #1677FF', color: '#1677FF' }
                                                    :
                                                        {}, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.menuName, style: errorIndex?.includes(index) ? {
                                                    color: '#FF4D4F'
                                                } : {}, children: ele.name }), selectedBtn === index + 1 &&
                                                (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.buttonGroup, children: [selectedBtn > 1
                                                            && config.button.length !== 1
                                                            && (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                                    toLeft(selectedBtn);
                                                                    setSelectedBtn(selectedBtn - 1);
                                                                    getSelectedBtn(selectedBtn - 1);
                                                                }, style: { color: '#1F1F1F' }, children: (0, jsx_runtime_1.jsx)(icons_1.ArrowLeftOutlined, {}) }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                                const modal = confirm({
                                                                    title: '确定删除该菜单吗？',
                                                                    content: '删除后不可恢复',
                                                                    okText: '确定',
                                                                    cancelText: '取消',
                                                                    onOk: async (e) => {
                                                                        if (selectedBtn !== 1 && config.button.length > 1) {
                                                                            setSelectedBtn(selectedBtn - 1);
                                                                            getSelectedBtn(selectedBtn - 1);
                                                                        }
                                                                        else if (selectedBtn === 1 && config.button.length > 1) {
                                                                            setSelectedBtn(1);
                                                                            getSelectedBtn(1);
                                                                        }
                                                                        else {
                                                                            setSelectedBtn(currentIndex + 1);
                                                                            getSelectedBtn(currentIndex + 1);
                                                                        }
                                                                        deleteMenuItem(selectedBtn - 1);
                                                                        modal.destroy();
                                                                    },
                                                                });
                                                            }, style: { color: '#1F1F1F' }, children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) }), selectedBtn < config.button.length
                                                            && config.button.length > 1 &&
                                                            (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.buttonItem, onClick: () => {
                                                                    toRight(selectedBtn);
                                                                    setSelectedBtn(selectedBtn + 1);
                                                                    getSelectedBtn(selectedBtn + 1);
                                                                }, style: { color: '#1F1F1F' }, children: (0, jsx_runtime_1.jsx)(icons_1.ArrowRightOutlined, {}) })] })] }) }))), config.button.length !== 3 &&
                                    (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.button2, onClick: () => {
                                            config.button = [
                                                ...config.button, {
                                                    name: '菜单名称',
                                                    sub_button: [],
                                                }
                                            ];
                                            changeConfig(config);
                                            setSelectedBtn(config.button.length);
                                            getSelectedBtn(config.button.length);
                                        }, children: (0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}) })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.button, onClick: () => {
                                config.button = [{
                                        name: '菜单名称',
                                        sub_button: [],
                                    }];
                                changeConfig(config);
                                setSelectedBtn(1);
                                getSelectedBtn(1);
                            }, children: [(0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), "\u6DFB\u52A0\u83DC\u5355"] }))] })] }) }));
}
exports.default = Render;
