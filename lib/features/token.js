"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const oak_frontend_base_1 = require("oak-frontend-base");
class Token extends oak_frontend_base_1.Feature {
    token;
    async loginByPassword(mobile, password) {
        this.token = await this.getAspectProxy().loginByPassword({ password, mobile });
    }
    async logout() {
        this.token = undefined;
    }
    getToken() {
        return this.token;
    }
}
__decorate([
    oak_frontend_base_1.Action
], Token.prototype, "loginByPassword", null);
__decorate([
    oak_frontend_base_1.Action
], Token.prototype, "logout", null);
exports.Token = Token;
