import { DateTime } from 'luxon';
import moment from 'moment';
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
    IDCARD: 'idCard'
  };

export default OakPage({
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
    formData: async ({ data: user }) => {
        console.log(moment(new Date().getTime()).format('YYYY-MM-DD'));
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
<<<<<<< HEAD
=======
        [`${PICKER_KEY.SEX}Visible`]: false,
        [`${PICKER_KEY.IDCARD}Visible`]: false,
        dateTimeVisible: false,
        start: '1900-01-01',
        end: moment(new Date().getTime()).format('YYYY-MM-DD'),
>>>>>>> 57bd9a0d10a908bf51843c116ac392f2a1137beb
    },
    methods: {
        setValue(input: any) {
            console.log(input, 123123);
            const { dataset, value } = this.resolveInput(input);
            const { key } = dataset;
            if (key === 'sex') {
                this.setUpdateData(dataset!.attr, value[0]);
                return
            }
            this.setUpdateData(dataset!.attr, value);
        },
        async confirm() {
            await this.execute(this.props.oakId ? 'update' : 'create');
            if (this.props.oakFrom === 'user:manage:list') {
                this.navigateBack();
            }
        },
        onClickPicker(e) {
            const { key } = e?.currentTarget?.dataset;
<<<<<<< HEAD

=======
>>>>>>> 57bd9a0d10a908bf51843c116ac392f2a1137beb
            this.setData({
                [`${key}Visible`]: true,
            });
        },
<<<<<<< HEAD
        onPickerClose(e) {
=======
        onPickerCancel(e:any) {
>>>>>>> 57bd9a0d10a908bf51843c116ac392f2a1137beb
            const { key } = e?.currentTarget?.dataset;
            this.setState({
              [`${key}Visible`]: false,
            });
        },
<<<<<<< HEAD
=======
        onPickerConfirm(e: any) {
            const { key, attr } = e?.currentTarget?.dataset;
            const { value } = e.detail;
            this.setUpdateData(attr, value);
            this.setState({
              [`${key}Visible`]: false,
            })
        }
>>>>>>> 57bd9a0d10a908bf51843c116ac392f2a1137beb
    },
});