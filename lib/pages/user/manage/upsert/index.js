"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    formData({ data: user }) {
        const isRoot = this.features.token.isRoot();
        const { birth, gender, idCardType } = user || {};
        const birthDate = birth && new Date(birth);
        const birthText = birthDate && birthDate.toLocaleDateString();
        const birthDayValue = birthDate &&
            `${birthDate.getFullYear()}-${birthDate.getMonth() + 1}-${birthDate.getDate()}`;
        const genderOption = gender && GenderOptions.find((ele) => ele.value === gender);
        const genderText = genderOption && genderOption.label;
        const genderOptionIndex = genderOption && GenderOptions.indexOf(genderOption);
        const idCardTypeOption = idCardType &&
            IDCardTypeOptions.find((ele) => ele.value === idCardType);
        const idCardTypeText = idCardTypeOption && idCardTypeOption.label;
        const idCardTypeOptionIndex = idCardTypeOption && IDCardTypeOptions.indexOf(idCardTypeOption);
        const idCardTypeIndex = idCardType && IDCardTypeOptions.find((ele) => ele.value === gender);
        const now = new Date();
        return Object.assign({}, user, {
            isRoot,
            birthText,
            birthDayValue,
            genderText,
            idCardTypeText,
            idCardTypeOptionIndex,
            oldestBirthday: `${now.getFullYear() - 120}-01-01`,
            today: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
            genderOptionIndex,
            idCardTypeIndex,
        });
    },
    data: {
        birthEnd: '',
        GenderOptions,
        IDCardTypeOptions,
        birthVisible: false,
    },
    lifetimes: {
        ready() {
            const today = new Date();
            const birthEnd = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            this.setState({ birthEnd });
        },
    },
    methods: {
        setValueMp(input) {
            const { detail, target: { dataset }, } = input;
            const { attr } = dataset;
            const { value } = detail;
            this.update({ [attr]: value });
        },
        async confirm() {
            const { nickname } = this.state;
            if (!nickname) {
                this.setMessage({
                    type: 'warning',
                    content: '请输入昵称'
                });
                return;
            }
            await this.execute();
            this.navigateBack();
        },
        onBirthChange(e) {
            const { detail: { value }, } = e;
            const birth = new Date(value);
            this.update({ birth });
        },
        onIdCardTypeChange(e) {
            const { detail: { value: index }, } = e;
            const { value } = IDCardTypeOptions[index];
            this.update({
                idCardType: value,
            });
        },
        onGenderChange(e) {
            const { detail: { value: index }, } = e;
            const { value } = GenderOptions[index];
            this.update({
                gender: value,
            });
        },
        setMobile() {
            this.navigateTo({
                url: '/mobile/me',
            });
        },
    },
});
