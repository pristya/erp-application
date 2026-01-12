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
exports.implement_GET_transaction_list = implement_GET_transaction_list;
const auth_1 = require("../../utils/auth");
const transactionItem_1 = require("../model/table/transactionItem");
const transaction_1 = require("../model/table/transaction");
function implement_GET_transaction_list(engine) {
    engine.implement({
        endpoint: 'GET /transaction-list',
        fn(param) {
            return __awaiter(this, void 0, void 0, function* () {
                const { authorization } = param.headers;
                if (!authorization)
                    throw new Error("Unauthorized");
                const rawToken = authorization.replace("Bearer", "").trim();
                const user_id = yield (0, auth_1.verifyToken)(rawToken);
                const { limit, offset } = param.query;
                // Ambil semua transaksi milik user
                const userTransactions = yield transaction_1.transaction.find({
                    where: { user_id },
                    select: ["id"],
                });
                // Ambil semua transactionItem dari transaksi user
                const items = yield transactionItem_1.transactionItem.find({
                    relations: ['otm_transaction_id', 'otm_product_id'],
                    order: { created_at: "DESC" },
                    skip: offset ? Number(offset) : 0,
                    take: limit ? Number(limit) : undefined,
                });
                return items;
            });
        }
    });
}
