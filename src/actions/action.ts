import { ActionDef } from 'oak-domain/lib/types/Action';
export type GenericAction = 'create' | 'update' | 'remove' | 'select';
export const genericActions = ['create', 'update', 'remove', 'count', 'stat', 'download', 'select'];

export type AbleAction = 'enable' | 'disable';
export type AbleState = 'enabled' | 'disabled';
export const AbleActionDef: ActionDef<AbleAction, AbleState> = {
    stm: {
        enable: ['disabled', 'enabled'],
        disable: ['enabled', 'disabled'],
    },
}