'use client';

import { useEffect, useState } from "react";

export default function ContributionChart() {
    const [weeks, setWeeks] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetch("/api/contributions")
            .then((res) => res.json())
            .then((data) => {
                setWeeks(data.weeks || []);
                setTotal(data.total || 0);
            })
            .catch(console.error);
    }, []);

    if (!weeks.length) {
        return (
            <div className="mt-8 w-full max-w-4xl">
                <p className="text-gray-500 dark:text-gray-400">Loading contributions...</p>
            </div>
        )
    }

    return (
        <div className="mt-10 w-full max-w-4xl">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Last 12 Months Contributions ({total})
            </h2>
            <div className="overflow-x-auto">
                <div className="flex space-x-[2px]">
                    {weeks.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col space-y-[2px]">
                            {week.contributionDays.map((day, dIdx) => (
                                <div
                                    key={dIdx}
                                    title={`${day.contributionCount} contributions on ${day.date}`}
                                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-sm transition-transform hover:scale-125"
                                    style={{ backgroundColor: day.color || "#ebedf0" }}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}