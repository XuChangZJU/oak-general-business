import { AbleAction } from "oak-domain/lib/actions/action";
import { GenericAction } from "oak-domain/lib/actions/action";
export declare type ParticularAction = AbleAction;
export declare type Action = GenericAction | ParticularAction;
