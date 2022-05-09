"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const GenderOptions = [
    {
        value: 'male', label: '男',
    },
    {
        value: 'female', label: '女',
    }
];
const IDCardTypeOptions = [
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
OakPage({
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
    formData: async ([user]) => {
        const { birth, gender, idCardType } = user || {};
        const birthText = birth && (new Date(birth)).toLocaleDateString();
        const GenderDict = {
            male: '男',
            female: '女',
        };
        const genderText = gender && GenderDict[gender];
        const genderIndex = gender && GenderOptions.find(ele => ele.value === gender);
        const IdCardTypeDict = {
            'ID-Card': '身份证',
            'passport': '护照',
            'Mainland-passport': '港澳通行证',
        };
        const idCardTypeText = idCardType && IdCardTypeDict[idCardType];
        const idCardTypeIndex = idCardType && IDCardTypeOptions.find(ele => ele.value === gender);
        const now = new Date();
        return (0, lodash_1.assign)({}, user, {
            birthText,
            genderText,
            idCardTypeText,
            oldestBirthday: `${now.getFullYear() - 120}-01-01`,
            today: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
            genderIndex,
            idCardTypeIndex,
        });
    },
}, {
    data: {
        GenderOptions,
        IDCardTypeOptions,
    },
    methods: {
        setValue(input) {
            const { target, detail } = input;
            const { dataset: { attr } } = target;
            const { value } = detail;
            this.setUpdateData(attr, value);
        },
        onBirthChange(e) {
            const { value } = e.detail;
            const birth = new Date(value);
            birth.setHours(0);
            birth.setMinutes(0);
            birth.setSeconds(0);
            birth.setMilliseconds(0);
            this.setUpdateData('birth', birth);
        },
        onGenderChange(e) {
            const { value } = e.detail;
            this.setUpdateData('gender', GenderOptions[value].value);
        },
        onIdCardTypeChange(e) {
            const { value } = e.detail;
            this.setUpdateData('idCardType', IDCardTypeOptions[value].value);
        },
        async confirm() {
            await this.execute(this.data.oakId ? 'update' : 'create', () => {
                if (this.data.oakFrom === 'user:manage:list') {
                    wx.navigateBack();
                }
            });
        }
    }
});
