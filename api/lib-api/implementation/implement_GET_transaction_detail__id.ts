import { verifyToken } from "../../utils/auth";
import { ExpressAA } from "../expressjs-aa/ExpressAA";
import { GET_transaction_detail__id_Req } from '../expressjs-aa/api/GET_transaction_detail__id';
import { transactionItem } from "../model/table/transactionItem";

export function implement_GET_transaction_detail__id(engine: ExpressAA) {
  engine.implement({
    endpoint: 'GET /transaction-detail/:id',
    async fn(param: GET_transaction_detail__id_Req): Promise<any[]> {

            const { authorization } = param.headers;
            const user = await verifyToken(authorization);
      
      const { id } = param.paths; // transaction_id dari URL

      // Ambil semua transactionItem dari transaction tertentu
      const items = await transactionItem.find({
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
    }
  });
}
