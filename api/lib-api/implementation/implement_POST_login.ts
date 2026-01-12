import { ExpressAA } from "../expressjs-aa/ExpressAA";
import { POST_login_Req } from '../expressjs-aa/api/POST_login';
import { user } from "../model/table/user";
import { AuthResponse } from '../ts-schema/AuthResponse';
import { token } from "../model/table/token";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "secret";
const TOKEN_EXPIRES_IN = "1h";

export function implement_POST_login(engine: ExpressAA) {
  engine.implement({
    endpoint: 'POST /login',
    async fn(param: POST_login_Req): Promise<AuthResponse> {
      // login user dengan username dan password
      const { username, password} = param.body;
      
      // Cari user lewat found
      const foundUser = await user.findOne({
        where: { username }
      });

      if (!foundUser) {
        throw new Error("Invalid username or password!");
      }

      // Cek password valid atau ngga
      const valid = await bcrypt.compare(password, foundUser.password);

      if (!valid) {
        throw new Error("Invalid username or password!");
      }

// Generate JWT
const jwtToken = jwt.sign(
  { id: foundUser.id, username: foundUser.username },
  JWT_SECRET,
  { expiresIn: TOKEN_EXPIRES_IN }
);

// simpan token ke tabel token (pakai model token)
const newToken = new token();
newToken.user_id = foundUser.id;
newToken.token = jwtToken;
newToken.expired_at = new Date(Date.now() + 60 * 60 * 1000);
await newToken.save();

return {
  token: jwtToken,
  role: foundUser.role,
  username: foundUser.username,
  nama_lengkap: foundUser.nama_lengkap
};
    }
  });
}

