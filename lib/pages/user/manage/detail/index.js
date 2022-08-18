"use strict";
// index.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var extraFile_1 = require("../../../../utils/extraFile");
exports.default = OakPage({
    path: 'user:manage:detail',
    entity: 'user',
    projection: {
        id: 1,
        nickname: 1,
        name: 1,
        userState: 1,
        idState: 1,
        extraFile$entity: {
            $entity: 'extraFile',
            data: {
                id: 1,
                tag1: 1,
                origin: 1,
                bucket: 1,
                objectId: 1,
                filename: 1,
                extra1: 1,
                type: 1,
                entity: 1,
                extension: 1,
            },
            filter: {
                tag1: 'avatar',
            },
            indexFrom: 0,
            count: 1,
        },
        mobile$user: {
            $entity: 'mobile',
            data: {
                id: 1,
                mobile: 1,
            },
        },
    },
    isList: false,
    formData: function (_a) {
        var user = _a.data;
        return __awaiter(void 0, void 0, void 0, function () {
            var _b, id, nickname, idState, userState, name, mobile$user, extraFile$entity, mobile, avatar;
            var _c;
            return __generator(this, function (_d) {
                _b = user || {}, id = _b.id, nickname = _b.nickname, idState = _b.idState, userState = _b.userState, name = _b.name, mobile$user = _b.mobile$user, extraFile$entity = _b.extraFile$entity;
                mobile = mobile$user && ((_c = mobile$user[0]) === null || _c === void 0 ? void 0 : _c.mobile);
                avatar = extraFile$entity &&
                    extraFile$entity[0] &&
                    (0, extraFile_1.composeFileUrl)(extraFile$entity[0]);
                return [2 /*return*/, {
                        id: id,
                        nickname: nickname,
                        name: name,
                        mobile: mobile,
                        avatar: avatar,
                        userState: userState,
                        idState: idState,
                    }];
            });
        });
    },
    actions: [
        'accept',
        'activate',
        'disable',
        'enable',
        'remove',
        'update',
        'verify',
        'play',
    ],
    data: {
        stateColor: {
            shadow: 'primary',
            normal: 'success',
            disabled: ''
        },
        idStateColor: {
            verifying: 'primary',
            verified: 'success',
            unverified: 'warning'
        },
        show: false,
        actionDescriptions: {
            accept: {
                icon: {
                    name: 'pan_tool',
                },
                label: '通过',
            },
            activate: {
                icon: {
                    name: 'check',
                },
                label: '激活',
            },
            disable: {
                icon: {
                    name: 'flash_off',
                },
                label: '禁用',
            },
            enable: {
                icon: {
                    name: 'flash_on',
                },
                label: '启用',
            },
            remove: {
                icon: {
                    name: 'clear',
                },
                label: '删除',
            },
            update: {
                icon: {
                    name: 'edit',
                },
                label: '更新',
            },
            verify: {
                icon: {
                    name: 'how_to_reg',
                },
                label: '验证',
            },
            play: {
                icon: {
                    name: 'play_circle',
                },
                label: '切换',
            },
        },
    },
    methods: {
        openDrawer: function () {
            this.setState({
                show: true,
            });
        },
        closeDrawer: function () {
            this.setState({
                show: false,
            });
        },
        onActionClick: function (_a) {
            var detail = _a.detail;
            return __awaiter(this, void 0, void 0, function () {
                var action, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            action = detail.action;
                            _b = action;
                            switch (_b) {
                                case 'update': return [3 /*break*/, 1];
                                case 'enable': return [3 /*break*/, 2];
                                case 'disable': return [3 /*break*/, 2];
                                case 'accept': return [3 /*break*/, 2];
                                case 'verify': return [3 /*break*/, 2];
                                case 'activate': return [3 /*break*/, 2];
                                case 'play': return [3 /*break*/, 2];
                            }
                            return [3 /*break*/, 4];
                        case 1:
                            {
                                this.navigateTo({
                                    url: '/user/manage/upsert',
                                    oakId: this.props.oakId,
                                });
                                return [2 /*return*/];
                            }
                            _c.label = 2;
                        case 2: return [4 /*yield*/, this.execute(action)];
                        case 3:
                            _c.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            {
                                console.error("\u5C1A\u672A\u5B9E\u73B0\u7684action: ".concat(action));
                            }
                            _c.label = 5;
                        case 5:
                            if (action === 'play') {
                                this.navigateBack({
                                    delta: 2,
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
