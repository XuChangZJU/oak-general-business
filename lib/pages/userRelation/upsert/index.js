"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var string_1 = require("oak-domain/lib/utils/string");
exports.default = OakPage({
    path: 'userRelation:upsert',
    entity: 'user',
    projection: function (_a) {
        var props = _a.props;
        return __awaiter(void 0, void 0, void 0, function () {
            var entity, entityId, entityStr;
            var _b, _c;
            return __generator(this, function (_d) {
                entity = props.entity, entityId = props.entityId;
                entityStr = (0, string_1.firstLetterUpperCase)(entity);
                return [2 /*return*/, (_b = {
                            id: 1,
                            name: 1,
                            password: 1,
                            mobile$user: {
                                $entity: 'mobile',
                                data: {
                                    id: 1,
                                    userId: 1,
                                    mobile: 1,
                                },
                            }
                        },
                        _b["user".concat(entityStr, "$user")] = {
                            $entity: "user".concat(entityStr),
                            data: (_c = {
                                    id: 1,
                                    userId: 1
                                },
                                _c["".concat(entity, "Id")] = 1,
                                _c.relation = 1,
                                _c),
                        },
                        _b)];
            });
        });
    },
    isList: false,
    formData: function (_a) {
        var user = _a.data, props = _a.props;
        return __awaiter(void 0, void 0, void 0, function () {
            var entity, relations, _b, id, name, mobile$user, password, mobile;
            var _c;
            return __generator(this, function (_d) {
                entity = props.entity, relations = props.relations;
                _b = user || {}, id = _b.id, name = _b.name, mobile$user = _b.mobile$user, password = _b.password;
                mobile = mobile$user && ((_c = mobile$user[0]) === null || _c === void 0 ? void 0 : _c.mobile);
                return [2 /*return*/, {
                        id: id,
                        name: name,
                        mobile: mobile,
                        password: password,
                    }];
            });
        });
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
    },
    data: {
        mobile: '',
        relationArr: [],
    },
    methods: {
        setValue: function (input) {
            var _a = this.resolveInput(input), dataset = _a.dataset, value = _a.value, Context = _a.Context;
            this.setUpdateData(dataset.attr, value);
        },
        onMobileChange: function (event) {
            var value = event.detail.value;
            this.setState({
                mobile: value,
            });
            this.setUpdateData('mobile$user.0.mobile', value);
        },
        onCheckBoxChange: function (event) {
            var value = event.detail.value;
            this.setRelationValue(value);
        },
        setRelationValue: function (value) {
            var _this = this;
            var _a = this.props, entity = _a.entity, entityId = _a.entityId, relations = _a.relations;
            var entityStr = (0, string_1.firstLetterUpperCase)(entity);
            var relationArr = this.state.relationArr;
            //由于是根据index 进行删除, 所以将之前设置的node从头开始删除
            relationArr.forEach(function (ele, index) {
                _this.removeNode("user".concat(entityStr, "$user"), '0');
            });
            value.forEach(function (ele, index) {
                _this.setUpdateData("user".concat(entityStr, "$user.").concat(index, ".").concat(entity, "Id"), entityId);
                _this.setUpdateData("user".concat(entityStr, "$user.").concat(index, ".relation"), ele);
            });
            this.setState({
                relationArr: value,
            });
        },
        onConfirm: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute('create')];
                        case 1:
                            _a.sent();
                            this.navigateBack();
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
