"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = require("oak-domain/lib/utils/assert");
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
    lifetimes: {},
    listeners: {
        imgUrls: function (prev, next) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    // 所以此处增加前后项imgUrls里都有值且不等的条件再去clean
                    if ((prev === null || prev === void 0 ? void 0 : prev.imgUrls.length) && (next === null || next === void 0 ? void 0 : next.imgUrls.length) && !(0, lodash_1.isEqual)(prev.imgUrls, next.imgUrls)) {
                        this.clean();
                    }
                    return [2 /*return*/];
                });
            });
        }
    },
    methods: {
        chooseMethod: function (method) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var fileInput_1, imgElement, imgUrls, renderImgs, renderImgs2, i, renderUrl, isWechatUrl;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (method) {
                        case 'uploadLocalImg':
                            fileInput_1 = document.createElement('input');
                            imgElement = document.getElementById('previewImg');
                            fileInput_1.type = 'file';
                            fileInput_1.accept = 'image/png, image/jpeg';
                            fileInput_1.style.display = 'none';
                            fileInput_1.addEventListener('change', function (e) {
                                if (!fileInput_1.files || fileInput_1.files.length === 0) {
                                    return;
                                }
                                _this.myUpdateItem(fileInput_1.files[0]);
                            });
                            fileInput_1.click();
                            this.setState({
                                methodsType: method
                            });
                            this.setSelectedId(-1);
                            break;
                        case 'url':
                            this.setState({
                                isModalOpen: true,
                                methodsType: method
                            });
                            break;
                        case 'original':
                            this.setState({
                                isModalOpen1: true,
                                methodsType: method
                            });
                            imgUrls = this.props.imgUrls;
                            renderImgs = this.state.renderImgs;
                            renderImgs2 = new (Array.bind.apply(Array, tslib_1.__spreadArray([void 0], tslib_1.__read(renderImgs), false)))();
                            if (imgUrls && imgUrls.length) {
                                for (i = 0; i < imgUrls.length; i++) {
                                    if (renderImgs2[i] && renderImgs2[i].originUrl === imgUrls[i]) {
                                        return [2 /*return*/];
                                    }
                                    else if (renderImgs2[i] && renderImgs2[i].originUrl !== imgUrls[i]) {
                                        renderImgs2 = [];
                                    }
                                    renderUrl = void 0;
                                    isWechatUrl = this.isWechatUrlFn(imgUrls[i]);
                                    if (isWechatUrl) {
                                        renderUrl = this.features.extraFile.getUrl({ isBridge: true, extra1: imgUrls[i] });
                                    }
                                    else {
                                        renderUrl = imgUrls[i];
                                    }
                                    renderImgs2.push({
                                        renderUrl: renderUrl,
                                        originUrl: imgUrls[i],
                                        id: i,
                                        isBridge: isWechatUrl
                                    });
                                }
                                this.setState({
                                    renderImgs: renderImgs2,
                                });
                            }
                            break;
                    }
                    return [2 /*return*/];
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
            (0, assert_1.assert)(entity, '必须传入entity');
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
                    this.addItem(Object.assign(createData, {
                        extra1: null,
                    }), function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            if (createData.bucket) {
                                // 说明本函数已经执行过了
                                return [2 /*return*/];
                            }
                            return [2 /*return*/];
                        });
                    }); }, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.features.extraFile.upload(createData, createData.extra1)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
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
