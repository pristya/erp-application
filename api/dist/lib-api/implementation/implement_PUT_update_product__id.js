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
exports.implement_PUT_update_product__id = implement_PUT_update_product__id;
const auth_1 = require("../../utils/auth");
const product_1 = require("../model/table/product");
function implement_PUT_update_product__id(engine) {
    engine.implement({
        endpoint: 'PUT /update-product/:id',
        fn(param) {
            return __awaiter(this, void 0, void 0, function* () {
                const { authorization } = param.headers;
                const user = yield (0, auth_1.verifyToken)(authorization);
                const { id } = param.paths;
                const { img, nama, deskripsi, unit, harga, stok } = param.body;
                const foundProduct = yield product_1.product.findOne({
                    where: { id: Number(id) }
                });
                if (!foundProduct) {
                    throw new Error("Product not found!");
                }
                // update field yang dikirim
                if (img !== undefined)
                    foundProduct.img = img;
                if (nama !== undefined)
                    foundProduct.nama = nama;
                if (deskripsi !== undefined)
                    foundProduct.deskripsi = deskripsi;
                if (unit !== undefined)
                    foundProduct.unit = unit;
                if (unit !== undefined)
                    foundProduct.harga = harga;
                if (stok !== undefined)
                    foundProduct.stok = stok;
                yield foundProduct.save();
                return true;
            });
        }
    });
}
