export type { GeneralFeatures } from './features';
export type { GeneralAspectDict } from './aspects/AspectDict';
export * from './types/Page';
export * from './types/Message';
export * from './types/RuntimeCxt';
export { BackendRuntimeContext } from './context/BackendRuntimeContext';
export { FrontendRuntimeContext, SerializedData, } from './context/FrontendRuntimeContext';
export { RuntimeContext } from './context/RuntimeContext';
export { selectFreeEntities, authDeduceRelationMap, updateFreeDict } from './config/relation';
