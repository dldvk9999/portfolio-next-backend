import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config";
import { keyCheck, queryCheck } from "@/app/common";

export async function POST(request: NextRequest) {
    const req = await request.json();
    const key = req.key;
    const id = req.id;
    const name = req.name;
    const start = req.start;
    const end = req.end;
    const introduce = queryCheck(req.introduce);
    const stack = req.stack;
    const takeaway = queryCheck(req.takeaway);
    const image = req.image;

    if (key && keyCheck(key)) {
        let conn = null;
        const query = `UPDATE project SET name = '${name}', start = '${start}', end = '${end}', introduce = '${introduce}', stack = '${stack}', takeaway = '${takeaway}', image = '${image}' WHERE id = ${id} and isbackup = 0`;
        try {
            conn = await connection.getConnection();
            const result = [await conn.query(query)];
            conn.release();

            // console.log("result : ", result);
            return NextResponse.json("change success", { status: 200 });
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
