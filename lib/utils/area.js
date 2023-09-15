"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAreaDecendantFilter = exports.makeAreaAncestorFilter = void 0;
const filter_1 = require("oak-domain/lib/store/filter");
function makeAreaAncestorFilter(filter, level = 1, includeAll, includeSelf) {
    return (0, filter_1.makeTreeAncestorFilter)('area', 'parentId', filter, level, includeAll, includeSelf);
}
exports.makeAreaAncestorFilter = makeAreaAncestorFilter;
function makeAreaDecendantFilter(filter, level = 1, includeAll, includeSelf) {
    return (0, filter_1.makeTreeDescendantFilter)('area', 'parentId', filter, level, includeAll, includeSelf);
}
exports.makeAreaDecendantFilter = makeAreaDecendantFilter;
