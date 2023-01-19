"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var types_1 = require("oak-domain/lib/types");
exports.default = OakComponent({
    isList: true,
    properties: {
        html: {
            type: String,
            value: '',
        },
        delta: {
            type: String,
            value: '',
        },
        readOnly: {
            type: Boolean,
            value: false,
        },
        showImgSize: {
            type: Boolean,
            value: false,
        },
        showImgResize: {
            type: Boolean,
            value: false,
        },
        editorStyle: {
            type: String,
            value: '',
        },
        placeholder: {
            type: String,
            value: '请输入',
        },
        showTabBar: {
            type: Boolean,
            value: true,
        },
    },
    methods: {
        onEditReady: function (e) {
            var _this = this;
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                var _a = this.props, html_1 = _a.html, delta_1 = _a.delta;
                this.createSelectorQuery().select('#editor').context(function (res) {
                    _this.editorCtx = res.context;
                    _this.editorCtx.setContents({
                        html: html_1,
                        delta: delta_1,
                    });
                }).exec();
                this.triggerEvent('ready', e);
            }
        },
        onEditFocus: function (e) {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                this.triggerEvent('focus', e);
            }
        },
        onEditBlur: function (e) {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                this.triggerEvent('blur', e);
            }
        },
        onEditStatuschange: function (e) {
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                this.triggerEvent('statuschange', e);
            }
        },
        addExtraFile: function (extraFile) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var result, error_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.features.cache.operate('extraFile', {
                                    action: 'create',
                                    data: extraFile,
                                    id: (0, uuid_1.generateNewId)(),
                                })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            error_1 = _a.sent();
                            if (error_1.constructor.name ===
                                types_1.OakUnloggedInException.name) {
                                this.navigateTo({
                                    url: '/login',
                                });
                                return [2 /*return*/];
                            }
                            throw error_1;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        onPickByMp: function (event) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var mediaType, _a, errMsg, tempFiles, _b, fileType, size, tempFilePath, extension, filename, extraFile, _c, url, bucket, err_1;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!(process.env.OAK_PLATFORM === 'wechatMp')) return [3 /*break*/, 8];
                            mediaType = event.currentTarget.dataset.mediaType;
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 7, , 8]);
                            return [4 /*yield*/, wx.chooseMedia({
                                    count: 1,
                                    mediaType: [mediaType],
                                    sourceType: ['album', 'camera'],
                                    camera: 'back',
                                })];
                        case 2:
                            _a = _d.sent(), errMsg = _a.errMsg, tempFiles = _a.tempFiles;
                            if (!(errMsg !== 'chooseMedia:ok')) return [3 /*break*/, 3];
                            this.triggerEvent('error', {
                                level: 'warning',
                                msg: errMsg,
                            });
                            return [3 /*break*/, 6];
                        case 3:
                            _b = tempFiles[0], fileType = _b.fileType, size = _b.size, tempFilePath = _b.tempFilePath;
                            extension = tempFilePath.substring(tempFilePath.lastIndexOf('.') + 1);
                            filename = tempFilePath.substring(0, tempFilePath.lastIndexOf('.'));
                            extraFile = {
                                extra1: tempFilePath,
                                origin: 'qiniu',
                                type: 'image',
                                tag1: 'editorImg',
                                objectId: (0, uuid_1.generateNewId)(),
                                filename: filename,
                                size: size,
                                fileType: fileType,
                                extension: extension,
                                bucket: '',
                                id: (0, uuid_1.generateNewId)(),
                            };
                            return [4 /*yield*/, this.features.extraFile.upload(extraFile)];
                        case 4:
                            _c = _d.sent(), url = _c.url, bucket = _c.bucket;
                            extraFile.bucket = bucket;
                            extraFile.extra1 = null;
                            return [4 /*yield*/, this.addExtraFile(extraFile)];
                        case 5:
                            _d.sent();
                            this.editorCtx.insertImage({
                                src: 'http://' + url,
                            });
                            _d.label = 6;
                        case 6: return [3 /*break*/, 8];
                        case 7:
                            err_1 = _d.sent();
                            console.error(err_1);
                            if (err_1.errMsg !== 'chooseMedia:fail cancel') {
                                this.triggerEvent('error', {
                                    level: 'error',
                                    msg: err_1.errMsg,
                                });
                            }
                            return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        },
        onInput: function (e) {
            var html = e.detail.html;
            var text = e.detail.text;
            this.triggerEvent("input", { html: html, text: text }, {});
        },
        addUnderline: function () {
            this.editorCtx.format("underline");
        },
        addItalic: function () {
            this.editorCtx.format("italic");
        },
        addBold: function () {
            this.editorCtx.format("bold");
        },
        addHeader: function (e) {
            var headerType = e.currentTarget.dataset.header;
            this.editorCtx.format("header", headerType);
        },
        addAlign: function (e) {
            var alignType = e.currentTarget.dataset.align;
            this.editorCtx.format("align", alignType);
        },
        addList: function (e) {
            var listType = e.currentTarget.dataset.list;
            this.editorCtx.format("list", listType);
        },
        undo: function () {
            this.editorCtx.undo();
        },
    },
});
