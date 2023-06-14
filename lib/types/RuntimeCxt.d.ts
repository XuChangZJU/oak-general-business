import { CommonAspectDict } from "oak-common-aspect";
import GeneralAspectDict from "../aspects/AspectDict";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { FrontendRuntimeContext } from "../context/FrontendRuntimeContext";
import { EntityDict } from "../general-app-domain";
export declare type BRC = BackendRuntimeContext<EntityDict>;
export declare type FrcAspectDict = GeneralAspectDict<EntityDict, BRC> & CommonAspectDict<EntityDict, BRC>;
export declare type FRC = FrontendRuntimeContext<EntityDict, BRC, FrcAspectDict>;
export declare type RuntimeCxt = FRC | BRC;
