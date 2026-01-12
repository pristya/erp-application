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
exports.token = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../../model/table/user");
let token = class token extends typeorm_1.BaseEntity {
};
exports.token = token;
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        nullable: false,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], token.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.user, x => x.id, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_1.user)
], token.prototype, "otm_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_id',
        type: 'bigint',
        nullable: false,
    }),
    __metadata("design:type", Number)
], token.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], token.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: false,
    }),
    __metadata("design:type", Date)
], token.prototype, "expired_at", void 0);
exports.token = token = __decorate([
    (0, typeorm_1.Entity)('token')
], token);
