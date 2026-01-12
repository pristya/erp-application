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
exports.implement_DELETE_transaction_delete__id = implement_DELETE_transaction_delete__id;
const auth_1 = require("../../utils/auth");
const transaction_1 = require("../model/table/transaction");
const transactionItem_1 = require("../model/table/transactionItem");
function implement_DELETE_transaction_delete__id(engine) {
    engine.implement({
        endpoint: 'DELETE /transaction-delete/:id',
        fn(param) {
            return __awaiter(this, void 0, void 0, function* () {
                const { authorization } = param.headers;
                const user_id = yield (0, auth_1.verifyToken)(authorization);
                const { id } = param.paths;
                // Cari transaksi yang mau dihapus dan pastikan milik user
                const found = yield transaction_1.transaction.findOne({ where: { id: Number(id), user_id } });
                if (!found)
                    return false; // ngga ada data atau bukan milik user
                // Hapus semua transactionItem terkait
                yield transactionItem_1.transactionItem.delete({ transaction_id: found.id });
                // Hapus transaksi
                yield transaction_1.transaction.delete({ id: found.id });
                return true;
            });
        }
    });
}
