declare const _default: {
    attr: {
        name: string;
        nickname: string;
        birth: string;
        password: string;
        gender: string;
        avatar: string;
        idCardType: string;
        idNumber: string;
        ref: string;
        files: string;
    };
    action: {
        activate: string;
        play: string;
        accept: string;
        verify: string;
        reject: string;
        enable: string;
        disable: string;
        mergeTo: string;
        mergeFrom: string;
    };
    v: {
        userState: {
            shadow: string;
            normal: string;
            disabled: string;
            merged: string;
        };
        idState: {
            unverified: string;
            verifying: string;
            verified: string;
        };
        gender: {
            male: string;
            female: string;
        };
        idCardType: {
            "ID-Card": string;
            passport: string;
            "Mainland-passport": string;
        };
    };
};
export default _default;
