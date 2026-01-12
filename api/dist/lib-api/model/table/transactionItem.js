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
exports.transactionItem = void 0;
const typeorm_1 = require("typeorm");
const product_1 = require("../../model/table/product");
const transaction_1 = require("../../model/table/transaction");
let transactionItem = class transactionItem extends typeorm_1.BaseEntity {
};
exports.transactionItem = transactionItem;
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        nullable: false,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], transactionItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_1.product, x => x.id, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_1.product)
], transactionItem.prototype, "otm_product_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'product_id',
        type: 'bigint',
        nullable: false,
    }),
    __metadata("design:type", Number)
], transactionItem.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => transaction_1.transaction, x => x.id, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'transaction_id' }),
    __metadata("design:type", transaction_1.transaction)
], transactionItem.prototype, "otm_transaction_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'transaction_id',
        type: 'bigint',
        nullable: false,
    }),
    __metadata("design:type", Number)
], transactionItem.prototype, "transaction_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        nullable: false,
    }),
    __metadata("design:type", Number)
], transactionItem.prototype, "biaya_admin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        nullable: false,
    }),
    __metadata("design:type", Number)
], transactionItem.prototype, "qty", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        nullable: false,
    }),
    __metadata("design:type", Number)
], transactionItem.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: false,
    }),
    __metadata("design:type", Date)
], transactionItem.prototype, "created_at", void 0);
exports.transactionItem = transactionItem = __decorate([
    (0, typeorm_1.Entity)('transactionItem')
], transactionItem);
