import { makeTreeAncestorFilter, makeTreeDescendantFilter } from 'oak-domain/lib/store/filter';
import { EntityDict } from '../oak-app-domain';

export function makeAreaAncestorFilter(filter: EntityDict['area']['Selection']['filter'], level: number = 1, includeAll?: boolean, includeSelf?: boolean) {
    return makeTreeAncestorFilter<EntityDict, 'area'>('area', 'parentId', filter, level, includeAll, includeSelf);
}

export function makeAreaDecendantFilter(filter: EntityDict['area']['Selection']['filter'], level: number = 1, includeAll?: boolean, includeSelf?: boolean) {
    return makeTreeDescendantFilter<EntityDict, 'area'>('area', 'parentId', filter, level, includeAll, includeSelf);
}