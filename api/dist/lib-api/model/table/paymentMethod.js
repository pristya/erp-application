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
exports.paymentMethod = void 0;
const typeorm_1 = require("typeorm");
const paymentMethodTypes_1 = require("../../model/enum/paymentMethodTypes");
let paymentMethod = class paymentMethod extends typeorm_1.BaseEntity {
};
exports.paymentMethod = paymentMethod;
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        nullable: false,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], paymentMethod.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], paymentMethod.prototype, "nama", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: paymentMethodTypes_1.paymentMethodTypes,
        nullable: true,
        default: 'Tunai',
    }),
    __metadata("design:type", String)
], paymentMethod.prototype, "jenis", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 10,
        nullable: false,
    }),
    __metadata("design:type", String)
], paymentMethod.prototype, "kode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: false,
    }),
    __metadata("design:type", Date)
], paymentMethod.prototype, "created_at", void 0);
exports.paymentMethod = paymentMethod = __decorate([
    (0, typeorm_1.Entity)('paymentMethod')
], paymentMethod);
