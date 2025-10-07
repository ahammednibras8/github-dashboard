import { NextResponse } from "next/server";

export async function GET() {
    const query = `
        query {
            user(login: "ahammednibras8") {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                color
                                contributionCount
                                date
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
            body: JSON.stringify({ query }),
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch" }, { status: res.status });
        }

        const { data } = await res.json();

        const weeks = data.user.contributionsCollection.contributionCalendar.weeks;

        return NextResponse.json({
            weeks,
            total: data.user.contributionsCollection.contributionCalendar.totalContributions,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}