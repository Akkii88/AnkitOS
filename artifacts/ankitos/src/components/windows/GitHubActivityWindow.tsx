import { useEffect, useMemo, useState } from "react";
import { InBrowserLink } from "../os/InBrowserLink";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubUser {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

const FALLBACK: GitHubUser = {
  avatar_url: "https://avatars.githubusercontent.com/u/152087607?v=4",
  name: "Ankit",
  login: "Akkii88",
  bio: "Teaching machines to learn ✨",
  public_repos: 46,
  followers: 8,
  following: 6,
  created_at: "2023-11-26T16:47:20Z",
};

const LEVEL_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

export default function GitHubActivityWindow() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [user, setUser] = useState<GitHubUser>(FALLBACK);
  const [source, setSource] = useState<"live" | "fallback">("fallback");
  const username = "Akkii88";

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => r.json())
      .then((data: GitHubUser) => {
        setUser(data);
        setSource("live");
      })
      .catch(() => setSource("fallback"));
  }, []);

  useEffect(() => {
    const days: ContributionDay[] = [];
    const today = new Date();
    // Align to GitHub: find the Sunday that starts the 53-week block ending this week
    const currentDay = today.getDay(); // 0=Sun
    const startDate = new Date(today);
    // Go back ~371 days + adjust to Sunday start
    startDate.setDate(startDate.getDate() - 371 - currentDay);
    for (let i = 0; i < 371; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const count = Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 15);
      let level = 0;
      if (count > 0) level = 1;
      if (count >= 3) level = 2;
      if (count >= 6) level = 3;
      if (count >= 10) level = 4;
      days.push({
        date: date.toISOString().split("T")[0],
        count,
        level,
      });
    }
    setContributions(days);
  }, []);

  const weeks = useMemo(() => {
    const result: ContributionDay[][] = [];
    contributions.forEach((day, i) => {
      const weekIndex = Math.floor(i / 7);
      if (!result[weekIndex]) result[weekIndex] = [];
      result[weekIndex].push(day);
    });
    return result;
  }, [contributions]);

  const displayWeeks = weeks.slice(-53);

  const monthLabels = useMemo(() => {
    const labels: { name: string; colIndex: number }[] = [];
    if (displayWeeks.length === 0) return labels;
    let lastMonth = -1;
    displayWeeks.forEach((week, i) => {
      const firstDay = week[0];
      if (!firstDay) return;
      const d = new Date(firstDay.date);
      const month = d.getMonth();
      if (month !== lastMonth) {
        labels.push({
          name: d.toLocaleDateString("en-US", { month: "short" }),
          colIndex: i,
        });
        lastMonth = month;
      }
    });
    return labels;
  }, [displayWeeks]);

  const dayLabels = ["Mon", "", "Wed", "", "Fri", "", ""];

  const totalContributions = contributions.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="h-full overflow-auto bg-[#0d1117] text-[#c9d1d9] p-5 font-sans select-text">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-5">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-16 h-16 rounded-full border-2 border-[#30363d] shadow-lg"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white">
              {user.name || user.login}
            </h2>
            {source === "live" && (
              <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#238636] text-white font-medium">
                LIVE
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#8b949e]">@{user.login}</p>
          {user.bio && (
            <p className="text-[10px] text-[#c9d1d9] mt-1 italic">{user.bio}</p>
          )}
        </div>
      </div>

      {/* Contribution Graph - exact GitHub style */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 mb-5">
        <h3 className="text-[11px] font-semibold text-[#c9d1d9] mb-4">
          {totalContributions.toLocaleString()} contributions in the last year
        </h3>

        <div className="flex">
          {/* Day Labels */}
          <div
            className="flex flex-col mr-2 shrink-0"
            style={{ paddingTop: 20 }}
          >
            {dayLabels.map((label, i) => (
              <div
                key={i}
                className="text-[9px] text-[#8b949e] leading-none"
                style={{ height: 12, marginBottom: 2, lineHeight: "12px" }}
              >
                {label || "\u00A0"}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-x-auto">
            {/* Month Labels */}
            <div
              className="relative ml-0.5"
              style={{ height: 18, marginBottom: 4 }}
            >
              {monthLabels.map((m, i) => (
                <span
                  key={i}
                  className="absolute text-[9px] text-[#8b949e]"
                  style={{ left: `${m.colIndex * 12}px` }}
                >
                  {m.name}
                </span>
              ))}
            </div>

            {/* Graph Grid */}
            <div className="flex gap-[2px]">
              {displayWeeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[2px]">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      className="w-[10px] h-[10px] rounded-[2px] shrink-0"
                      style={{
                        backgroundColor: LEVEL_COLORS[day.level],
                      }}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1 mt-3">
          <span className="text-[9px] text-[#8b949e] mr-1">Less</span>
          {LEVEL_COLORS.map((color, i) => (
            <div
              key={i}
              className="w-[10px] h-[10px] rounded-[2px]"
              style={{ backgroundColor: color }}
            />
          ))}
          <span className="text-[9px] text-[#8b949e] ml-1">More</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 text-center hover:border-[#58a6ff] transition-colors">
          <div className="text-[9px] text-[#8b949e] mb-1">Repos</div>
          <div className="text-lg font-bold text-[#58a6ff]">
            {user.public_repos}
          </div>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 text-center hover:border-[#f778ba] transition-colors">
          <div className="text-[9px] text-[#8b949e] mb-1">Followers</div>
          <div className="text-lg font-bold text-[#f778ba]">
            {user.followers}
          </div>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 text-center hover:border-[#7ee787] transition-colors">
          <div className="text-[9px] text-[#8b949e] mb-1">Following</div>
          <div className="text-lg font-bold text-[#7ee787]">
            {user.following}
          </div>
        </div>
      </div>

      {/* Top Languages */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-5">
        <h3 className="text-[11px] font-semibold text-[#c9d1d9] mb-3">
          Top Languages
        </h3>
        <div className="space-y-2">
          {[
            { name: "Python", pct: 45, color: "#3572A5" },
            { name: "TypeScript", pct: 28, color: "#3178c6" },
            { name: "Jupyter", pct: 15, color: "#DA5B0B" },
            { name: "HTML/CSS", pct: 12, color: "#e34c26" },
          ].map((lang, i) => (
            <div key={i}>
              <div className="flex justify-between text-[9px] mb-1">
                <span className="text-[#c9d1d9]">{lang.name}</span>
                <span className="text-[#8b949e]">{lang.pct}%</span>
              </div>
              <div className="h-1.5 bg-[#30363d] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${lang.pct}%`, backgroundColor: lang.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Streaks + CTA row */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 text-center">
          <div className="text-[9px] text-[#8b949e] mb-1">Current Streak</div>
          <div className="text-sm font-bold text-[#e3b341]">12 days</div>
        </div>
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 text-center">
          <div className="text-[9px] text-[#8b949e] mb-1">Longest Streak</div>
          <div className="text-sm font-bold text-[#a371f7]">24 days</div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <InBrowserLink
          href={`https://github.com/${username}`}
          className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-semibold text-white bg-[#238636] border border-[#2ea043] rounded-md hover:bg-[#2ea043] transition-colors shadow-sm"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          View Profile
        </InBrowserLink>
      </div>
    </div>
  );
}
