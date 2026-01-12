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
exports.implement_POST_add_product = implement_POST_add_product;
const auth_1 = require("../../utils/auth");
const product_1 = require("../model/table/product");
function implement_POST_add_product(engine) {
    engine.implement({
        endpoint: "POST /add-product",
        fn(param) {
            return __awaiter(this, void 0, void 0, function* () {
                const { authorization } = param.headers;
                const user = (0, auth_1.verifyToken)(authorization);
                const { img, nama, deskripsi, unit, harga, stok } = param.body;
                // const foundProduct = await product.findOne({
                //   where: { nama }
                // });
                // if (!foundProduct) {
                //   throw new Error("Produk tidak tersedia!");
                // }
                const newProduct = new product_1.product();
                newProduct.img = img;
                newProduct.nama = nama;
                newProduct.deskripsi = deskripsi;
                newProduct.unit = unit;
                newProduct.harga = harga;
                newProduct.stok = stok;
                newProduct.created_at = new Date();
                yield newProduct.save();
                return newProduct;
            });
        },
    });
}
