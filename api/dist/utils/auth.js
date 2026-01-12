"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const token_1 = require("../lib-api/model/table/token");
function verifyToken(authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!authorization) {
            throw new Error("authorization header missing");
        }
        const rawToken = authorization.replace("Bearer", "");
        const userToken = yield token_1.token.findOne({
            where: { token: rawToken },
            relations: ["otm_user_id"],
        });
        if (!userToken) {
            throw new Error("invalid token");
        }
        if (new Date() > userToken.expired_at) {
            throw new Error("token expired");
        }
        return userToken.user_id;
    });
}
