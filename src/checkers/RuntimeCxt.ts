
import { CommonAspectDict } from "oak-common-aspect";
import { AspectDict as GeneralAspectDict } from "../aspects/AspectDict";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { FrontendRuntimeContext } from "../context/FrontendRuntimeContext";
import { EntityDict } from "../general-app-domain";

type BRC = BackendRuntimeContext<EntityDict>;
type FrcAspectDict = GeneralAspectDict<EntityDict, BRC> & CommonAspectDict<EntityDict, BRC>;
type FRC = FrontendRuntimeContext<EntityDict, BRC, FrcAspectDict>;
export type RuntimeCxt = FRC | BRC;