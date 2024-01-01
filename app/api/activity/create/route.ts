import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config";
import { keyCheck } from "@/app/common";

export async function POST(request: NextRequest) {
    const req = await request.json();
    const key = req.key;
    const name = req.name;
    const start = req.start;
    const end = req.end;
    const introduce = req.introduce;
    const position = req.position;
    const takeaway = req.takeaway;
    const image = req.image;

    if (key && keyCheck(key)) {
        let conn = null;
        const query = `INSERT INTO activity(name, start, end, introduce, position, takeaway, image, isbackup) VALUES('${name}','${start}','${end}','${introduce}','${position}','${takeaway}','${image}',0), ('${name}','${start}','${end}','${introduce}','${position}','${takeaway}','${image}',1)`;
        try {
            conn = await connection.getConnection();
            const result = [await conn.query(query)];
            conn.release();

            // console.log("result : ", result);
            return NextResponse.json("create success", { status: 200 });
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
