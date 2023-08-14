import { EntityDict } from '../oak-app-domain';
export declare function makeAreaAncestorFilter(filter: EntityDict['area']['Selection']['filter'], level?: number, includeAll?: boolean, includeSelf?: boolean): import("../oak-app-domain/Area/Schema").Filter | undefined;
export declare function makeAreaDecendantFilter(filter: EntityDict['area']['Selection']['filter'], level?: number, includeAll?: boolean, includeSelf?: boolean): import("../oak-app-domain/Area/Schema").Filter | undefined;
