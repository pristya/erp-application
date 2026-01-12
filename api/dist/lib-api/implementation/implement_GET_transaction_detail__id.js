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
exports.implement_GET_transaction_detail__id = implement_GET_transaction_detail__id;
const auth_1 = require("../../utils/auth");
const transactionItem_1 = require("../model/table/transactionItem");
function implement_GET_transaction_detail__id(engine) {
    engine.implement({
        endpoint: 'GET /transaction-detail/:id',
        fn(param) {
            return __awaiter(this, void 0, void 0, function* () {
                const { authorization } = param.headers;
                const user = yield (0, auth_1.verifyToken)(authorization);
                const { id } = param.paths; // transaction_id dari URL
                // Ambil semua transactionItem dari transaction tertentu
                const items = yield transactionItem_1.transactionItem.find({
                    where: { transaction_id: Number(id) },
                    order: { created_at: "DESC" }
                });
                // Mapping ke format flat
                return items.map(i => ({
                    id: i.id,
                    product_id: i.product_id,
                    transaction_id: i.transaction_id,
                    biaya_admin: i.biaya_admin.toString(),
                    qty: i.qty.toString(),
                    total: i.total.toString(),
                    created_at: i.created_at,
                }));
            });
        }
    });
}
