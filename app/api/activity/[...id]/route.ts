import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config";
import { keyCheck } from "@/app/common";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
    const req = await request.json();
    const key = req.key;
    const id = params.id[0];

    if (key && keyCheck(key)) {
        let conn = null;
        const query = `DELETE FROM activity WHERE id = ${id} and isbackup = 0`;
        try {
            conn = await connection.getConnection();
            const result = [await conn.query(query)];
            conn.release();

            // console.log("result : ", result);
            return NextResponse.json("delete success", { status: 200 });
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
