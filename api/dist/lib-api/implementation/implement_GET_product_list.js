"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.implement_GET_product_list = implement_GET_product_list;
const typeorm_1 = require("typeorm");
const product_1 = require("../model/table/product");
function implement_GET_product_list(engine) {
    engine.implement({
        endpoint: 'GET /product-list',
        fn(param) {
            return __awaiter(this, void 0, void 0, function* () {
                // daftar produk
                const { limit, offset, search } = param.query;
                // filter pencarian kalau ada search
                const where = {};
                if (search) {
                    where.nama = (0, typeorm_1.Like)(`%${search}`);
                }
                // ambil data dengan pagination
                const products = yield product_1.product.find({
                    where,
                    skip: offset ? Number(offset) : 0,
                    take: limit ? Number(limit) : undefined,
                    order: { created_at: "DESC" },
                });
                return products;
            });
        }
    });
}
