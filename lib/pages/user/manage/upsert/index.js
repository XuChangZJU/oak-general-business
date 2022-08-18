"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var _b, birth, gender, idCardType, birthText, GenderDict, genderText, genderIndex, IdCardTypeDict, idCardTypeText, idCardTypeIndex, now;
            return tslib_1.__generator(this, function (_c) {
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
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
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
