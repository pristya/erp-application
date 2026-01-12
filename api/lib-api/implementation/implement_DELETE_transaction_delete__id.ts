import { verifyToken } from "../../utils/auth";
import { ExpressAA } from "../expressjs-aa/ExpressAA";
import { DELETE_transaction_delete__id_Req } from '../expressjs-aa/api/DELETE_transaction_delete__id';
import { transaction } from "../model/table/transaction";
import { transactionItem } from "../model/table/transactionItem";

export function implement_DELETE_transaction_delete__id(engine: ExpressAA) {
  engine.implement({
    endpoint: 'DELETE /transaction-delete/:id',
    async fn(param: DELETE_transaction_delete__id_Req): Promise<boolean> {
      const { authorization } = param.headers;
      const user_id = await verifyToken(authorization);

      const { id } = param.paths;

      // Cari transaksi yang mau dihapus dan pastikan milik user
      const found = await transaction.findOne({ where: { id: Number(id), user_id } });
      if (!found) return false; // ngga ada data atau bukan milik user

      // Hapus semua transactionItem terkait
      await transactionItem.delete({ transaction_id: found.id });

      // Hapus transaksi
      await transaction.delete({ id: found.id });

      return true;
    } 
  });
}
