import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [userRes, orgsRes] = await Promise.all([
            fetch("https://api.github.com/user", {
                headers: {
                    Authorization: `token ${process.env.GITHUB_TOKEN}`,
                    'User-Agent': 'Ahammed-Nibras-Portfolio'
                },
                cache: "no-store",
            }),
            fetch("https://api.github.com/user/orgs", {
                headers: {
                    Authorization: `token ${process.env.GITHUB_TOKEN}`,
                    'User-Agent': 'Ahammed-Nibras-Portfolio'
                },
                cache: "no-store"
            })
        ]);

        if (!userRes.ok) {
            console.error("GitHub User Fetch failed:", userRes.status, await userRes.text());
            return NextResponse.json(
                { error: "Failed to fetch user data from GitHub" },
                { status: userRes.status }
            );
        }

        const data = await userRes.json();
        const orgs = orgsRes.ok ? await orgsRes.json() : [];

        return NextResponse.json({
            avatar: data.avatar_url,
            name: data.name,
            handle: data.login,
            bio: data.bio,
            blog: data.blog,
            x: data.twitter_username,
            github: data.html_url,
            orgs: orgs.map(org => ({
                login: org.login,
                avatar: org.avatar_url,
                url: `https://www.github.com/${org.login}`
            }))
        })
    } catch (err) {
        console.error("Internal API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}