import { verifyToken } from "../../utils/auth";
import { ExpressAA } from "../expressjs-aa/ExpressAA";
import { GET_product_detail__id_Req } from '../expressjs-aa/api/GET_product_detail__id';
import { product } from '../model/table/product'

export function implement_GET_product_detail__id(engine: ExpressAA) {
  engine.implement({
    endpoint: 'GET /product-detail/:id',
    async fn(param: GET_product_detail__id_Req): Promise<product> {
      
      const { authorization } = param.headers;
      const user = await verifyToken(authorization);

      const { id } = param.paths;

      // cari product berdasarkan id
      const foundProduct = await product.findOne({
        where: { id: Number(id) }
      });

      if (!foundProduct) {
        throw new Error("Product not found!");
      }
      return foundProduct;
    }
  });

  
}


