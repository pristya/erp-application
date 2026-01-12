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
exports.product = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class product {
}
exports.product = product;
__decorate([
    (0, class_transformer_1.Transform)((param) => ((param === null || param === void 0 ? void 0 : param.value) === null || (param === null || param === void 0 ? void 0 : param.value) === undefined || (param === null || param === void 0 ? void 0 : param.value) === '') ? null : parseInt(param.value)),
    (0, class_validator_1.IsNumber)({}, { message: 'id must be a number (integer)' }),
    __metadata("design:type", Number)
], product.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'img must be a string' }),
    __metadata("design:type", String)
], product.prototype, "img", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'nama must be a string' }),
    __metadata("design:type", String)
], product.prototype, "nama", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'deskripsi must be a string' }),
    __metadata("design:type", String)
], product.prototype, "deskripsi", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'unit must be a string' }),
    __metadata("design:type", String)
], product.prototype, "unit", void 0);
__decorate([
    (0, class_transformer_1.Transform)((param) => ((param === null || param === void 0 ? void 0 : param.value) === null || (param === null || param === void 0 ? void 0 : param.value) === undefined || (param === null || param === void 0 ? void 0 : param.value) === '') ? null : parseInt(param.value)),
    (0, class_validator_1.IsNumber)({}, { message: 'harga must be a number (integer)' }),
    __metadata("design:type", Number)
], product.prototype, "harga", void 0);
__decorate([
    (0, class_transformer_1.Transform)((param) => ((param === null || param === void 0 ? void 0 : param.value) === null || (param === null || param === void 0 ? void 0 : param.value) === undefined || (param === null || param === void 0 ? void 0 : param.value) === '') ? null : parseInt(param.value)),
    (0, class_validator_1.IsNumber)({}, { message: 'stok must be a number (integer)' }),
    __metadata("design:type", Number)
], product.prototype, "stok", void 0);
__decorate([
    (0, class_transformer_1.Transform)((param) => ((param === null || param === void 0 ? void 0 : param.value) === null || (param === null || param === void 0 ? void 0 : param.value) === undefined || (param === null || param === void 0 ? void 0 : param.value) === '') ? null : ((param === null || param === void 0 ? void 0 : param.value) === 'true' || ((typeof (param === null || param === void 0 ? void 0 : param.value) === 'boolean') && (param === null || param === void 0 ? void 0 : param.value)))),
    (0, class_validator_1.IsBoolean)({ message: 'is_active must be a boolean' }),
    __metadata("design:type", Boolean)
], product.prototype, "is_active", void 0);
__decorate([
    (0, class_transformer_1.Transform)((param) => ((param === null || param === void 0 ? void 0 : param.value) === null || (param === null || param === void 0 ? void 0 : param.value) === undefined || (param === null || param === void 0 ? void 0 : param.value) === '') ? null : new Date(param === null || param === void 0 ? void 0 : param.value)),
    (0, class_validator_1.IsISO8601)({}, { message: 'created_at must be an ISO8601 date' }),
    __metadata("design:type", Date)
], product.prototype, "created_at", void 0);
