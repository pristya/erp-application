import { Like } from "typeorm";
import { ExpressAA } from "../expressjs-aa/ExpressAA";
import { GET_product_list_Req } from '../expressjs-aa/api/GET_product_list';
import { product } from '../model/table/product'

export function implement_GET_product_list(engine: ExpressAA) {
  engine.implement({
    endpoint: 'GET /product-list',
    async fn(param: GET_product_list_Req): Promise<product[]> {
      // daftar produk
      const {limit, offset, search} = param.query;

      // filter pencarian kalau ada search
      const where: any = {};
      if (search) {
        where.nama = Like(`%${search}`);
      }

      // ambil data dengan pagination
      const products = await product.find({
        where,
        skip: offset ? Number(offset) : 0,
        take: limit ? Number(limit) : undefined,
        order: { created_at: "DESC"},
      })

      return products;
    }
  });
}
