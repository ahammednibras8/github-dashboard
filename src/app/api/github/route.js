import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("https://api.github.com/users/ahammednibras8", {
            headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
            cache: "no-store",
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch" }, { status: res.status });
        }

        const data = await res.json();

        return NextResponse.json({
            avatar: data.avatar_url,
        });
    } catch (err) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}