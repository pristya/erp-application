import { verifyToken } from "../../utils/auth";
import { ExpressAA } from "../expressjs-aa/ExpressAA";
import { DELETE_delete_product__id_Req } from '../expressjs-aa/api/DELETE_delete_product__id';
import { product } from "../model/table/product";

export function implement_DELETE_delete_product__id(engine: ExpressAA) {
  engine.implement({
    endpoint: 'DELETE /delete-product/:id',
    async fn(param: DELETE_delete_product__id_Req): Promise<boolean> {
      const { authorization } = param.headers;
      const user = await verifyToken(authorization);

      const { id } = param.paths;

      // cari product berdasarkan id
      const found = await product.findOne({ where: { id }});
      if (!found) {
        return false; // ngga ada data
      }

      // hapus product
      await product.remove(found);

      return true;
    }
  });
}
