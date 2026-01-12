import { AppDataSource } from "../../data-source";
import { ExpressAA } from "../expressjs-aa/ExpressAA";
import { POST_register_Req } from "../expressjs-aa/api/POST_register";
import { userRole } from "../model/enum/userRole";
import { user } from "../model/table/user";
import bcrypt from "bcrypt";

export function implement_POST_register(engine: ExpressAA) {
  engine.implement({
    endpoint: "POST /register",
    async fn(param: POST_register_Req): Promise<any> {
      const { username, password, nama_lengkap, nomor_hp } = param.body;

      const repo = AppDataSource.getRepository(user);

      // cek apakah username sudah dipakai
      const existing = await repo.findOne({ where: { username } });
      if (existing) {
        return Promise.reject({
          status: 400,
          message: "Username sudah dipakai",
        });
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // buat user baru
      const newUser = repo.create({
        username,
        password: hashedPassword,
        nama_lengkap,
        nomor_hp,
        created_at: new Date(),
        role: userRole.USER
      }); 

      await repo.save(newUser);

      return {
        success: true,
        message: "User registered successfully",
        userId: newUser.id,
      };
    },
  });
}
