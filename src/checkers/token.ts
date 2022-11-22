import { Checker } from "oak-domain/lib/types";
import { EntityDict } from '../general-app-domain';
import { RuntimeCxt } from "../types/RuntimeCxt";

const checkers: Checker<EntityDict, 'token', RuntimeCxt> [] = [
];

export default checkers;