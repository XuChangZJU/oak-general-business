import { Checker, OakUserUnpermittedException } from "oak-domain/lib/types";
import { EntityDict } from '../general-app-domain';
import { GeneralRuntimeContext } from '../RuntimeContext';

const checkers: Checker<EntityDict, 'token', GeneralRuntimeContext<EntityDict>> [] = [
];

export default checkers;