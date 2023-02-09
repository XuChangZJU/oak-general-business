"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = tslib_1.__importDefault(require("assert"));
var index_1 = tslib_1.__importDefault(require("../../../utils/dialog/index"));
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
    },
    formData: function (_a) {
        var _this = this;
        var originalFiles = _a.data, features = _a.features;
        var files = originalFiles === null || originalFiles === void 0 ? void 0 : originalFiles.filter(function (ele) { return !ele.$$deleteAt$$; });
        if (this.props.tag1) {
            files = files === null || files === void 0 ? void 0 : files.filter(function (ele) { return (ele === null || ele === void 0 ? void 0 : ele.tag1) === _this.props.tag1; });
        }
        if (this.props.tag2) {
            files = files === null || files === void 0 ? void 0 : files.filter(function (ele) { return (ele === null || ele === void 0 ? void 0 : ele.tag2) === _this.props.tag2; });
        }
        return {
            files: files,
            disableInsert: this.props.maxNumber === 0 ||
                (files === null || files === void 0 ? void 0 : files.length) >= this.props.maxNumber,
        };
    },
    data: {
        // 根据 size 不同，计算的图片显示大小不同
        itemSizePercentage: '',
    },
    wechatMp: {
        externalClasses: ['oak-class', 'oak-item-class'],
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
    properties: {
        removeLater: Boolean,
        autoUpload: {
            type: Boolean,
            value: false,
        },
        maxNumber: {
            type: Number,
            value: 20,
        },
        extension: {
            //小程序独有 chooseMessageFile 根据文件拓展名过滤，仅 type==file 时有效。每一项都不能是空字符串。默认不过滤。
            type: Array,
        },
        fileType: {
            //小程序独有 chooseMessageFile 文件type
            type: String,
            value: 'all',
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
        // 图片显示模式
        mode: {
            //小程序独有
            type: String,
            value: 'aspectFit',
        },
        // 每行可显示的个数
        size: {
            // 小程序独有
            type: Number,
            value: 3,
        },
        showUploadList: {
            // web独有 是否展示文件列表, 可设为一个对象
            type: Boolean,
            value: true,
        },
        accept: {
            // web独有 文件上传类型
            type: String,
            value: 'image/*',
        },
        // 图片是否可预览
        preview: {
            type: Boolean,
            value: true,
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
        theme: {
            type: String,
            value: 'image',
        },
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
        chooseMediaByMp: function () {
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
                                    switch (_a.label) {
                                        case 0:
                                            tempFilePath = tempExtraFile.tempFilePath, thumbTempFilePath = tempExtraFile.thumbTempFilePath, fileType = tempExtraFile.fileType, size = tempExtraFile.size;
                                            filePath = tempFilePath || thumbTempFilePath;
                                            fileFullName = filePath.match(/[^/]+(?!.*\/)/g)[0];
                                            return [4 /*yield*/, this.pushExtraFile({
                                                    name: fileFullName,
                                                    fileType: fileType,
                                                    size: size,
                                                    extra1: filePath,
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
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
        chooseFileByMp: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, selectCount, extension, fileType, _b, errMsg, tempFiles, err_2;
                var _this = this;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.props, selectCount = _a.selectCount, extension = _a.extension, fileType = _a.fileType;
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 6, , 7]);
                            return [4 /*yield*/, wx.chooseMessageFile(tslib_1.__assign({ count: selectCount, type: 'all' }, (fileType === 'file' ? { extension: extension } : {})))];
                        case 2:
                            _b = _c.sent(), errMsg = _b.errMsg, tempFiles = _b.tempFiles;
                            if (!(errMsg !== 'chooseMessageFile:ok')) return [3 /*break*/, 3];
                            this.triggerEvent('error', {
                                level: 'warning',
                                msg: errMsg,
                            });
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, Promise.all(tempFiles.map(function (tempExtraFile) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var path, type, size, name;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            path = tempExtraFile.path, type = tempExtraFile.type, size = tempExtraFile.size, name = tempExtraFile.name;
                                            // const fileType = name.substring(
                                            //     name.lastIndexOf('.') + 1
                                            // );
                                            return [4 /*yield*/, this.pushExtraFile({
                                                    name: name,
                                                    fileType: type,
                                                    size: size,
                                                    extra1: path,
                                                })];
                                        case 1:
                                            // const fileType = name.substring(
                                            //     name.lastIndexOf('.') + 1
                                            // );
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                        case 4:
                            _c.sent();
                            _c.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            err_2 = _c.sent();
                            console.error(err_2);
                            if (err_2.errMsg !== 'chooseMessageFile:fail cancel') {
                                this.triggerEvent('error', {
                                    level: 'error',
                                    msg: err_2.errMsg,
                                });
                            }
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        },
        onPickByMp: function () {
            var theme = this.props.theme;
            if (['image', 'image-flow'].includes(theme)) {
                this.chooseMediaByMp();
            }
            else {
                this.chooseFileByMp();
            }
        },
        onPickByWeb: function (uploadFiles, callback) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(uploadFiles.map(function (uploadFile) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var name, type, size, originFileObj;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            name = uploadFile.name, type = uploadFile.type, size = uploadFile.size, originFileObj = uploadFile.originFileObj;
                                            return [4 /*yield*/, this.pushExtraFile({
                                                    name: name,
                                                    fileType: type,
                                                    size: size,
                                                    extra1: originFileObj,
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
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.props, type = _a.type, origin = _a.origin, tag1 = _a.tag1, tag2 = _a.tag2, entity = _a.entity, entityId = _a.entityId, autoUpload = _a.autoUpload;
                            name = options.name, extra1 = options.extra1, fileType = options.fileType, size = options.size;
                            extension = name.substring(name.lastIndexOf('.') + 1);
                            filename = name.substring(0, name.lastIndexOf('.'));
                            (0, assert_1.default)(entity, '必须传入entity');
                            (0, assert_1.default)(origin === 'qiniu', '目前只支持七牛上传'); // 目前只支持七牛上传
                            updateData = {
                                extra1: extra1,
                                origin: origin,
                                type: type || 'file',
                                tag1: tag1,
                                tag2: tag2,
                                objectId: (0, uuid_1.generateNewId)(),
                                entity: entity,
                                filename: filename,
                                size: size,
                                extension: extension,
                                fileType: fileType,
                                id: (0, uuid_1.generateNewId)(),
                                entityId: entityId,
                            };
                            if (!autoUpload) return [3 /*break*/, 6];
                            if (callback) {
                                callback(updateData, 'uploading');
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.features.extraFile.upload(updateData)];
                        case 2:
                            bucket = (_b.sent()).bucket;
                            Object.assign(updateData, {
                                bucket: bucket,
                                extra1: null,
                            });
                            if (callback) {
                                callback(updateData, 'success');
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _b.sent();
                            if (callback) {
                                callback(updateData, 'failed');
                            }
                            //todo 保存extraFile失败 需要remove七牛图片
                            throw error_1;
                        case 4:
                            this.addItem(updateData);
                            return [4 /*yield*/, this.execute()];
                        case 5:
                            _b.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            this.addItem(updateData, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                            }); });
                            _b.label = 7;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        },
        onItemTapped: function (event) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var files, index, imageUrl, urls, detail, result;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            files = this.state.files;
                            index = event.currentTarget.dataset.index;
                            imageUrl = this.features.extraFile.getUrl(files[index]);
                            urls = files === null || files === void 0 ? void 0 : files.filter(function (ele) { return !!ele; }).map(function (ele) {
                                return _this.features.extraFile.getUrl(ele);
                            });
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
                            result = _a.sent();
                            this.triggerEvent('preview', detail);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        },
        onDeleteByMp: function (event) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value, id, bucket, origin, result, confirm_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            value = event.currentTarget.dataset.value;
                            id = value.id, bucket = value.bucket, origin = value.origin;
                            if (!(this.props.removeLater || (origin !== 'unknown' && !bucket))) return [3 /*break*/, 1];
                            this.removeItem(id);
                            return [3 /*break*/, 4];
                        case 1: return [4 /*yield*/, wx.showModal({
                                title: '确认删除吗',
                                content: '删除现有文件',
                            })];
                        case 2:
                            result = _a.sent();
                            confirm_1 = result.confirm;
                            if (!confirm_1) return [3 /*break*/, 4];
                            this.removeItem(id);
                            return [4 /*yield*/, this.execute()];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        onDeleteByWeb: function (value) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var id, bucket, origin, confirm_2;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    id = value.id, bucket = value.bucket, origin = value.origin;
                    // 如果 removeLater为true 或 origin === 'qiniu' 且 bucket不存在
                    if (this.props.removeLater || (origin !== 'unknown' && !bucket)) {
                        this.removeItem(id);
                    }
                    else {
                        confirm_2 = index_1.default.confirm({
                            title: '确认删除当前文件？',
                            content: '删除后，文件不可恢复',
                            cancelText: '取消',
                            okText: '确定',
                            onOk: function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.removeItem(id);
                                            return [4 /*yield*/, this.execute()];
                                        case 1:
                                            _a.sent();
                                            confirm_2.destroy();
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                            onCancel: function (e) {
                                confirm_2.destroy();
                            },
                        });
                    }
                    return [2 /*return*/];
                });
            });
        },
        onDownloadByMp: function (event) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value, fileUrl, name;
                return tslib_1.__generator(this, function (_a) {
                    value = event.currentTarget.dataset.value;
                    fileUrl = this.features.extraFile.getUrl(value);
                    name = value.filename + '.' + value.extension;
                    wx.showLoading({
                        title: '下载请求中，请耐心等待..',
                    });
                    wx.downloadFile({
                        url: fileUrl,
                        success: function (res) {
                            var filePath = res.tempFilePath || res.filePath;
                            wx.hideLoading();
                            var fs = wx.getFileSystemManager();
                            var writeFilePath = "".concat(wx.env.USER_DATA_PATH, "/").concat(name);
                            var res2 = fs.saveFileSync(filePath, writeFilePath);
                        },
                        fail: function (res) {
                            console.log(res);
                        },
                        complete: function (res) { },
                    });
                    return [2 /*return*/];
                });
            });
        },
        onOpenByMp: function (event) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value, fileUrl, extension, extensions;
                return tslib_1.__generator(this, function (_a) {
                    value = event.currentTarget.dataset.value;
                    fileUrl = this.features.extraFile.getUrl(value);
                    extension = value.extension.toLowerCase();
                    extensions = [
                        'doc',
                        'docx',
                        'xls',
                        'xlsx',
                        'ppt',
                        'pptx',
                        'pdf',
                    ];
                    if (!extensions.includes(extension)) {
                        this.setMessage({
                            type: 'error',
                            content: "\u76EE\u524D\u4EC5\u652F\u6301\u6253\u5F00".concat(extensions.join(','), "\u7C7B\u578B\u7684\u6587\u4EF6"),
                        });
                        return [2 /*return*/];
                    }
                    wx.showLoading({
                        title: '下载请求中，请耐心等待..',
                    });
                    wx.downloadFile({
                        url: fileUrl,
                        success: function (res) {
                            var filePath = res.tempFilePath || res.filePath;
                            wx.hideLoading();
                            wx.openDocument({
                                //打开文件
                                filePath: filePath,
                                fileType: extension,
                                showMenu: true,
                                success: function () {
                                    console.log("\u6253\u5F00\u6587\u4EF6\u6210\u529F");
                                },
                                fail: function (err) {
                                    console.log(err);
                                },
                            });
                        },
                        fail: function (res) {
                            console.log(res);
                        },
                        complete: function (res) { },
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
