import { EntityDict } from '../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain'
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext, AspectDict } from '../context/FrontendRuntimeContext';

/**
 * 短信发送及模板同步
 */
export default interface Sms<
    ED extends EntityDict & BaseEntityDict,
    Cxt extends BackendRuntimeContext<ED>> {
    name: string;

    /**
     * 是否支持模板同步
     */
    autoSyncTemplate(): boolean;
    /**
     * 注入在后台extrafile生成之前，将上传所需要的token等信息生成并存放在uploadMeta属性中
     * @param extraFile，要生成的extraFile数据
     * @param context 后台上下文
     * @returns
     */
}