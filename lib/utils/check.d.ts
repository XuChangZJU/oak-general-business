import { Checker } from "oak-domain/lib/types";
import { RuntimeContext } from "../context/RuntimeContext";
import { EntityDict } from "../general-app-domain";
export declare function processCheckers<ED extends EntityDict, Cxt extends RuntimeContext<ED>>(checkers: Array<Checker<ED, keyof ED, Cxt>>): void;
