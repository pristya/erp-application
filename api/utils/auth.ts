import { user } from "../lib-api/model/table/user";
import { token } from "../lib-api/model/table/token";

export async function verifyToken(authorization: string) {
    if (!authorization) {
        throw new Error("authorization header missing");
    }
    
    const rawToken = authorization.replace("Bearer", "");

    const userToken = await token.findOne({
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
}