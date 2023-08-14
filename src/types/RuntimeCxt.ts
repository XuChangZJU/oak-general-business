
import { CommonAspectDict } from "oak-common-aspect";
import GeneralAspectDict from "../aspects/AspectDict";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { FrontendRuntimeContext } from "../context/FrontendRuntimeContext";
import { EntityDict } from "../oak-app-domain";

export type BRC = BackendRuntimeContext<EntityDict>;
export type FrcAspectDict = GeneralAspectDict<EntityDict, BRC> & CommonAspectDict<EntityDict, BRC>;
export type FRC = FrontendRuntimeContext<EntityDict, BRC, FrcAspectDict>;
export type RuntimeCxt = FRC | BRC;