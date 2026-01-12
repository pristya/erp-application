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
exports.transactionResponse = void 0;
const transaction_1 = require("../ts-model/table/transaction");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class transactionResponse {
}
exports.transactionResponse = transactionResponse;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'transaction cannot be empty' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => transaction_1.transaction),
    __metadata("design:type", transaction_1.transaction)
], transactionResponse.prototype, "transaction", void 0);
