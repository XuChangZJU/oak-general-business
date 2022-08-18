import { Checker } from "oak-domain/lib/types";
import { GeneralRuntimeContext } from "../RuntimeContext";
import { EntityDict } from "../general-app-domain";
export declare function processCheckers<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(checkers: Array<Checker<ED, keyof ED, Cxt>>): void;
