import crypto from "crypto";
import keys from "@/app/key";

export function keyCheck(key: string) {
    return crypto.createHmac("sha256", keys.salt).update(key).digest("hex") === keys.masterKey;
}

export function queryCheck(data: string) {
    return data.replace(/"/g, '"').replace(/'/g, "\\'");
}
