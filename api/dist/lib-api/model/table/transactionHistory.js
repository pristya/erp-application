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
exports.transactionHistory = void 0;
const typeorm_1 = require("typeorm");
const transaction_1 = require("../../model/table/transaction");
const transactionStatus_1 = require("../../model/enum/transactionStatus");
let transactionHistory = class transactionHistory extends typeorm_1.BaseEntity {
};
exports.transactionHistory = transactionHistory;
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        nullable: false,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], transactionHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => transaction_1.transaction, x => x.id, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'id_transaction' }),
    __metadata("design:type", transaction_1.transaction)
], transactionHistory.prototype, "otm_id_transaction", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'id_transaction',
        type: 'bigint',
        nullable: false,
    }),
    __metadata("design:type", Number)
], transactionHistory.prototype, "id_transaction", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: transactionStatus_1.transactionStatus,
        nullable: false,
        default: 'Baru',
    }),
    __metadata("design:type", String)
], transactionHistory.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], transactionHistory.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: false,
    }),
    __metadata("design:type", Date)
], transactionHistory.prototype, "created_at", void 0);
exports.transactionHistory = transactionHistory = __decorate([
    (0, typeorm_1.Entity)('transactionHistory')
], transactionHistory);
