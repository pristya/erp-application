import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { Utility } from './Utility';
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator"
import { POST_register } from '../expressjs-aa/api/POST_register';
import { POST_login } from '../expressjs-aa/api/POST_login';
import { GET_product_list } from '../expressjs-aa/api/GET_product_list';
import { POST_add_product } from '../expressjs-aa/api/POST_add_product';
import { GET_product_detail__id } from '../expressjs-aa/api/GET_product_detail__id';
import { PUT_update_product__id } from '../expressjs-aa/api/PUT_update_product__id';
import { DELETE_delete_product__id } from '../expressjs-aa/api/DELETE_delete_product__id';
import { POST_add_transaction } from '../expressjs-aa/api/POST_add_transaction';
import { GET_transaction_list } from '../expressjs-aa/api/GET_transaction_list';
import { GET_transaction_detail__id } from '../expressjs-aa/api/GET_transaction_detail__id';
import { DELETE_transaction_delete__id } from '../expressjs-aa/api/DELETE_transaction_delete__id';
import { POST_register_Req } from '../expressjs-aa/api/POST_register';
import { POST_login_Req } from '../expressjs-aa/api/POST_login';
import { GET_product_list_Req } from '../expressjs-aa/api/GET_product_list';
import { POST_add_product_Req } from '../expressjs-aa/api/POST_add_product';
import { GET_product_detail__id_Req } from '../expressjs-aa/api/GET_product_detail__id';
import { PUT_update_product__id_Req } from '../expressjs-aa/api/PUT_update_product__id';
import { DELETE_delete_product__id_Req } from '../expressjs-aa/api/DELETE_delete_product__id';
import { POST_add_transaction_Req } from '../expressjs-aa/api/POST_add_transaction';
import { GET_transaction_list_Req } from '../expressjs-aa/api/GET_transaction_list';
import { GET_transaction_detail__id_Req } from '../expressjs-aa/api/GET_transaction_detail__id';
import { DELETE_transaction_delete__id_Req } from '../expressjs-aa/api/DELETE_transaction_delete__id';

type Endpoints = POST_register
  | POST_login
  | GET_product_list
  | POST_add_product
  | GET_product_detail__id
  | PUT_update_product__id
  | DELETE_delete_product__id
  | POST_add_transaction
  | GET_transaction_list
  | GET_transaction_detail__id
  | DELETE_transaction_delete__id;
const classmap: any = {
  'POST /register': POST_register_Req,
  'POST /login': POST_login_Req,
  'GET /product-list': GET_product_list_Req,
  'POST /add-product': POST_add_product_Req,
  'GET /product-detail/:id': GET_product_detail__id_Req,
  'PUT /update-product/:id': PUT_update_product__id_Req,
  'DELETE /delete-product/:id': DELETE_delete_product__id_Req,
  'POST /add-transaction': POST_add_transaction_Req,
  'GET /transaction-list': GET_transaction_list_Req,
  'GET /transaction-detail/:id': GET_transaction_detail__id_Req,
  'DELETE /transaction-delete/:id': DELETE_transaction_delete__id_Req
}

export interface SystemParam {
  port?: number
  beforeStart?(): Promise<void>
}

export class ExpressAA {
  public express?: Express;

  public async init(param: SystemParam): Promise<ExpressAA> {
    if (param.beforeStart) {
      await param.beforeStart();
    }
    
    this.express = express();
    const port = param?.port ?? process.env.PORT ?? 3000;
    
    this.express.use(cors());
    this.express.use(express.json({limit: '5mb'}));
    this.express.set('trust proxy', true);
    this.express.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
    
    return this;
  }

  private errorToString(list_error: ValidationError[]): string {
    return list_error.map(err => {
      const children: ValidationError[] | undefined = err.children;
      if (children && children.length > 0) {
        return this.errorToString(children);
      }
      const constrains: any = err.constraints;
      const keys = Object.keys(constrains);
      return keys.filter(key => constrains[key].length > 0).map(key => constrains[key]).join(', ');
    }).join(', ');
  }

  public async implement(endpoint: Endpoints) {
    if (!this.express) {
      throw new Error('ExpressJS has not been initialized yet');
    }

    const [method, url_path] = endpoint.endpoint.toLowerCase().split(' ');
    if (method === 'post' || method === 'put' || method === 'patch' || method === 'delete' || method === 'get') {
      this.express[method](url_path, async (req: Request, res: Response) => {

        const request_parameter: any = plainToInstance(classmap[method.toUpperCase() + ' ' + url_path], {
          body: req.body,
          headers: req.headers,
          paths: req.params,
          query: req.query
        });
        
        try {
          function validPHQBName(instance?: any) {
            return ['post', 'patch', 'put', 'get', 'delete'].includes(instance?.constructor?.name.split('_')[0].toLowerCase());
          }

          if (validPHQBName(request_parameter.paths)) {
            await validateOrReject(request_parameter.paths);
          }
          if (validPHQBName(request_parameter.headers)) {
            await validateOrReject(request_parameter.headers);
          }
          if (validPHQBName(request_parameter.query)) {
            await validateOrReject(request_parameter.query);
          }
          if (validPHQBName(request_parameter.body)) {
            await validateOrReject(request_parameter.body);
          }
        } catch (err_validation: any) {
          res.status(400).send(this.errorToString(err_validation));
          return;
        }

        try {
          const result = await endpoint.fn({
            body: request_parameter.body,
            paths: request_parameter.paths,
            headers: request_parameter.headers,
            query: request_parameter.query
          } as any, x => x);
          res.status(200).json(result);
        } catch (err: any) {
          if (err instanceof Utility.ErrorParam) {
            res.status(err.code).json(err);
            return;
          }
          const err_msg = err.toString();
          if (/^s*d{3}s*:/.test(err_msg)) {
            const [err_code, msg] = err_msg.split(':');
            res.status(+err_code.trim()).send(msg);
            return;
          }
          res.status(500).send(err_msg);
        }
      });
    } else {
      throw new Error(`Method "${method} ${url_path}" unsupported.`);
    }
  }
}
