"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = tslib_1.__importDefault(require("assert"));
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
    },
    formData: function (_a) {
        var extraFiles = _a.data, features = _a.features;
        var avatar = extraFiles === null || extraFiles === void 0 ? void 0 : extraFiles.filter(function (ele) { return !ele.$$deleteAt$$ && ele.tag1 === 'avatar'; })[0];
        var avatarUrl = features.extraFile.getUrl(avatar);
        return {
            avatar: avatar,
            avatarUrl: avatarUrl,
        };
    },
    data: {
        origin: 'qiniu',
        type: 'image',
        tag1: 'avatar',
    },
    wechatMp: {
        externalClasses: ['oak-class'],
    },
    properties: {
        // 图片是否可预览
        preview: {
            type: Boolean,
            value: true,
        },
        entity: String,
        entityId: String,
    },
    methods: {
        onPickByMp: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, errMsg, tempFiles, err_1;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, , 6]);
                            return [4 /*yield*/, wx.chooseMedia({
                                    count: 1,
                                    mediaType: ['image'],
                                    sourceType: ['album', 'camera'],
                                })];
                        case 1:
                            _a = _b.sent(), errMsg = _a.errMsg, tempFiles = _a.tempFiles;
                            if (!(errMsg !== 'chooseMedia:ok')) return [3 /*break*/, 2];
                            this.setMessage({
                                type: 'warning',
                                content: errMsg,
                            });
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, Promise.all(tempFiles.map(function (tempExtraFile) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            err_1 = _b.sent();
                            console.error(err_1);
                            if (err_1.errMsg !== 'chooseMedia:fail cancel') {
                                this.setMessage({
                                    type: 'error',
                                    content: err_1.errMsg,
                                });
                            }
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        },
        onPickByWeb: function (uploadFiles) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.all(uploadFiles.map(function (uploadFile) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var name, fileType, size, originFileObj;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            name = uploadFile.name, fileType = uploadFile.type, size = uploadFile.size, originFileObj = uploadFile.originFileObj;
                                            return [4 /*yield*/, this.pushExtraFile({
                                                    name: name,
                                                    fileType: fileType,
                                                    size: size,
                                                    extra1: originFileObj,
                                                })];
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
        pushExtraFile: function (options) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, origin, type, tag1, avatar, _b, entityId, entity, name, extra1, fileType, size, extension, filename, updateData, bucket, error_1;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.state, origin = _a.origin, type = _a.type, tag1 = _a.tag1, avatar = _a.avatar;
                            _b = this.props, entityId = _b.entityId, entity = _b.entity;
                            name = options.name, extra1 = options.extra1, fileType = options.fileType, size = options.size;
                            extension = name.substring(name.lastIndexOf('.') + 1);
                            filename = name.substring(0, name.lastIndexOf('.'));
                            (0, assert_1.default)(entity, '必须传入entity');
                            updateData = {
                                extra1: extra1,
                                origin: origin,
                                type: type,
                                tag1: tag1,
                                objectId: (0, uuid_1.generateNewId)(),
                                entity: entity,
                                filename: filename,
                                size: size,
                                extension: extension,
                                fileType: fileType,
                                id: (0, uuid_1.generateNewId)(),
                                entityId: entityId,
                            };
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.features.extraFile.upload(updateData)];
                        case 2:
                            bucket = (_c.sent()).bucket;
                            Object.assign(updateData, {
                                bucket: bucket,
                                extra1: null,
                            });
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _c.sent();
                            //todo 保存extraFile失败 需要remove七牛图片
                            throw error_1;
                        case 4:
                            this.addItem(updateData);
                            if (avatar) {
                                this.removeItem(avatar.id);
                            }
                            if (!entityId) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.execute()];
                        case 5:
                            _c.sent();
                            _c.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        },
    },
});
