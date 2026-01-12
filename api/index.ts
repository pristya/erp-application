import { AppDataSource } from "./data-source";
import { ExpressAA, SystemParam } from "./lib-api/expressjs-aa/ExpressAA";
import { implement_DELETE_delete_product__id } from "./lib-api/implementation/implement_DELETE_delete_product__id";
import { implement_DELETE_transaction_delete__id } from "./lib-api/implementation/implement_DELETE_transaction_delete__id";
import { implement_GET_product_detail__id } from "./lib-api/implementation/implement_GET_product_detail__id";
import { implement_GET_product_list } from "./lib-api/implementation/implement_GET_product_list";
import { implement_GET_transaction_detail__id } from "./lib-api/implementation/implement_GET_transaction_detail__id";
import { implement_GET_transaction_list } from "./lib-api/implementation/implement_GET_transaction_list";
import { implement_POST_add_product } from "./lib-api/implementation/implement_POST_add_product";
import { implement_POST_add_transaction } from "./lib-api/implementation/implement_POST_add_transaction";
import { implement_POST_login } from "./lib-api/implementation/implement_POST_login";
import { implement_POST_register } from "./lib-api/implementation/implement_POST_register";
import { implement_PUT_update_product__id } from "./lib-api/implementation/implement_PUT_update_product__id";

const system_param: SystemParam = {
  port: 3001,
  async beforeStart() {
    await AppDataSource.initialize();
  },
};

new ExpressAA().init(system_param).then((e: ExpressAA) => {
    implement_GET_product_list(e)
    implement_POST_login(e)
    implement_POST_register(e)
    implement_POST_add_product(e)
    implement_GET_product_list(e)
    implement_GET_product_detail__id(e)
    implement_PUT_update_product__id(e)
    implement_DELETE_delete_product__id(e)
    implement_GET_transaction_detail__id(e)
    implement_DELETE_transaction_delete__id(e)
    implement_POST_add_transaction(e)
    implement_GET_transaction_list(e)
})