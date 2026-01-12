import { verifyToken } from "../../utils/auth";
import { ExpressAA } from "../expressjs-aa/ExpressAA";
import { POST_add_product_Req } from "../expressjs-aa/api/POST_add_product";
import { product } from "../model/table/product";

export function implement_POST_add_product(engine: ExpressAA) {
  engine.implement({
    endpoint: "POST /add-product",
    async fn(param: POST_add_product_Req): Promise<product> {
      const { authorization } = param.headers;
      const user = verifyToken(authorization);

      const { img, nama, deskripsi, unit, harga, stok } = param.body;

      // const foundProduct = await product.findOne({
      //   where: { nama }
      // });

      // if (!foundProduct) {
      //   throw new Error("Produk tidak tersedia!");
      // }

      const newProduct = new product();
      newProduct.img = img;
      newProduct.nama = nama;
      newProduct.deskripsi = deskripsi;
      newProduct.unit = unit;
      newProduct.harga = harga;
      newProduct.stok = stok;
      newProduct.created_at = new Date();
      await newProduct.save();

      return newProduct;
    },
  });
}
