"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = tslib_1.__importDefault(require("assert"));
var lodash_1 = require("oak-domain/lib/utils/lodash");
exports.default = OakComponent({
    entity: 'extraFile',
    isList: true,
    projection: {
        id: 1,
        tag1: 1,
        tag2: 1,
        origin: 1,
        bucket: 1,
        objectId: 1,
        filename: 1,
        extra1: 1,
        extension: 1,
        type: 1,
        entity: 1,
        entityId: 1,
        fileType: 1,
        sort: 1,
        isBridge: 1,
    },
    filters: [
        {
            filter: function () {
                var _a = this.props, tag1 = _a.tag1, tag2 = _a.tag2;
                var filter1 = {};
                if (tag1) {
                    Object.assign(filter1, { tag1: tag1 });
                }
                if (tag2) {
                    Object.assign(filter1, { tag2: tag2 });
                }
                return filter1;
            },
        },
    ],
    formData: function (_a) {
        var _this = this;
        var _b, _c;
        var originalFiles = _a.data, features = _a.features;
        var file;
        var notDeleteFiles = originalFiles === null || originalFiles === void 0 ? void 0 : originalFiles.filter(function (ele) { return !ele.$$deleteAt$$; });
        if (this.props.tag1) {
            file = (_b = notDeleteFiles === null || notDeleteFiles === void 0 ? void 0 : notDeleteFiles.filter(function (ele) { return (ele === null || ele === void 0 ? void 0 : ele.tag1) === _this.props.tag1; })) === null || _b === void 0 ? void 0 : _b[0];
        }
        if (this.props.tag2) {
            file = (_c = notDeleteFiles === null || notDeleteFiles === void 0 ? void 0 : notDeleteFiles.filter(function (ele) { return (ele === null || ele === void 0 ? void 0 : ele.tag2) === _this.props.tag2; })) === null || _c === void 0 ? void 0 : _c[0];
        }
        return {
            file: file,
            src: features.extraFile.getUrl(file),
            isBridge: file === null || file === void 0 ? void 0 : file.isBridge,
        };
    },
    data: {
        isModalOpen: false,
        isModalOpen1: false,
        renderImgs: [],
        methodsType: '',
        bridgeUrl: '',
        originImgLoading: false,
        renderImgUrl: '',
        selectedId: -1,
    },
    properties: {
        type: '',
        tag1: '',
        tag2: '',
        entity: '',
        entityId: '',
        imgUrls: [],
    },
    lifetimes: {
        // features.getBridgeUrl 中使用了URL.createObjectURL
        attached: function () {
            var renderImgs = this.state.renderImgs;
            if (renderImgs && renderImgs.length) {
                renderImgs.forEach(function (ele) {
                    if (ele.isBridge) {
                        URL.revokeObjectURL(ele.renderUrl);
                    }
                });
            }
        }
    },
    listeners: {
        src: function (prev, next) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var url, err_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(prev !== next && !!this.state.src)) return [3 /*break*/, 6];
                            if (!this.state.isBridge) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.features.extraFile.getBridgeUrl(this.state.src)];
                        case 2:
                            url = _a.sent();
                            this.setState({
                                renderImgUrl: url,
                            });
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            this.setMessage({
                                content: '图片加载错误',
                                type: 'error'
                            });
                            return [3 /*break*/, 4];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            this.setState({
                                renderImgUrl: this.state.src,
                            });
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        },
        imgUrls: function (prev, next) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    // 因为imgUrls是从请求来的， 它有可能比上边的src listener中的getBridgeUrl慢
                    // 所以此处增加前后项imgUrls里都有值且不等的条件再去clean
                    if ((prev === null || prev === void 0 ? void 0 : prev.imgUrls.length) && (next === null || next === void 0 ? void 0 : next.imgUrls.length) && !(0, lodash_1.isEqual)(prev.imgUrls, next.imgUrls)) {
                        this.clean();
                        this.setState({
                            renderImgUrl: '',
                        });
                    }
                    return [2 /*return*/];
                });
            });
        }
    },
    methods: {
        chooseMethod: function (method) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, fileInput_1, imgElement_1, imgUrls, renderImgs, renderImgs2, i, renderUrl, isWechatUrl;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = method;
                            switch (_a) {
                                case 'uploadLocalImg': return [3 /*break*/, 1];
                                case 'url': return [3 /*break*/, 2];
                                case 'original': return [3 /*break*/, 3];
                            }
                            return [3 /*break*/, 11];
                        case 1:
                            fileInput_1 = document.createElement('input');
                            imgElement_1 = document.getElementById('previewImg');
                            fileInput_1.type = 'file';
                            fileInput_1.accept = 'image/png, image/jpeg';
                            fileInput_1.style.display = 'none';
                            fileInput_1.addEventListener('change', function (e) {
                                if (!fileInput_1.files || fileInput_1.files.length === 0) {
                                    return;
                                }
                                // 创建一个 FileReader 对象
                                var reader = new FileReader();
                                // 当文件读取完成后，显示预览图像
                                reader.addEventListener("load", function () {
                                    imgElement_1.src = reader.result;
                                    imgElement_1.style.display = 'block';
                                });
                                // 读取用户选择的文件
                                reader.readAsDataURL(fileInput_1.files[0]);
                                _this.myUpdateItem(fileInput_1.files[0]);
                            });
                            fileInput_1.click();
                            this.setState({
                                methodsType: method
                            });
                            this.setSelectedId(-1);
                            return [3 /*break*/, 11];
                        case 2:
                            this.setState({
                                isModalOpen: true,
                                methodsType: method
                            });
                            return [3 /*break*/, 11];
                        case 3:
                            this.setState({
                                isModalOpen1: true,
                                methodsType: method
                            });
                            imgUrls = this.props.imgUrls;
                            renderImgs = this.state.renderImgs;
                            renderImgs2 = new (Array.bind.apply(Array, tslib_1.__spreadArray([void 0], tslib_1.__read(renderImgs), false)))();
                            if (!(imgUrls && imgUrls.length)) return [3 /*break*/, 10];
                            this.setState({
                                originImgLoading: true,
                            });
                            i = 0;
                            _b.label = 4;
                        case 4:
                            if (!(i < imgUrls.length)) return [3 /*break*/, 9];
                            if (renderImgs2[i] && renderImgs2[i].originUrl === imgUrls[i]) {
                                this.setState({
                                    originImgLoading: false,
                                });
                                return [2 /*return*/];
                            }
                            else if (renderImgs2[i] && renderImgs2[i].originUrl !== imgUrls[i]) {
                                if (renderImgs2[i].isBridge) {
                                    URL.revokeObjectURL(renderImgs2[i].renderUrl);
                                }
                                renderImgs2 = [];
                            }
                            renderUrl = void 0;
                            isWechatUrl = this.isWechatUrlFn(imgUrls[i]);
                            if (!isWechatUrl) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.features.extraFile.getBridgeUrl(imgUrls[i])];
                        case 5:
                            renderUrl = _b.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            renderUrl = imgUrls[i];
                            _b.label = 7;
                        case 7:
                            renderImgs2.push({
                                renderUrl: renderUrl,
                                originUrl: imgUrls[i],
                                id: i,
                                isBridge: isWechatUrl
                            });
                            _b.label = 8;
                        case 8:
                            i++;
                            return [3 /*break*/, 4];
                        case 9:
                            this.setState({
                                renderImgs: renderImgs2,
                                originImgLoading: false,
                            });
                            _b.label = 10;
                        case 10: return [3 /*break*/, 11];
                        case 11: return [2 /*return*/];
                    }
                });
            });
        },
        closeModal: function () {
            this.setState({
                isModalOpen: false,
            });
        },
        closeModal1: function () {
            this.setState({
                isModalOpen1: false,
            });
        },
        createExtraFileData: function (params) {
            var methodsType = this.state.methodsType;
            var _a = this.props, tag1 = _a.tag1, tag2 = _a.tag2, entity = _a.entity, entityId = _a.entityId;
            var extension = '';
            var filename = '';
            var createData = {
                extra1: params,
                entity: entity,
                entityId: entityId,
                type: 'image',
                tag1: tag1,
                tag2: tag2,
                objectId: (0, uuid_1.generateNewId)(),
                bucket: '',
                id: (0, uuid_1.generateNewId)(),
            };
            (0, assert_1.default)(entity, '必须传入entity');
            switch (methodsType) {
                case 'uploadLocalImg':
                    var _b = params, name_1 = _b.name, size = _b.size, type = _b.type;
                    extension = name_1.substring(name_1.lastIndexOf('.') + 1);
                    filename = name_1.substring(0, name_1.lastIndexOf('.'));
                    Object.assign(createData, {
                        origin: 'qiniu',
                        extension: extension,
                        filename: filename,
                        size: size,
                        fileType: type,
                    });
                    break;
                case 'url':
                    Object.assign(createData, {
                        origin: 'unknown',
                        extension: extension,
                        filename: filename,
                        isBridge: this.isWechatUrlFn(params)
                    });
                    break;
                case 'original':
                    Object.assign(createData, {
                        origin: 'unknown',
                        extension: extension,
                        filename: filename,
                        isBridge: this.isWechatUrlFn(params)
                    });
                    break;
            }
            return createData;
        },
        myAddItem: function (createData) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var methodsType;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    methodsType = this.state.methodsType;
                    this.addItem(createData, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var bucket;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (createData.bucket) {
                                        // 说明本函数已经执行过了
                                        return [2 /*return*/];
                                    }
                                    if (!(methodsType === 'uploadLocalImg')) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.features.extraFile.upload(createData)];
                                case 1:
                                    bucket = (_a.sent()).bucket;
                                    Object.assign(createData, {
                                        bucket: bucket,
                                        extra1: null,
                                    });
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            });
        },
        myUpdateItem: function (params) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var file, createData;
                return tslib_1.__generator(this, function (_a) {
                    file = this.state.file;
                    if (file) {
                        this.removeItem(file.id);
                    }
                    if (!!params) {
                        createData = this.createExtraFileData(params);
                        this.myAddItem(createData);
                    }
                    if (!params) {
                        this.setState({
                            renderImgUrl: '',
                        });
                    }
                    return [2 /*return*/];
                });
            });
        },
        onModalConfirm: function (value) {
            var reg = new RegExp(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/);
            if (!reg.test(value)) {
                return;
            }
            this.myUpdateItem(value);
            this.setSelectedId(-1);
        },
        onModal1Confirm: function (value) {
            var renderImgs = this.state.renderImgs;
            var img = renderImgs.find(function (ele) { return ele.id === value; });
            this.myUpdateItem(img === null || img === void 0 ? void 0 : img.originUrl);
            this.closeModal1();
        },
        isWechatUrlFn: function (url) {
            return (url.startsWith('https://mmbiz.qpic.cn') || url.startsWith('http://mmbiz.qpic.cn'));
        },
        setSelectedId: function (id) {
            this.setState({
                selectedId: id
            });
        }
    }
});
