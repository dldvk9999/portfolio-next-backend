import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config";
import { keyCheck } from "@/app/common";

export async function POST(request: NextRequest) {
    const req = await request.json();
    const key = req.key;

    if (key && keyCheck(key)) {
        let conn = null;
        try {
            conn = await connection.getConnection();
            const result = [await conn.query("select * from about limit 1")];
            conn.release();

            // console.log("result : ", result);
            return NextResponse.json({ length: result.length, data: result }, { status: 200 });
        } catch (e) {
            if (conn) {
                conn.release();
            }

            // console.log("err : ", e);
            return NextResponse.json(e, { status: 500 });
        }
    } else if (typeof key === "string") {
        return NextResponse.json({ message: "key is not correct" }, { status: 500 });
    } else {
        return NextResponse.json({ message: "key must be string" }, { status: 500 });
    }
}

export async function OPTIONS(request: NextRequest) {
    const result = NextResponse.json({ message: "OPTIONS Method test!!!" }, { status: 200 });
    result.headers.set("Access-Control-Allow-Origin", "*");
    result.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    result.headers.set(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    return result;
}
