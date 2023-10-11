import { loginByMobile, loginWechat, loginWechatMp, syncUserInfoWechatMp, sendCaptcha, switchTo, refreshWechatPublicUserInfo, getWechatMpUserPhoneNumber, logout, loginByWechat, wakeupParasite } from './token';
import { getInfoByUrl } from './extraFile';
import { getApplication, signatureJsSDK, uploadWechatMedia } from './application';
import { updateConfig, updateApplicationConfig } from './config';
import { updateStyle } from './style2';
import { mergeUser, getChangePasswordChannels, updateUserPassword } from './user';
import { createWechatLogin } from './wechatLogin';
import { unbindingWechat } from './wechatUser';
import { getMpUnlimitWxaCode } from './wechatQrCode';
import { confirmUserEntityGrant } from './userEntityGrant';
import { createSession } from './session';
import { getCurrentMenu, getMenu, createMenu, createConditionalMenu, deleteConditionalMenu, deleteMenu, batchGetArticle, getArticle, batchGetMaterialList, getMaterial } from './wechatMenu';
import { createTag, getTags, editTag, deleteTag, syncTag, oneKeySync } from './wechatPublicTag';
import { getTagUsers, batchtagging, batchuntagging, getUserTags, getUsers, tagging, syncToLocale, syncToWechat } from './userWechatPublicTag';
declare const aspectDict: {
    mergeUser: typeof mergeUser;
    switchTo: typeof switchTo;
    refreshWechatPublicUserInfo: typeof refreshWechatPublicUserInfo;
    loginByMobile: typeof loginByMobile;
    loginWechat: typeof loginWechat;
    loginWechatMp: typeof loginWechatMp;
    wakeupParasite: typeof wakeupParasite;
    syncUserInfoWechatMp: typeof syncUserInfoWechatMp;
    sendCaptcha: typeof sendCaptcha;
    getApplication: typeof getApplication;
    updateConfig: typeof updateConfig;
    updateStyle: typeof updateStyle;
    updateApplicationConfig: typeof updateApplicationConfig;
    getWechatMpUserPhoneNumber: typeof getWechatMpUserPhoneNumber;
    logout: typeof logout;
    signatureJsSDK: typeof signatureJsSDK;
    createWechatLogin: typeof createWechatLogin;
    unbindingWechat: typeof unbindingWechat;
    loginByWechat: typeof loginByWechat;
    getInfoByUrl: typeof getInfoByUrl;
    getChangePasswordChannels: typeof getChangePasswordChannels;
    updateUserPassword: typeof updateUserPassword;
    getMpUnlimitWxaCode: typeof getMpUnlimitWxaCode;
    confirmUserEntityGrant: typeof confirmUserEntityGrant;
    uploadWechatMedia: typeof uploadWechatMedia;
    getCurrentMenu: typeof getCurrentMenu;
    getMenu: typeof getMenu;
    createMenu: typeof createMenu;
    createConditionalMenu: typeof createConditionalMenu;
    deleteConditionalMenu: typeof deleteConditionalMenu;
    deleteMenu: typeof deleteMenu;
    batchGetArticle: typeof batchGetArticle;
    getArticle: typeof getArticle;
    batchGetMaterialList: typeof batchGetMaterialList;
    getMaterial: typeof getMaterial;
    createSession: typeof createSession;
    createTag: typeof createTag;
    getTags: typeof getTags;
    editTag: typeof editTag;
    deleteTag: typeof deleteTag;
    syncTag: typeof syncTag;
    oneKeySync: typeof oneKeySync;
    getTagUsers: typeof getTagUsers;
    batchtagging: typeof batchtagging;
    batchuntagging: typeof batchuntagging;
    getUserTags: typeof getUserTags;
    getUsers: typeof getUsers;
    tagging: typeof tagging;
    syncToLocale: typeof syncToLocale;
    syncToWechat: typeof syncToWechat;
};
export default aspectDict;
