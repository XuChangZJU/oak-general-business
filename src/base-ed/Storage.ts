import { StorageSchema } from "oak-domain/lib/types/Storage";
import { EntityDict } from "./EntityDict";
import { desc as addressDesc } from "./Address/Storage";
import { desc as applicationDesc } from "./Application/Storage";
import { desc as areaDesc } from "./Area/Storage";
import { desc as extraFileDesc } from "./ExtraFile/Storage";
import { desc as mobileDesc } from "./Mobile/Storage";
import { desc as userRoleDesc } from "./UserRole/Storage";
import { desc as roleDesc } from "./Role/Storage";
import { desc as userSystemDesc } from "./UserSystem/Storage";
import { desc as systemDesc } from "./System/Storage";
import { desc as tokenDesc } from "./Token/Storage";
import { desc as userDesc } from "./User/Storage";
import { desc as wechatUserDesc } from "./WechatUser/Storage";
export const storageSchema: StorageSchema<EntityDict> = {
    address: addressDesc,
    application: applicationDesc,
    area: areaDesc,
    extraFile: extraFileDesc,
    mobile: mobileDesc,
    userRole: userRoleDesc,
    role: roleDesc,
    userSystem: userSystemDesc,
    system: systemDesc,
    token: tokenDesc,
    user: userDesc,
    wechatUser: wechatUserDesc
};