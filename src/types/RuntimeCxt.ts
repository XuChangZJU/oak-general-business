import { CommonAspectDict } from 'oak-common-aspect';
import GeneralAspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { EntityDict } from '../oak-app-domain';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/base-app-domain';

export type ED = EntityDict & BaseEntityDict;
export type BRC = BackendRuntimeContext<ED>;
export type FrcAspectDict = GeneralAspectDict<ED, BRC> &
    CommonAspectDict<ED, BRC>;
export type FRC = FrontendRuntimeContext<ED, BRC, FrcAspectDict>;
export type RuntimeCxt = FRC | BRC;
