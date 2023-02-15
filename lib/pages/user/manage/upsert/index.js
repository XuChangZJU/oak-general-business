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
exports.default = OakComponent({
    entity: 'user',
    projection: {
        id: 1,
        name: 1,
        nickname: 1,
        birth: 1,
        gender: 1,
        idCardType: 1,
        idNumber: 1,
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
    },
    isList: false,
    formData: function (_a) {
        var user = _a.data;
        var isRoot = this.features.token.isRoot();
        var _b = user || {}, birth = _b.birth, gender = _b.gender, idCardType = _b.idCardType;
        var birthDate = birth && new Date(birth);
        var birthText = birthDate && birthDate.toLocaleDateString();
        var birthDayValue = birthDate &&
            "".concat(birthDate.getFullYear(), "-").concat(birthDate.getMonth() + 1, "-").concat(birthDate.getDate());
        var genderOption = gender && GenderOptions.find(function (ele) { return ele.value === gender; });
        var genderText = genderOption && genderOption.label;
        var genderOptionIndex = genderOption && GenderOptions.indexOf(genderOption);
        var idCardTypeOption = idCardType &&
            IDCardTypeOptions.find(function (ele) { return ele.value === idCardType; });
        var idCardTypeText = idCardTypeOption && idCardTypeOption.label;
        var idCardTypeOptionIndex = idCardTypeOption && IDCardTypeOptions.indexOf(idCardTypeOption);
        var idCardTypeIndex = idCardType && IDCardTypeOptions.find(function (ele) { return ele.value === gender; });
        var now = new Date();
        return Object.assign({}, user, {
            isRoot: isRoot,
            birthText: birthText,
            birthDayValue: birthDayValue,
            genderText: genderText,
            idCardTypeText: idCardTypeText,
            idCardTypeOptionIndex: idCardTypeOptionIndex,
            oldestBirthday: "".concat(now.getFullYear() - 120, "-01-01"),
            today: "".concat(now.getFullYear(), "-").concat(now.getMonth() + 1, "-").concat(now.getDate()),
            genderOptionIndex: genderOptionIndex,
            idCardTypeIndex: idCardTypeIndex,
        });
    },
    data: {
        birthEnd: '',
        GenderOptions: GenderOptions,
        IDCardTypeOptions: IDCardTypeOptions,
        birthVisible: false,
    },
    lifetimes: {
        ready: function () {
            var today = new Date();
            var birthEnd = "".concat(today.getFullYear(), "-").concat(today.getMonth() + 1, "-").concat(today.getDate());
            this.setState({ birthEnd: birthEnd });
        },
    },
    methods: {
        setValueMp: function (input) {
            var _a;
            var detail = input.detail, dataset = input.target.dataset;
            var attr = dataset.attr;
            var value = detail.value;
            this.update((_a = {}, _a[attr] = value, _a));
        },
        confirmMp: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            this.navigateBack();
                            return [2 /*return*/];
                    }
                });
            });
        },
        onBirthChange: function (e) {
            var value = e.detail.value;
            var birth = new Date(value);
            this.update({ birth: birth });
        },
        onIdCardTypeChange: function (e) {
            var index = e.detail.value;
            var value = IDCardTypeOptions[index].value;
            this.update({
                idCardType: value,
            });
        },
        onGenderChange: function (e) {
            var index = e.detail.value;
            var value = GenderOptions[index].value;
            this.update({
                gender: value,
            });
        },
        setMobile: function () {
            this.navigateTo({
                url: '/mobile/me',
            });
        },
    },
});
