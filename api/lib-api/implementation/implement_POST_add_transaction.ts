import { ExpressAA } from "../expressjs-aa/ExpressAA";
import { POST_add_transaction_Req } from "../expressjs-aa/api/POST_add_transaction";
import { product } from "../model/table/product";
import { transactionItem } from "../model/table/transactionItem";
import { verifyToken } from "../../utils/auth";
import { transaction } from "../model/table/transaction";

export function implement_POST_add_transaction(engine: ExpressAA) {
  engine.implement({
    endpoint: "POST /add-transaction",
    async fn(param: POST_add_transaction_Req): Promise<transactionItem[]> {
      const { authorization } = param.headers;
      if (!authorization) throw new Error("Unauthorized");

      const user_id = await verifyToken(authorization);

      // Pastikan body ada dan langsung destructure
      const body = param.body;
      if (!body) throw new Error("Data transaksi tidak lengkap");

      const { product_id, qty } = body;

      if (!product_id || !qty) {
        throw new Error("Data transaksi tidak lengkap");
      }

      // Cari produk
      const found = await product.findOne({ where: { id: product_id } });
      if (!found) throw new Error(`Produk ${product_id} tidak ditemukan`);
      if (found.stok < qty) throw new Error(`Stok tidak cukup untuk ${found.nama}`);

      // Buat transaksi
      const trx = await transaction
        .create({
          user_id,
          total_harga: 0,
          created_at: new Date(),
        })
        .save();

      // Kurangi stok
      found.stok -= qty;
      await found.save();

      const subtotal = qty * found.harga;

      // Simpan transaction item
      const trxItem = await transactionItem
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
      await trx.save();

      return [trxItem];
    },
  });
}
