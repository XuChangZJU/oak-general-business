"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAreaDecendantFilter = exports.makeAreaAncestorFilter = void 0;
var filter_1 = require("oak-domain/lib/store/filter");
function makeAreaAncestorFilter(filter, level, includeAll, includeSelf) {
    if (level === void 0) { level = 1; }
    return (0, filter_1.makeTreeAncestorFilter)('area', 'parentId', filter, level, includeAll, includeSelf);
}
exports.makeAreaAncestorFilter = makeAreaAncestorFilter;
function makeAreaDecendantFilter(filter, level, includeAll, includeSelf) {
    if (level === void 0) { level = 1; }
    return (0, filter_1.makeTreeDescendantFilter)('area', 'parentId', filter, level, includeAll, includeSelf);
}
exports.makeAreaDecendantFilter = makeAreaDecendantFilter;
