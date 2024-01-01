import { NextRequest, NextResponse } from "next/server";
import connection from "@/app/config";
import { keyCheck } from "@/app/common";

export async function POST(request: NextRequest) {
    const req = await request.json();
    const key = req.key;
    const name = req.name;
    const birth = req.birth;
    const lastgraduate = req.lastgraduate;
    const isnew = req.isnew;
    const tel = req.tel;
    const email = req.email;
    const blog = req.blog;
    const github = req.github;
    const certification = req.certification;
    const frontend = req.frontend;
    const backend = req.backend;
    const language = req.language;
    const versioncontrol = req.versioncontrol;
    const deployment = req.deployment;
    const communication = req.communication;
    const platform = req.platform;

    if (key && keyCheck(key)) {
        let conn = null;
        const query = `UPDATE about SET name = '${name}', birth = '${birth}', lastgraduate = '${lastgraduate}', isnew = ${isnew}, tel = '${tel}', email = '${email}', blog = '${blog}', github = '${github}', certification = '${certification}', frontend = '${frontend}', backend = '${backend}', language = '${language}', versioncontrol = '${versioncontrol}', deployment = '${deployment}', communication = '${communication}', platform = '${platform}' WHERE id = 1`;
        try {
            conn = await connection.getConnection();
            const result = [await conn.query(query)];
            conn.release();

            // console.log("result : ", result);
            return NextResponse.json("update success", { status: 200 });
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
