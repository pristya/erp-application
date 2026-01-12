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
exports.implement_POST_add_transaction = implement_POST_add_transaction;
const product_1 = require("../model/table/product");
const transactionItem_1 = require("../model/table/transactionItem");
const auth_1 = require("../../utils/auth");
const transaction_1 = require("../model/table/transaction");
function implement_POST_add_transaction(engine) {
    engine.implement({
        endpoint: "POST /add-transaction",
        fn(param) {
            return __awaiter(this, void 0, void 0, function* () {
                const { authorization } = param.headers;
                if (!authorization)
                    throw new Error("Unauthorized");
                const user_id = yield (0, auth_1.verifyToken)(authorization);
                // Pastikan body ada dan langsung destructure
                const body = param.body;
                if (!body)
                    throw new Error("Data transaksi tidak lengkap");
                const { product_id, qty } = body;
                if (!product_id || !qty) {
                    throw new Error("Data transaksi tidak lengkap");
                }
                // Cari produk
                const found = yield product_1.product.findOne({ where: { id: product_id } });
                if (!found)
                    throw new Error(`Produk ${product_id} tidak ditemukan`);
                if (found.stok < qty)
                    throw new Error(`Stok tidak cukup untuk ${found.nama}`);
                // Buat transaksi
                const trx = yield transaction_1.transaction
                    .create({
                    user_id,
                    total_harga: 0,
                    created_at: new Date(),
                })
                    .save();
                // Kurangi stok
                found.stok -= qty;
                yield found.save();
                const subtotal = qty * found.harga;
                // Simpan transaction item
                const trxItem = yield transactionItem_1.transactionItem
                    .create({
                    product_id: found.id,
                    transaction_id: trx.id,
                    qty,
                    total: subtotal,
                    biaya_admin: 2500,
                    created_at: new Date(),
                })
                    .save();
                // Update total transaksi
                trx.total_harga = subtotal;
                yield trx.save();
                return [trxItem];
            });
        },
    });
}
