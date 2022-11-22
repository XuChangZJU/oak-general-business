import {DateTime} from 'luxon';
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

const PICKER_KEY = {
    SEX: 'sex',
    IDCARD: 'idCard',
    BIRTH: 'birth'
  };

export default OakComponent({
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
    formData: ({ data: user }) => {
        const { birth, gender, idCardType } = user || {};
        const birthText = birth && new Date(birth).toLocaleDateString();
        const GenderDict = {
            male: '男',
            female: '女',
        };
        const genderText = gender && GenderDict[gender];
        const genderIndex =
            gender && GenderOptions.find((ele) => ele.value === gender);
        const IdCardTypeDict = {
            'ID-Card': '身份证',
            passport: '护照',
            'Mainland-passport': '港澳通行证',
        };
        const idCardTypeText = idCardType && IdCardTypeDict[idCardType];
        const idCardTypeIndex =
            idCardType && IDCardTypeOptions.find((ele) => ele.value === gender);
        const now = new Date();
        return Object.assign({}, user, {
            birthText,
            genderText,
            idCardTypeText,
            oldestBirthday: `${now.getFullYear() - 120}-01-01`,
            today: `${now.getFullYear()}-${
                now.getMonth() + 1
            }-${now.getDate()}`,
            genderIndex,
            idCardTypeIndex,
        });
    },
    data: {
        GenderOptions,
        IDCardTypeOptions,
        PICKER_KEY,
        birthVisible: false,
    },
    methods: {
        setValue(input: any) {
            console.log(input, 123);
            const { dataset, value } = this.resolveInput(input);
            const { key } = dataset;
            if (['sex', 'idCard'].includes(key)) {
                this.setUpdateData(dataset!.attr, value[0]);
                return;
            }
            if (key === 'birth') {
                this.setUpdateData(dataset!.attr, value);
                this.setState({
                    birthVisible: false,
                });
                return;
            }
            this.setUpdateData(dataset!.attr, value);
        },
        async confirm() {
            await this.execute();
            if (this.props.oakFrom === 'user:manage:list') {
                this.navigateBack();
            } else if (this.props.oakFrom === 'user:manage:detail') {
                this.navigateBack();
            }
        },
        onClickPicker(e: any) {
            const { key } = e?.currentTarget?.dataset;

            this.setState({
                [`${key}Visible`]: true,
            });
        },
        onPickerClose(e: any) {
            const { key } = e?.currentTarget?.dataset;
            this.setState({
              [`${key}Visible`]: false,
            });
        },
    },
});