import { Like, In } from "typeorm";
import { verifyToken } from "../../utils/auth";
import { ExpressAA } from "../expressjs-aa/ExpressAA";
import { GET_transaction_list_Req } from '../expressjs-aa/api/GET_transaction_list';
import { transactionItem } from "../model/table/transactionItem";
import { transaction } from "../model/table/transaction";

export function implement_GET_transaction_list(engine: ExpressAA) {
  engine.implement({
    endpoint: 'GET /transaction-list',
    async fn(param: GET_transaction_list_Req): Promise<transactionItem[]> {
      const { authorization } = param.headers;
      if (!authorization) throw new Error("Unauthorized");

      const rawToken = authorization.replace("Bearer", "").trim();
      const user_id = await verifyToken(rawToken);

      const { limit, offset } = param.query;

      // Ambil semua transaksi milik user
      const userTransactions = await transaction.find({
        where: { user_id },
        select: ["id"],
      });
      
      // Ambil semua transactionItem dari transaksi user
      const items = await transactionItem.find({
        relations: ['otm_transaction_id', 'otm_product_id'],
        order: { created_at: "DESC" },
        skip: offset ? Number(offset) : 0,
        take: limit ? Number(limit) : undefined,
      });

      return items;
    }
  });
}