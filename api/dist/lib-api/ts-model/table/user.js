"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const userRole_1 = require("../../ts-model/enum/userRole");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class user {
}
exports.user = user;
__decorate([
    (0, class_transformer_1.Transform)((param) => ((param === null || param === void 0 ? void 0 : param.value) === null || (param === null || param === void 0 ? void 0 : param.value) === undefined || (param === null || param === void 0 ? void 0 : param.value) === '') ? null : parseInt(param.value)),
    (0, class_validator_1.IsNumber)({}, { message: 'id must be a number (integer)' }),
    __metadata("design:type", Number)
], user.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(userRole_1.userRole, { message: 'role must be enum userRole' }),
    __metadata("design:type", String)
], user.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'username must be a string' }),
    __metadata("design:type", String)
], user.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'password must be a string' }),
    __metadata("design:type", String)
], user.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'nomor_hp must be a string' }),
    __metadata("design:type", String)
], user.prototype, "nomor_hp", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'nama_lengkap must be a string' }),
    __metadata("design:type", String)
], user.prototype, "nama_lengkap", void 0);
__decorate([
    (0, class_transformer_1.Transform)((param) => ((param === null || param === void 0 ? void 0 : param.value) === null || (param === null || param === void 0 ? void 0 : param.value) === undefined || (param === null || param === void 0 ? void 0 : param.value) === '') ? null : new Date(param === null || param === void 0 ? void 0 : param.value)),
    (0, class_validator_1.IsISO8601)({}, { message: 'created_at must be an ISO8601 date' }),
    __metadata("design:type", Date)
], user.prototype, "created_at", void 0);
