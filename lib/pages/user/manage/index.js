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
var extraFile_1 = require("../../../utils/extraFile");
exports.default = OakPage({
    path: 'user:manage',
    entity: 'user',
    projection: {
        id: 1,
        nickname: 1,
        name: 1,
        userState: 1,
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
    isList: true,
    formData: function (_a) {
        var users = _a.data, features = _a.features;
        return __awaiter(this, void 0, void 0, function () {
            var pagination, userArr;
            return __generator(this, function (_b) {
                pagination = this.getPagination();
                userArr = users.map(function (user) {
                    var _a;
                    var _b = user || {}, id = _b.id, nickname = _b.nickname, userState = _b.userState, name = _b.name, mobile$user = _b.mobile$user, extraFile$entity = _b.extraFile$entity;
                    var mobile = mobile$user && ((_a = mobile$user[0]) === null || _a === void 0 ? void 0 : _a.mobile);
                    var avatar = extraFile$entity &&
                        extraFile$entity[0] &&
                        (0, extraFile_1.composeFileUrl)(extraFile$entity[0]);
                    return {
                        id: id,
                        nickname: nickname,
                        name: name,
                        mobile: mobile,
                        avatar: avatar,
                        userState: userState,
                    };
                });
                return [2 /*return*/, {
                        userArr: userArr,
                        pagination: pagination,
                    }];
            });
        });
    },
    properties: {
        event: String,
    },
    data: {
        stateColor: {
            shadow: 'primary',
            normal: 'success',
            disabled: 'danger',
        },
    },
    methods: {
        bindClicked: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, dataset, event, id;
                return __generator(this, function (_b) {
                    _a = this.resolveInput(input), dataset = _a.dataset, event = _a.event;
                    id = dataset.id;
                    this.onCellClicked(id, event);
                    return [2 /*return*/];
                });
            });
        },
        onCellClicked: function (id, event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (event) {
                        this.pub(event, this.state.userArr.find(function (ele) { return ele.id === id; }));
                        // this.navigateBack();
                    }
                    else {
                        this.navigateTo({
                            url: '/user/manage/detail',
                            oakId: id,
                        });
                    }
                    return [2 /*return*/];
                });
            });
        },
        goNewUser: function () {
            this.navigateTo({
                url: '/user/manage/upsert',
            });
        },
    },
    lifetimes: {
        detached: function () {
            this.unsubAll(this.props.event);
        },
    },
});
