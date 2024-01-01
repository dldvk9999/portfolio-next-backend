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
            const result = [await conn.query("select * from githubapi limit 1")];
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
