import { verifyToken } from "../../utils/auth";
import { ExpressAA } from "../expressjs-aa/ExpressAA";
import { PUT_update_product__id_Req } from '../expressjs-aa/api/PUT_update_product__id';
import { product } from "../model/table/product";

export function implement_PUT_update_product__id(engine: ExpressAA) {
  engine.implement({
    endpoint: 'PUT /update-product/:id',
    async fn(param: PUT_update_product__id_Req): Promise<boolean> {

      const { authorization } = param.headers;
      const user = await verifyToken(authorization);

      const { id } = param.paths;
      const { img, nama, deskripsi, unit, harga, stok } = param.body;
      const foundProduct = await product.findOne({
        where: { id: Number(id) }
      });

      if (!foundProduct) {
        throw new Error("Product not found!");
      }

      // update field yang dikirim
      if (img !== undefined) foundProduct.img = img;
      if (nama !== undefined) foundProduct.nama = nama;
      if (deskripsi !== undefined) foundProduct.deskripsi = deskripsi;
      if (unit !== undefined) foundProduct.unit = unit;
      if (unit !== undefined) foundProduct.harga = harga;
      if (stok !== undefined) foundProduct.stok = stok;
      await foundProduct.save();

      return true;
    }
  });
}
