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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.implement_POST_login = implement_POST_login;
const user_1 = require("../model/table/user");
const token_1 = require("../model/table/token");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const TOKEN_EXPIRES_IN = "1h";
function implement_POST_login(engine) {
    engine.implement({
        endpoint: 'POST /login',
        fn(param) {
            return __awaiter(this, void 0, void 0, function* () {
                // login user dengan username dan password
                const { username, password } = param.body;
                // Cari user lewat found
                const foundUser = yield user_1.user.findOne({
                    where: { username }
                });
                if (!foundUser) {
                    throw new Error("Invalid username or password!");
                }
                // Cek password valid atau ngga
                const valid = yield bcrypt_1.default.compare(password, foundUser.password);
                if (!valid) {
                    throw new Error("Invalid username or password!");
                }
                // Generate JWT
                const jwtToken = jsonwebtoken_1.default.sign({ id: foundUser.id, username: foundUser.username }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
                // simpan token ke tabel token (pakai model token)
                const newToken = new token_1.token();
                newToken.user_id = foundUser.id;
                newToken.token = jwtToken;
                newToken.expired_at = new Date(Date.now() + 60 * 60 * 1000);
                yield newToken.save();
                return {
                    token: jwtToken,
                    role: foundUser.role,
                    username: foundUser.username,
                    nama_lengkap: foundUser.nama_lengkap
                };
            });
        }
    });
}
