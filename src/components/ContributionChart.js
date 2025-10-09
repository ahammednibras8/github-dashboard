'use client';

import { useEffect, useMemo, useRef, useState } from "react";

export default function ContributionChart() {
    const [weeks, setWeeks] = useState([]);
    const [total, setTotal] = useState(0);
    const chartRef = useRef(null);
    const [visibleWeeksCount, setVisibleWeeksCount] = useState(52);

    const COLUMN_WIDTH_PX = 16;

    const calculateVisibleWeeks = () => {
        if (chartRef.current && weeks.length > 0) {
            const containerWidth = chartRef.current.clientWidth;
            const maxFit = Math.floor(containerWidth / COLUMN_WIDTH_PX);
            const newCount = Math.min(maxFit, weeks.length);
            if (newCount !== visibleWeeksCount) {
                setVisibleWeeksCount(Math.max(1, newCount));
            }
        }
    };

    useEffect(() => {
        fetch("/api/contributions")
            .then((res) => res.json())
            .then((data) => {
                setWeeks(data.weeks || []);
                setTotal(data.total || 0);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (weeks.length > 0) {
            const timer = setTimeout(() => {
                calculateVisibleWeeks();
            }, 0);
            window.addEventListener("resize", calculateVisibleWeeks);
            return () => {
                clearTimeout(timer);
                window.removeEventListener("resize", calculateVisibleWeeks);
            };
        }
    }, [weeks]);

    const displayedWeeks = useMemo(() => {
        return weeks.slice(weeks.length - visibleWeeksCount);
    }, [weeks, visibleWeeksCount]);

    const displayedTotalContributions = useMemo(() => {
        return displayedWeeks.reduce((weekSum, week) => {
            const weekContributions = week.contributionDays.reduce(
                (daySum, day) => daySum + day.contributionCount,
                0
            );
            return weekSum + weekContributions;
        }, 0);
    }, [displayedWeeks]);

    if (!weeks.length) {
        return (
            <div className="mt-8 w-full p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md animate-pulse">
                <p className="text-gray-500 dark:text-gray-400">
                    Loading contributions...
                </p>
            </div>
        );
    }

    // Map contribution count → Tailwind class
    const getLevelClass = (count) => {
        if (count === 0) return "bg-gray-200 dark:bg-gray-700";
        if (count < 5) return "bg-green-200 dark:bg-green-800";
        if (count < 10) return "bg-green-400 dark:bg-green-600";
        if (count < 20) return "bg-green-600 dark:bg-green-500";
        return "bg-green-800 dark:bg-green-400";
    };

    // Build month labels (only when month changes)
    const monthLabels = [];
    let lastMonth = "";
    displayedWeeks.forEach((week) => {
        const firstDay = new Date(week.contributionDays[0].date);
        const month = firstDay.toLocaleString("default", { month: "short" });
        if (month !== lastMonth) {
            monthLabels.push(month);
            lastMonth = month;
        } else {
            monthLabels.push("");
        }
    });

    const weekdayLabels = ["Mon", "Wed", "Fri"];

    return (
        <div className="mt-8 w-full p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Last {displayedWeeks.length} Weeks of Contributions ({displayedTotalContributions})
            </h2>

            {/* Month Labels */}
            <div className="ml-10 mb-2 flex space-x-[2px] text-xs text-gray-500 dark:text-gray-400">
                {monthLabels.map((month, idx) => (
                    <div key={idx} className="w-3 sm:w-3.5 text-center">
                        {month}
                    </div>
                ))}
            </div>

            <div className="flex">
                {/* Weekday Labels */}
                <div className="flex flex-col justify-between mr-2 text-xs text-gray-500 dark:text-gray-400">
                    {weekdayLabels.map((day, idx) => (
                        <div key={idx} className="h-3 sm:h-3.5">{day}</div>
                    ))}
                </div>

                {/* Contribution Grid */}
                <div ref={chartRef} className="w-full overflow-hidden">
                    <div className="flex space-x-[2px] justify-start">
                        {displayedWeeks.map((week, wIdx) => (
                            <div key={wIdx} className="flex flex-col space-y-[2px] flex-shrink-0">
                                {week.contributionDays.map((day, dIdx) => (
                                    <div
                                        key={dIdx}
                                        title={`${day.contributionCount} contributions on ${day.date}`}
                                        className={`
                      w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-sm
                      transition-transform hover:scale-125
                      ${getLevelClass(day.contributionCount)}
                    `}
                                    ></div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end mt-4 space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-700"></div>
                <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-800"></div>
                <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-600"></div>
                <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-500"></div>
                <div className="w-3 h-3 rounded-sm bg-green-800 dark:bg-green-400"></div>
                <span>More</span>
            </div>
        </div>
    );
}
