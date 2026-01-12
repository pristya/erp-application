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
exports.POST_add_transaction_Req = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class POST_add_transaction_Req_Headers {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'authorization cannot be empty' }),
    (0, class_validator_1.IsString)({ message: 'authorization must be a string' }),
    __metadata("design:type", String)
], POST_add_transaction_Req_Headers.prototype, "authorization", void 0);
class POST_add_transaction_Req_Body {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'product_id cannot be empty' }),
    (0, class_transformer_1.Transform)((param) => ((param === null || param === void 0 ? void 0 : param.value) === null || (param === null || param === void 0 ? void 0 : param.value) === undefined || (param === null || param === void 0 ? void 0 : param.value) === '') ? null : parseFloat(param.value)),
    (0, class_validator_1.IsNumber)({}, { message: 'product_id must be a number (decimal)' }),
    __metadata("design:type", Number)
], POST_add_transaction_Req_Body.prototype, "product_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'qty cannot be empty' }),
    (0, class_transformer_1.Transform)((param) => ((param === null || param === void 0 ? void 0 : param.value) === null || (param === null || param === void 0 ? void 0 : param.value) === undefined || (param === null || param === void 0 ? void 0 : param.value) === '') ? null : parseFloat(param.value)),
    (0, class_validator_1.IsNumber)({}, { message: 'qty must be a number (decimal)' }),
    __metadata("design:type", Number)
], POST_add_transaction_Req_Body.prototype, "qty", void 0);
class POST_add_transaction_Req {
}
exports.POST_add_transaction_Req = POST_add_transaction_Req;
__decorate([
    (0, class_transformer_1.Type)(() => POST_add_transaction_Req_Headers),
    __metadata("design:type", POST_add_transaction_Req_Headers)
], POST_add_transaction_Req.prototype, "headers", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => POST_add_transaction_Req_Body),
    __metadata("design:type", POST_add_transaction_Req_Body)
], POST_add_transaction_Req.prototype, "body", void 0);
