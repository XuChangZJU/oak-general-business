"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
var index_1 = tslib_1.__importDefault(require("../../../utils/dialog/index"));
var extraFile_1 = require("../../../utils/extraFile");
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
    },
    formData: function (_a) {
        var _b, _c;
        var originalFiles = _a.data, features = _a.features;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var application, number2, files;
            var _this = this;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, features.application.getApplication()];
                    case 1:
                        application = _d.sent();
                        number2 = this.props.maxNumber;
                        files = originalFiles;
                        if (this.props.tag1) {
                            files = files === null || files === void 0 ? void 0 : files.filter(function (ele) { return (ele === null || ele === void 0 ? void 0 : ele.tag1) === _this.props.tag1; });
                        }
                        if (this.props.tag2) {
                            files = files === null || files === void 0 ? void 0 : files.filter(function (ele) { return (ele === null || ele === void 0 ? void 0 : ele.tag2) === _this.props.tag2; });
                        }
                        if (typeof number2 === 'number' &&
                            (number2 === 0 || (files === null || files === void 0 ? void 0 : files.length) >= number2)) {
                            return [2 /*return*/, {
                                    files: files,
                                    disableInsert: true,
                                    systemConfig: (_b = application === null || application === void 0 ? void 0 : application.system) === null || _b === void 0 ? void 0 : _b.config,
                                    originalFiles: originalFiles,
                                }];
                        }
                        return [2 /*return*/, {
                                files: files,
                                disableInsert: false,
                                systemConfig: (_c = application === null || application === void 0 ? void 0 : application.system) === null || _c === void 0 ? void 0 : _c.config,
                                originalFiles: originalFiles,
                            }];
                }
            });
        });
    },
    data: {
        selected: -1,
        // 根据 size 不同，计算的图片显示大小不同
        itemSizePercentage: '',
        newUploadFiles: [],
    },
    wechatMp: {
        externalClasses: ['l-class', 'l-item-class'],
    },
    properties: {
        oakFullpath: String,
        oakParent: String,
        oakPath: String,
        autoUpload: {
            type: Boolean,
            value: false,
        },
        maxNumber: {
            type: Number,
            value: 20,
        },
        selectCount: {
            //小程序独有 文件一次选择几个
            type: Number,
            value: 1,
        },
        sourceType: {
            type: Array,
            value: ['album', 'camera'],
        },
        mediaType: {
            //小程序独有 文件上传类型
            type: Array,
            value: ['image'],
        },
        accept: {
            // web独有 文件上传类型
            type: String,
            value: 'image/*',
        },
        // 图片显示模式
        mode: {
            type: String,
            value: 'aspectFit',
        },
        // 图片是否可预览
        preview: {
            type: Boolean,
            value: true,
        },
        // 每行可显示的个数
        size: {
            type: Number,
            value: 3,
        },
        // 图片是否可删除
        disableDelete: {
            type: Boolean,
            value: false,
        },
        type: String,
        origin: String,
        tag1: String,
        tag2: String,
        entity: String,
        entityId: String,
    },
    methods: {
        /**
         * 获取组件内部节点位置信息（单个）
         * @param component 组件实例
         * @param selector {String} css选择器
         * @returns boundingClientRect() 回调函数的值
         */
        getNodeRectFromComponent: function (component, selector) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve) {
                                component
                                    .createSelectorQuery()
                                    .select(selector)
                                    .boundingClientRect(function (res) {
                                    resolve(res);
                                })
                                    .exec();
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        /**
        //  * px 转 rpx
        //  * @param px 像素值
        //  */
        px2rpx: function (px) {
            var windowWidth = wx.getSystemInfoSync().windowWidth;
            return (750 / windowWidth) * px;
        },
        onPick: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, selectCount, mediaType, sourceType, _b, errMsg, tempFiles, err_1;
                var _this = this;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.props, selectCount = _a.selectCount, mediaType = _a.mediaType, sourceType = _a.sourceType;
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 6, , 7]);
                            return [4 /*yield*/, wx.chooseMedia({
                                    count: selectCount,
                                    mediaType: mediaType,
                                    sourceType: sourceType,
                                })];
                        case 2:
                            _b = _c.sent(), errMsg = _b.errMsg, tempFiles = _b.tempFiles;
                            if (!(errMsg !== 'chooseMedia:ok')) return [3 /*break*/, 3];
                            this.triggerEvent('error', {
                                level: 'warning',
                                msg: errMsg,
                            });
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, Promise.all(tempFiles.map(function (tempExtraFile) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var tempFilePath, thumbTempFilePath, fileType, size, filePath, fileFullName;
                                return tslib_1.__generator(this, function (_a) {
                                    tempFilePath = tempExtraFile.tempFilePath, thumbTempFilePath = tempExtraFile.thumbTempFilePath, fileType = tempExtraFile.fileType, size = tempExtraFile.size;
                                    filePath = tempFilePath || thumbTempFilePath;
                                    fileFullName = filePath.match(/[^/]+(?!.*\/)/g)[0];
                                    this.pushExtraFile({
                                        name: fileFullName,
                                        fileType: fileType,
                                        size: size,
                                        extra1: filePath,
                                    });
                                    return [2 /*return*/];
                                });
                            }); }))];
                        case 4:
                            _c.sent();
                            _c.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            err_1 = _c.sent();
                            console.error(err_1);
                            if (err_1.errMsg !== 'chooseMedia:fail cancel') {
                                this.triggerEvent('error', {
                                    level: 'error',
                                    msg: err_1.errMsg,
                                });
                            }
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        },
        onWebPick: function (uploadFiles, callback) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(uploadFiles.map(function (uploadFile) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var name, fileType, size, raw;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            name = uploadFile.name, fileType = uploadFile.type, size = uploadFile.size, raw = uploadFile.raw;
                                            return [4 /*yield*/, this.pushExtraFile({
                                                    name: name,
                                                    fileType: fileType,
                                                    size: size,
                                                    extra1: raw,
                                                }, callback)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        pushExtraFile: function (options, callback) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, type, origin, tag1, tag2, entity, entityId, autoUpload, name, extra1, fileType, size, extension, filename, updateData, bucket, error_1;
                var _b;
                var _this = this;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.props, type = _a.type, origin = _a.origin, tag1 = _a.tag1, tag2 = _a.tag2, entity = _a.entity, entityId = _a.entityId, autoUpload = _a.autoUpload;
                            name = options.name, extra1 = options.extra1, fileType = options.fileType, size = options.size;
                            extension = name.substring(name.lastIndexOf('.') + 1);
                            filename = name.substring(0, name.lastIndexOf('.'));
                            (0, assert_1.default)(entity, '必须传入entity');
                            (0, assert_1.default)(origin === 'qiniu', '目前只支持七牛上传'); // 目前只支持七牛上传
                            _b = {
                                extra1: extra1,
                                origin: origin,
                                type: type || 'file',
                                tag1: tag1,
                                tag2: tag2
                            };
                            return [4 /*yield*/, generateNewId()];
                        case 1:
                            _b.objectId = _c.sent(),
                                _b.entity = entity,
                                _b.filename = filename,
                                _b.size = size,
                                _b.extension = extension,
                                _b.fileType = fileType;
                            return [4 /*yield*/, generateNewId()];
                        case 2:
                            updateData = (_b.id = _c.sent(),
                                _b.entityId = entityId,
                                _b);
                            if (!autoUpload) return [3 /*break*/, 9];
                            if (callback) {
                                callback(updateData, 'uploading');
                            }
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.features.extraFile.upload(updateData)];
                        case 4:
                            bucket = (_c.sent()).bucket;
                            Object.assign(updateData, {
                                bucket: bucket,
                                extra1: null,
                            });
                            if (callback) {
                                callback(updateData, 'success');
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _c.sent();
                            if (callback) {
                                callback(updateData, 'failed');
                            }
                            //todo 保存extraFile失败 需要remove七牛图片
                            throw error_1;
                        case 6: return [4 /*yield*/, this.addOperation({
                                action: 'create',
                                data: updateData
                            })];
                        case 7:
                            _c.sent();
                            return [4 /*yield*/, this.execute()];
                        case 8:
                            _c.sent();
                            return [3 /*break*/, 11];
                        case 9: return [4 /*yield*/, this.addOperation({
                                action: 'create',
                                data: updateData,
                            }, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var bucket;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (updateData.bucket) {
                                                // 说明本函数已经执行过了 
                                                return [2 /*return*/];
                                            }
                                            return [4 /*yield*/, this.features.extraFile.upload(updateData)];
                                        case 1:
                                            bucket = (_a.sent()).bucket;
                                            Object.assign(updateData, {
                                                bucket: bucket,
                                                extra1: null,
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                        case 10:
                            _c.sent();
                            _c.label = 11;
                        case 11: return [2 /*return*/];
                    }
                });
            });
        },
        onItemTapped: function (event) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, files, systemConfig, index, imageUrl, urls, detail, result;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.state, files = _a.files, systemConfig = _a.systemConfig;
                            index = event.currentTarget.dataset.index;
                            imageUrl = (0, extraFile_1.composeFileUrl)(files[index], systemConfig);
                            urls = files === null || files === void 0 ? void 0 : files.filter(function (ele) { return !!ele; }).map(function (ele) { return (0, extraFile_1.composeFileUrl)(ele, systemConfig); });
                            detail = {
                                all: files,
                                index: index,
                                urls: urls,
                                current: imageUrl,
                            };
                            this.triggerEvent('tap', detail);
                            if (!this.props.preview) return [3 /*break*/, 2];
                            return [4 /*yield*/, wx.previewImage({
                                    urls: urls,
                                    current: imageUrl,
                                })];
                        case 1:
                            result = _b.sent();
                            this.triggerEvent('preview', detail);
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        },
        onDelete: function (event) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value, id, bucket, result, confirm_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            value = event.currentTarget.dataset.value;
                            id = value.id, bucket = value.bucket;
                            if (!!bucket) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.addOperation({
                                    action: 'remove',
                                    data: {},
                                    filter: {
                                        id: id,
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 2: return [4 /*yield*/, wx.showModal({
                                title: '确认删除吗',
                                content: '删除现有文件',
                            })];
                        case 3:
                            result = _a.sent();
                            confirm_1 = result.confirm;
                            if (!confirm_1) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.addOperation({
                                    action: 'remove',
                                    data: {},
                                    filter: {
                                        id: id,
                                    }
                                })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.execute()];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        },
        onWebDelete: function (value) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var originalFiles, id, bucket, findIndex, confirm_2;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            originalFiles = this.state.originalFiles;
                            id = value.id, bucket = value.bucket;
                            findIndex = originalFiles === null || originalFiles === void 0 ? void 0 : originalFiles.findIndex(function (ele) { return (ele === null || ele === void 0 ? void 0 : ele.id) === id; });
                            if (!!bucket) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.addOperation({
                                    action: 'remove',
                                    data: {},
                                    filter: {
                                        id: id,
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            confirm_2 = index_1.default.confirm({
                                header: '确认删除当前文件？',
                                body: '删除后，文件不可恢复',
                                title: '确认删除当前文件？',
                                content: '删除后，文件不可恢复',
                                cancelBtn: '取消',
                                confirmBtn: '确定',
                                onConfirm: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.addOperation({
                                                    action: 'remove',
                                                    data: {},
                                                    filter: {
                                                        id: id,
                                                    }
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, this.execute()];
                                            case 2:
                                                _a.sent();
                                                confirm_2.hide();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); },
                                onCancel: function () {
                                    confirm_2.hide();
                                },
                                onClose: function () {
                                    confirm_2.hide();
                                },
                            });
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        setNewUploadFiles: function (file, status) {
            var filename = file.filename, size = file.size, id = file.id;
            var newUploadFiles = this.state.newUploadFiles;
            var file2 = newUploadFiles.find(function (ele) { return (ele.filename = filename && ele.size === size); });
            Object.assign(file2, {
                status: status,
                id: id,
            });
            this.setState({
                newUploadFiles: newUploadFiles,
            });
        },
        customDelete: function (index) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var newUploadFiles, arr;
                return tslib_1.__generator(this, function (_a) {
                    newUploadFiles = this.state.newUploadFiles;
                    arr = tslib_1.__spreadArray([], tslib_1.__read(newUploadFiles), false);
                    arr.splice(index, 1);
                    this.setState({
                        newUploadFiles: arr,
                    });
                    return [2 /*return*/];
                });
            });
        },
    },
    observers: {
        maxNumber: function () {
            this.reRender();
        },
        /**
         * size 属性变化时，重新调整图片大小
         * @param size 新值
         */
        size: function (size) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var res, widthRpx, itemSizePercentage;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!size) {
                                this.setState({ itemSizePercentage: '' });
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.getNodeRectFromComponent(this, '.file-list__container')];
                        case 1:
                            res = _a.sent();
                            widthRpx = this.px2rpx(res.right - res.left);
                            itemSizePercentage = (10 / size) * 10 - (20 / widthRpx) * 100 + '%;';
                            this.setState({ itemSizePercentage: itemSizePercentage });
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
