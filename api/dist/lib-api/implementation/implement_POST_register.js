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
exports.implement_POST_register = implement_POST_register;
const data_source_1 = require("../../data-source");
const userRole_1 = require("../model/enum/userRole");
const user_1 = require("../model/table/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
function implement_POST_register(engine) {
    engine.implement({
        endpoint: "POST /register",
        fn(param) {
            return __awaiter(this, void 0, void 0, function* () {
                const { username, password, nama_lengkap, nomor_hp } = param.body;
                const repo = data_source_1.AppDataSource.getRepository(user_1.user);
                // cek apakah username sudah dipakai
                const existing = yield repo.findOne({ where: { username } });
                if (existing) {
                    return Promise.reject({
                        status: 400,
                        message: "Username sudah dipakai",
                    });
                }
                // hash password
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                // buat user baru
                const newUser = repo.create({
                    username,
                    password: hashedPassword,
                    nama_lengkap,
                    nomor_hp,
                    created_at: new Date(),
                    role: userRole_1.userRole.USER
                });
                yield repo.save(newUser);
                return {
                    success: true,
                    message: "User registered successfully",
                    userId: newUser.id,
                };
            });
        },
    });
}
