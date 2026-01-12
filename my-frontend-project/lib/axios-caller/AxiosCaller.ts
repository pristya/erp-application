import axios, { AxiosInstance } from 'axios';
import { POST_register_Req } from '../axios-caller/api/POST_register';
import { POST_login_Req } from '../axios-caller/api/POST_login';
import { GET_product_list_Req } from '../axios-caller/api/GET_product_list';
import { POST_add_product_Req } from '../axios-caller/api/POST_add_product';
import { GET_product_detail__id_Req } from '../axios-caller/api/GET_product_detail__id';
import { PUT_update_product__id_Req } from '../axios-caller/api/PUT_update_product__id';
import { DELETE_delete_product__id_Req } from '../axios-caller/api/DELETE_delete_product__id';
import { POST_add_transaction_Req } from '../axios-caller/api/POST_add_transaction';
import { GET_transaction_list_Req } from '../axios-caller/api/GET_transaction_list';
import { GET_transaction_detail__id_Req } from '../axios-caller/api/GET_transaction_detail__id';
import { DELETE_transaction_delete__id_Req } from '../axios-caller/api/DELETE_transaction_delete__id';

import { AuthResponse } from '../ts-schema/AuthResponse'
import { product } from '../ts-model/table/product'
import { transactionItem } from '../ts-model/table/transactionItem'

export class AxiosCaller {
  public axios_instance: AxiosInstance | null = null;

  public call = {
    'POST /register': async (param: POST_register_Req): Promise<boolean> => {
      let clean_path = '/register';
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.post(clean_path, param.body, {
        
        
      })).data
    },
    'POST /login': async (param: POST_login_Req): Promise<AuthResponse> => {
      let clean_path = '/login';
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.post(clean_path, param.body, {
        
        
      })).data
    },
    'GET /product-list': async (param: GET_product_list_Req): Promise<product[]> => {
      let clean_path = '/product-list';
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.get(clean_path, {
        params: param.query,
        
      })).data
    },
    'POST /add-product': async (param: POST_add_product_Req): Promise<product> => {
      let clean_path = '/add-product';
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.post(clean_path, param.body, {
        
        headers: param.headers as any,
      })).data
    },
    'GET /product-detail/:id': async (param: GET_product_detail__id_Req): Promise<product> => {
      let clean_path = '/product-detail/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.get(clean_path, {
        
        headers: param.headers as any,
      })).data
    },
    'PUT /update-product/:id': async (param: PUT_update_product__id_Req): Promise<boolean> => {
      let clean_path = '/update-product/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.put(clean_path, param.body, {
        
        headers: param.headers as any,
      })).data
    },
    'DELETE /delete-product/:id': async (param: DELETE_delete_product__id_Req): Promise<boolean> => {
      let clean_path = '/delete-product/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.delete(clean_path, {
        
        headers: param.headers as any,
      })).data
    },
    'POST /add-transaction': async (param: POST_add_transaction_Req): Promise<transactionItem[]> => {
      let clean_path = '/add-transaction';
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.post(clean_path, param.body, {
        
        headers: param.headers as any,
      })).data
    },
    'GET /transaction-list': async (param: GET_transaction_list_Req): Promise<transactionItem[]> => {
      let clean_path = '/transaction-list';
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.get(clean_path, {
        params: param.query,
        headers: param.headers as any,
      })).data
    },
    'GET /transaction-detail/:id': async (param: GET_transaction_detail__id_Req): Promise<transactionItem[]> => {
      let clean_path = '/transaction-detail/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.get(clean_path, {
        
        headers: param.headers as any,
      })).data
    },
    'DELETE /transaction-delete/:id': async (param: DELETE_transaction_delete__id_Req): Promise<boolean> => {
      let clean_path = '/transaction-delete/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.delete(clean_path, {
        
        headers: param.headers as any,
      })).data
    }
  }

  constructor(base_url: string) {
    this.axios_instance = axios.create({ baseURL: base_url });
  }
}

