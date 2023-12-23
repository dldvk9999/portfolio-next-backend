import { NextResponse } from "next/server";

export async function GET(request: any) {
    return NextResponse.json({ message: "Hello site !!!" }, { status: 200 });
};
