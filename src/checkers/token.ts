import { Checker, OakUserUnpermittedException } from "oak-domain/lib/types";
import { EntityDict } from '../general-app-domain';
import { RuntimeContext } from '../context/RuntimeContext';

const checkers: Checker<EntityDict, 'token', RuntimeContext<EntityDict>> [] = [
];

export default checkers;