"use strict";
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
var GenderOptions = [
    {
        value: 'male', label: '男',
    },
    {
        value: 'female', label: '女',
    }
];
var IDCardTypeOptions = [
    {
        value: 'ID-Card', label: '身份证',
    },
    {
        value: 'passport', label: '护照',
    },
    {
        value: 'Mainland-passport', label: '港澳通行证',
    }
];
var PICKER_KEY = {
    SEX: 'sex',
    IDCARD: 'idCard',
    BIRTH: 'birth'
};
exports.default = OakPage({
    path: 'user:manage:upsert',
    entity: 'user',
    projection: {
        id: 1,
        name: 1,
        nickname: 1,
        birth: 1,
        gender: 1,
        avatar: 1,
        idCardType: 1,
        idNumber: 1,
    },
    isList: false,
    formData: function (_a) {
        var user = _a.data;
        return __awaiter(void 0, void 0, void 0, function () {
            var _b, birth, gender, idCardType, birthText, GenderDict, genderText, genderIndex, IdCardTypeDict, idCardTypeText, idCardTypeIndex, now;
            return __generator(this, function (_c) {
                _b = user || {}, birth = _b.birth, gender = _b.gender, idCardType = _b.idCardType;
                birthText = birth && new Date(birth).toLocaleDateString();
                GenderDict = {
                    male: '男',
                    female: '女',
                };
                genderText = gender && GenderDict[gender];
                genderIndex = gender && GenderOptions.find(function (ele) { return ele.value === gender; });
                IdCardTypeDict = {
                    'ID-Card': '身份证',
                    passport: '护照',
                    'Mainland-passport': '港澳通行证',
                };
                idCardTypeText = idCardType && IdCardTypeDict[idCardType];
                idCardTypeIndex = idCardType && IDCardTypeOptions.find(function (ele) { return ele.value === gender; });
                now = new Date();
                return [2 /*return*/, Object.assign({}, user, {
                        birthText: birthText,
                        genderText: genderText,
                        idCardTypeText: idCardTypeText,
                        oldestBirthday: "".concat(now.getFullYear() - 120, "-01-01"),
                        today: "".concat(now.getFullYear(), "-").concat(now.getMonth() + 1, "-").concat(now.getDate()),
                        genderIndex: genderIndex,
                        idCardTypeIndex: idCardTypeIndex,
                    })];
            });
        });
    },
    data: {
        GenderOptions: GenderOptions,
        IDCardTypeOptions: IDCardTypeOptions,
        PICKER_KEY: PICKER_KEY,
        birthVisible: false,
    },
    methods: {
        setValue: function (input) {
            console.log(input, 123);
            var _a = this.resolveInput(input), dataset = _a.dataset, value = _a.value;
            var key = dataset.key;
            if (['sex', 'idCard'].includes(key)) {
                this.setUpdateData(dataset.attr, value[0]);
                return;
            }
            if (key === 'birth') {
                this.setUpdateData(dataset.attr, value);
                this.setState({
                    birthVisible: false,
                });
                return;
            }
            this.setUpdateData(dataset.attr, value);
        },
        confirm: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute(this.props.oakId ? 'update' : 'create')];
                        case 1:
                            _a.sent();
                            if (this.props.oakFrom === 'user:manage:list') {
                                this.navigateBack();
                            }
                            else if (this.props.oakFrom === 'user:manage:detail') {
                                this.navigateBack();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        onClickPicker: function (e) {
            var _a;
            var _b;
            var key = ((_b = e === null || e === void 0 ? void 0 : e.currentTarget) === null || _b === void 0 ? void 0 : _b.dataset).key;
            this.setState((_a = {},
                _a["".concat(key, "Visible")] = true,
                _a));
        },
        onPickerClose: function (e) {
            var _a;
            var _b;
            var key = ((_b = e === null || e === void 0 ? void 0 : e.currentTarget) === null || _b === void 0 ? void 0 : _b.dataset).key;
            this.setState((_a = {},
                _a["".concat(key, "Visible")] = false,
                _a));
        },
    },
});
