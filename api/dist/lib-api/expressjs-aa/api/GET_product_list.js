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
exports.GET_product_list_Req = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GET_product_list_Req_Query {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((param) => ((param === null || param === void 0 ? void 0 : param.value) === null || (param === null || param === void 0 ? void 0 : param.value) === undefined || (param === null || param === void 0 ? void 0 : param.value) === '') ? null : parseFloat(param.value)),
    (0, class_validator_1.IsNumber)({}, { message: 'limit must be a number (decimal)' }),
    __metadata("design:type", Number)
], GET_product_list_Req_Query.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((param) => ((param === null || param === void 0 ? void 0 : param.value) === null || (param === null || param === void 0 ? void 0 : param.value) === undefined || (param === null || param === void 0 ? void 0 : param.value) === '') ? null : parseFloat(param.value)),
    (0, class_validator_1.IsNumber)({}, { message: 'offset must be a number (decimal)' }),
    __metadata("design:type", Number)
], GET_product_list_Req_Query.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'search must be a string' }),
    __metadata("design:type", String)
], GET_product_list_Req_Query.prototype, "search", void 0);
class GET_product_list_Req {
}
exports.GET_product_list_Req = GET_product_list_Req;
__decorate([
    (0, class_transformer_1.Type)(() => GET_product_list_Req_Query),
    __metadata("design:type", GET_product_list_Req_Query)
], GET_product_list_Req.prototype, "query", void 0);
