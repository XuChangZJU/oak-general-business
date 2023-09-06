import { makeTreeAncestorFilter, makeTreeDescendantFilter } from 'oak-domain/lib/store/filter';
export function makeAreaAncestorFilter(filter, level = 1, includeAll, includeSelf) {
    return makeTreeAncestorFilter('area', 'parentId', filter, level, includeAll, includeSelf);
}
export function makeAreaDecendantFilter(filter, level = 1, includeAll, includeSelf) {
    return makeTreeDescendantFilter('area', 'parentId', filter, level, includeAll, includeSelf);
}
