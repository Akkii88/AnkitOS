import { useState, useEffect, useCallback } from "react";
import type { ReactElement } from "react";
import Wallpaper from "../components/os/Wallpaper";
import DesktopIcon from "../components/os/DesktopIcon";
import Taskbar from "../components/os/Taskbar";
import Window from "../components/os/Window";
import { BrowserContext, isLinkedIn } from "../components/os/BrowserContext";
import { TaskbarProvider } from "../components/os/TaskbarContext";
import SearchOverlay from "../components/os/SearchOverlay";
import ProjectsWindow from "../components/windows/ProjectsWindow";
import SkillsWindow from "../components/windows/SkillsWindow";
import TerminalWindow from "../components/windows/TerminalWindow";
import SqlStudioWindow from "../components/windows/SqlStudioWindow";
import ResearchWindow from "../components/windows/ResearchWindow";
import CertificationsWindow from "../components/windows/CertificationsWindow";
import ResumeWindow from "../components/windows/ResumeWindow";
import ContactWindow from "../components/windows/ContactWindow";
import AboutWindow from "../components/windows/AboutWindow";
import MiniGameWindow from "../components/windows/MiniGameWindow";
import RecycleBinWindow from "../components/windows/RecycleBinWindow";
import BlogWindow from "../components/windows/BlogWindow";
import GitHubActivityWindow from "../components/windows/GitHubActivityWindow";
import MusicWindow from "../components/windows/MusicWindow";
import AnalyticsDashboardWindow from "../components/windows/AnalyticsDashboardWindow";
import CaseStudiesWindow from "../components/windows/CaseStudiesWindow";
import SettingsWindow from "../components/windows/SettingsWindow";
import PersonalizeWindow from "../components/windows/PersonalizeWindow";
import BrowserWindow from "../components/windows/BrowserWindow";

interface DesktopProps {
  profile: "aiml" | "analyst";
  onLogout: () => void;
}

interface WindowState {
  id: string;
  type: string;
  title: string;
  zIndex: number;
  offsetX: number;
  offsetY: number;
}

const ICON_START_X = 20;
const ICON_START_Y = 20;
const ICON_COLS = 3;
const ICON_GAP_X = 110;
const ICON_GAP_Y = 120;
const ICON_SIZE_DESKTOP = 96;

function IconBase({
  children,
  size = 96,
}: {
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <IconBase>
      <rect x="8" y="8" width="80" height="80" rx="18" fill="#8B9CF7" />
      <rect x="20" y="24" width="24" height="40" rx="6" fill="white" />
      <rect x="52" y="32" width="24" height="32" rx="6" fill="white" />
      <rect
        x="20"
        y="68"
        width="12"
        height="4"
        rx="2"
        fill="#E8D5B0"
        opacity="0.8"
      />
      <rect
        x="40"
        y="68"
        width="12"
        height="4"
        rx="2"
        fill="#E8D5B0"
        opacity="0.8"
      />
      <rect
        x="60"
        y="68"
        width="12"
        height="4"
        rx="2"
        fill="#E8D5B0"
        opacity="0.8"
      />
    </IconBase>
  );
}

function TerminalIcon() {
  return (
    <IconBase>
      <rect x="8" y="8" width="80" height="80" rx="16" fill="#1A1D23" />
      <rect x="8" y="8" width="80" height="16" rx="6" fill="#252830" />
      <circle cx="20" cy="16" r="4" fill="#FF5F57" />
      <circle cx="36" cy="16" r="4" fill="#FEBC2E" />
      <circle cx="52" cy="16" r="4" fill="#28C840" />
      <rect x="20" y="36" width="8" height="8" fill="#34D399" />
      <path
        d="M36 40 L60 40 L48 56 L80 56"
        stroke="white"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="20" y="68" width="60" height="4" rx="2" fill="#4B5563" />
      <rect x="20" y="80" width="48" height="4" rx="2" fill="#374151" />
    </IconBase>
  );
}

function SkillsIcon() {
  return (
    <IconBase>
      <rect x="8" y="8" width="80" height="80" rx="16" fill="#1E293B" />
      <rect x="24" y="60" width="10" height="24" rx="4" fill="#F97316" />
      <rect x="40" y="44" width="10" height="40" rx="4" fill="#EAB308" />
      <rect x="56" y="28" width="10" height="56" rx="4" fill="#E8832A" />
    </IconBase>
  );
}

function ResumeIcon() {
  return (
    <IconBase>
      <rect x="16" y="8" width="64" height="80" rx="10" fill="white" />
      <rect x="16" y="8" width="64" height="14" rx="6" fill="#2563EB" />
      <rect x="28" y="30" width="40" height="4" rx="2" fill="#1E293B" />
      <rect x="28" y="40" width="32" height="4" rx="2" fill="#64748B" />
      <rect x="28" y="50" width="40" height="4" rx="2" fill="#1E293B" />
      <rect x="28" y="60" width="28" height="4" rx="2" fill="#64748B" />
      <rect x="28" y="72" width="36" height="4" rx="2" fill="#CBD5E1" />
    </IconBase>
  );
}

function ResearchIcon() {
  return (
    <IconBase>
      <rect x="8" y="8" width="80" height="80" rx="12" fill="white" />
      <rect x="16" y="16" width="64" height="44" rx="8" fill="#F1F5F9" />
      <circle
        cx="48"
        cy="38"
        r="14"
        fill="none"
        stroke="#64748B"
        strokeWidth="3"
      />
      <line
        x1="48"
        y1="24"
        x2="48"
        y2="52"
        stroke="#64748B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="34"
        y1="38"
        x2="62"
        y2="38"
        stroke="#64748B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="16" y="66" width="64" height="4" rx="2" fill="#E2E8F0" />
      <rect x="16" y="76" width="48" height="4" rx="2" fill="#E2E8F0" />
    </IconBase>
  );
}

function AboutIcon() {
  return (
    <IconBase>
      <rect x="8" y="8" width="80" height="80" rx="40" fill="#34D399" />
      <circle cx="48" cy="34" r="14" fill="white" />
      <path d="M20 80 C20 56 76 56 76 80" fill="white" />
    </IconBase>
  );
}

function GameIcon() {
  return (
    <IconBase>
      <rect x="8" y="16" width="80" height="64" rx="14" fill="#7C3AED" />
      <circle cx="36" cy="48" r="14" fill="#FDE047" />
      <circle cx="68" cy="48" r="14" fill="#FDE047" />
      <rect x="52" y="40" width="8" height="8" rx="3" fill="#7C3AED" />
      <rect x="52" y="60" width="8" height="8" rx="3" fill="#7C3AED" />
    </IconBase>
  );
}

function CertIcon() {
  return (
    <IconBase>
      <rect x="12" y="16" width="72" height="64" rx="10" fill="#F59E0B" />
      <rect x="12" y="16" width="72" height="12" rx="4" fill="#EAB308" />
      <circle cx="48" cy="52" r="14" fill="white" />
      <polygon points="48,40 56,52 48,64 40,52" fill="#F59E0B" />
    </IconBase>
  );
}

function BlogIcon() {
  return (
    <IconBase>
      <rect x="8" y="8" width="80" height="80" rx="12" fill="#0D9488" />
      <rect x="16" y="16" width="64" height="52" rx="8" fill="#CCFBF1" />
      <rect x="28" y="32" width="40" height="4" rx="2" fill="#0F172A" />
      <rect x="28" y="44" width="32" height="4" rx="2" fill="#0F172A" />
      <rect x="28" y="56" width="40" height="4" rx="2" fill="#0F172A" />
      <circle
        cx="76"
        cy="72"
        r="10"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="3"
      />
      <path
        d="M76 62 L76 82 M66 72 L86 72"
        stroke="#F59E0B"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

function ContactIcon() {
  return (
    <IconBase>
      <rect x="8" y="12" width="80" height="72" rx="12" fill="#DB2777" />
      <path d="M8 32 L48 56 L88 32" fill="#FCE7F3" />
      <rect x="28" y="44" width="8" height="8" rx="4" fill="#1D1D1F" />
      <rect x="36" y="44" width="8" height="8" rx="4" fill="#1D1D1F" />
      <path
        d="M28 64 Q48 78 68 64"
        stroke="#1D1D1F"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

function GitHubIcon() {
  return (
    <IconBase>
      <rect x="8" y="8" width="80" height="80" rx="40" fill="#1E293B" />
      <path
        d="M48 28 C38 28 30 34 30 42 C30 48 34 52 38 54 C38 54 36 56 36 62 C36 66 40 70 48 70 C56 70 60 66 60 62 C60 56 58 54 58 54 C62 52 66 48 66 42 C66 34 58 28 48 28 Z M40 38 C44 38 44 42 44 42 C44 42 45 40 48 40 C51 40 52 42 52 42 C52 42 52 38 56 38 C56 38 50 46 48 46 C46 46 40 38 40 38 Z"
        fill="#F1F5F9"
      />
      <circle cx="42" cy="42" r="4" fill="#1E293B" />
      <circle cx="54" cy="42" r="4" fill="#1E293B" />
    </IconBase>
  );
}

function MusicIcon() {
  return (
    <IconBase>
      <rect x="8" y="8" width="80" height="80" rx="16" fill="#8B5CF6" />
      <circle cx="36" cy="68" r="14" fill="#FEF3C7" />
      <circle cx="68" cy="60" r="14" fill="#FEF3C7" />
      <rect x="48" y="20" width="8" height="48" rx="4" fill="#DDD6FE" />
      <rect x="80" y="12" width="8" height="40" rx="4" fill="#DDD6FE" />
    </IconBase>
  );
}

function DashboardIcon() {
  return (
    <IconBase>
      <rect x="8" y="8" width="80" height="80" rx="12" fill="#0EA5E9" />
      <rect x="16" y="56" width="24" height="28" rx="8" fill="white" />
      <rect x="48" y="36" width="24" height="48" rx="8" fill="white" />
      <rect x="72" y="16" width="10" height="68" rx="5" fill="#FBBF24" />
      <path
        d="M20 56 L40 40 L60 48 L80 16"
        stroke="white"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

function CasesIcon() {
  return (
    <IconBase>
      <rect x="8" y="8" width="80" height="80" rx="12" fill="#059669" />
      <rect x="16" y="16" width="64" height="18" rx="6" fill="#D1FAE5" />
      <rect
        x="16"
        y="42"
        width="64"
        height="4"
        rx="2"
        fill="#1F2937"
        opacity="0.5"
      />
      <rect x="16" y="56" width="48" height="4" rx="2" fill="#374151" />
      <rect x="16" y="70" width="64" height="4" rx="2" fill="#374151" />
    </IconBase>
  );
}

function TrashIcon() {
  return (
    <IconBase>
      <rect x="16" y="20" width="64" height="68" rx="10" fill="#6B7280" />
      <rect x="16" y="20" width="64" height="14" rx="6" fill="#9CA3AF" />
      <rect x="40" y="8" width="16" height="12" rx="4" fill="#9CA3AF" />
      <rect x="32" y="44" width="12" height="44" rx="4" fill="#1F2937" />
      <rect x="52" y="44" width="12" height="44" rx="4" fill="#1F2937" />
      <rect x="28" y="58" width="40" height="4" rx="2" fill="#EF4444" />
      <rect x="28" y="70" width="40" height="4" rx="2" fill="#EF4444" />
      <rect x="32" y="82" width="32" height="4" rx="2" fill="#EF4444" />
    </IconBase>
  );
}

function SqlIcon() {
  return (
    <IconBase>
      <rect x="8" y="6" width="80" height="84" rx="12" fill="#0F172A" />
      <rect x="16" y="14" width="64" height="68" rx="8" fill="#1E293B" />
      <text
        x="48"
        y="42"
        textAnchor="middle"
        fill="#0EA5E9"
        fontSize="12"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
      >
        SQL
      </text>
      <rect x="24" y="52" width="48" height="4" rx="2" fill="#0EA5E9" />
      <rect x="24" y="62" width="40" height="4" rx="2" fill="#334155" />
      <rect x="24" y="72" width="44" height="4" rx="2" fill="#334155" />
    </IconBase>
  );
}

function BrowserIcon() {
  return (
    <IconBase>
      <rect x="8" y="8" width="80" height="80" rx="16" fill="#2563EB" />
      <rect x="8" y="8" width="80" height="14" rx="6" fill="#3B82F6" />
      <circle cx="22" cy="15" r="4" fill="#FF5F57" />
      <circle cx="38" cy="15" r="4" fill="#FEBC2E" />
      <circle cx="54" cy="15" r="4" fill="#28C840" />
      <rect
        x="16"
        y="32"
        width="64"
        height="6"
        rx="3"
        fill="white"
        opacity="0.9"
      />
      <rect
        x="16"
        y="46"
        width="64"
        height="6"
        rx="3"
        fill="white"
        opacity="0.6"
      />
      <rect
        x="16"
        y="60"
        width="64"
        height="6"
        rx="3"
        fill="white"
        opacity="0.35"
      />
    </IconBase>
  );
}

export default function Desktop({ profile, onLogout }: DesktopProps) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [topZ, setTopZ] = useState(100);
  const [windowMenuPos, setWindowMenuPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [iconsSort, setIconsSort] = useState<"asc" | "desc" | "default">(
    "default",
  );
  const [iconSize, setIconSize] = useState<48 | 56 | 40>(48);

  const [notifications, setNotifications] = useState<
    Array<{ id: string; text: string; time: string }>
  >([]);
  const [language, setLanguage] = useState("EN");
  const [searchOpen, setSearchOpen] = useState(false);

  const music = {
    isPlaying: false,
    currentTrack: null as number | null,
    trackInfo: null as { title: string; artist: string } | null,
    play: () => {},
    pause: () => {},
    next: () => {},
    prev: () => {},
  };

  const openBrowserUrl = (url: string) => {
    openWindow("browser", "browser", "Web Browser");
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("browser-navigate", { detail: { url } }),
      );
    }, 150);
  };

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setWindowMenuPos({ x: e.clientX, y: e.clientY });
    setSelectedIcon(null);
  };

  const closeWindowMenu = () => setWindowMenuPos(null);

  const bumpZ = () => {
    setTopZ((z) => z + 1);
    return topZ + 1;
  };

  const openWindow = (id: string, type: string, title: string) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        const z = topZ + 1;
        setTopZ(z);
        return prev.map((w) => (w.id === id ? { ...w, zIndex: z } : w));
      }
      const z = topZ + 1;
      setTopZ(z);
      const offset = prev.length * 28;
      return [
        ...prev,
        { id, type, title, zIndex: z, offsetX: offset, offsetY: offset },
      ];
    });
  };

  const closeWindow = (id: string) =>
    setWindows((prev) => prev.filter((w) => w.id !== id));

  const focusWindow = (id: string) => {
    const z = topZ + 1;
    setTopZ(z);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: z } : w)),
    );
  };

  const openResume = () => {
    const title = profile === "aiml" ? "AI/ML Resume" : "Data Analyst Resume";
    openWindow("resume", "resume", title);
  };

  const handleRefresh = () => {
    setIconsSort("default");
    setIconSize(48);
    setSelectedIcon(null);
    setTopZ(100);
    setWindows([]);
    closeWindowMenu();
  };

  const handleOpenInTerminal = () => {
    openWindow("terminal", "terminal", "Terminal");
    closeWindowMenu();
  };

  const handleDisplaySettings = () => {
    openWindow("settings", "settings", "Settings");
    closeWindowMenu();
  };

  const handlePersonalize = () => {
    openWindow("personalize", "personalize", "Personalize");
    closeWindowMenu();
  };

  const handleSortBy = () => {
    setIconsSort((prev) => {
      if (prev === "default") return "asc";
      if (prev === "asc") return "desc";
      return "default";
    });
    closeWindowMenu();
  };

  const handleView = () => {
    setIconSize((prev) => {
      if (prev === 48) return 56;
      if (prev === 56) return 40;
      return 48;
    });
    closeWindowMenu();
  };

  const handlePaste = () => {
    closeWindowMenu();
  };

  const focusWindowById = useCallback((id: string) => {
    setWindows((prev) => {
      const idx = prev.findIndex((w) => w.id === id);
      if (idx === -1) return prev;
      const next = [...prev];
      const [win] = next.splice(idx, 1);
      next.push(win);
      return next;
    });
    setSearchOpen(false);
  }, []);

  const minimizeAll = useCallback(() => {
    setWindows([]);
  }, []);

  const addNotification = useCallback((text: string) => {
    const id = Date.now().toString();
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setNotifications((prev) => [...prev.slice(-9), { id, text, time }]);
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((l) => (l === "EN" ? "IN" : "EN"));
  }, []);

  const handleSearch = useCallback(() => {
    setSearchOpen(true);
  }, []);

  const weather = { temp: "28°C", icon: "🌤", location: "Gurugram" };
  const wifi = true;
  const battery = 85;

  const makeIcon = (
    id: string,
    label: string,
    title: string,
    icon: ReactElement,
    action: () => void,
    idx: number,
  ) => ({
    id,
    label,
    title,
    icon,
    action,
    defaultX: ICON_START_X + (idx % ICON_COLS) * ICON_GAP_X,
    defaultY: ICON_START_Y + Math.floor(idx / ICON_COLS) * ICON_GAP_Y,
  });

  const AIML_ICONS = [
    makeIcon(
      "projects",
      "Projects",
      "AI/ML Projects",
      <ProjectsIcon />,
      () => openWindow("projects", "projects", "AI/ML Projects"),
      0,
    ),

    makeIcon(
      "terminal",
      "Terminal",
      "Terminal",
      <TerminalIcon />,
      () => openWindow("terminal", "terminal", "Terminal"),
      1,
    ),

    makeIcon(
      "skills",
      "Skills",
      "Skills",
      <SkillsIcon />,
      () => openWindow("skills", "skills", "Skills"),
      2,
    ),

    makeIcon("resume", "Resume", "Resume", <ResumeIcon />, openResume, 3),

    makeIcon(
      "research",
      "Research",
      "Research Papers",
      <ResearchIcon />,
      () => openWindow("research", "research", "Research Papers"),
      4,
    ),

    makeIcon(
      "about",
      "About",
      "About Ankit",
      <AboutIcon />,
      () => openWindow("about", "about", "About Ankit"),
      5,
    ),

    makeIcon(
      "game",
      "Mini Game",
      "Debug the Model",
      <GameIcon />,
      () => openWindow("game", "game", "Debug the Model"),
      6,
    ),

    makeIcon(
      "certs",
      "Certifications",
      "Certifications",
      <CertIcon />,
      () => openWindow("certs", "certs", "Certifications"),
      7,
    ),

    makeIcon(
      "blog",
      "Blog",
      "Technical Blog",
      <BlogIcon />,
      () => openWindow("blog", "blog", "Technical Blog"),
      8,
    ),

    makeIcon(
      "contact",
      "Contact",
      "Contact Ankit",
      <ContactIcon />,
      () => openWindow("contact", "contact", "Contact Ankit"),
      9,
    ),

    makeIcon(
      "github",
      "GitHub",
      "GitHub Activity",
      <GitHubIcon />,
      () => openWindow("github", "github", "GitHub Activity"),
      10,
    ),

    makeIcon(
      "music",
      "Music",
      "Chill Lofi",
      <MusicIcon />,
      () => openWindow("music", "music", "Chill Lofi"),
      11,
    ),

    makeIcon(
      "dashboard",
      "Dashboard",
      "Analytics Dashboard",
      <DashboardIcon />,
      () => openWindow("dashboard", "dashboard", "Analytics Dashboard"),
      12,
    ),

    makeIcon(
      "cases",
      "Case Studies",
      "Case Studies",
      <CasesIcon />,
      () => openWindow("cases", "cases", "Case Studies"),
      13,
    ),

    makeIcon(
      "recycle",
      "Recycle Bin",
      "Recycle Bin",
      <TrashIcon />,
      () => openWindow("recycle", "recycle", "Recycle Bin"),
      14,
    ),

    makeIcon(
      "browser",
      "Browser",
      "Web Browser",
      <BrowserIcon />,
      () => openWindow("browser", "browser", "Web Browser"),
      15,
    ),
  ];

  const ANALYST_ICONS = [
    makeIcon(
      "projects",
      "Projects",
      "Data Analyst Projects",
      <ProjectsIcon />,
      () => openWindow("projects", "projects", "Data Analyst Projects"),
      0,
    ),

    makeIcon(
      "terminal",
      "Terminal",
      "Terminal",
      <TerminalIcon />,
      () => openWindow("terminal", "terminal", "Terminal"),
      1,
    ),

    makeIcon(
      "skills",
      "Skills",
      "Skills",
      <SkillsIcon />,
      () => openWindow("skills", "skills", "Skills"),
      2,
    ),

    makeIcon("resume", "Resume", "Resume", <ResumeIcon />, openResume, 3),

    makeIcon(
      "sql",
      "SQL Studio",
      "SQL Studio",
      <SqlIcon />,
      () => openWindow("sql", "sql", "SQL Studio"),
      4,
    ),

    makeIcon(
      "about",
      "About",
      "About Ankit",
      <AboutIcon />,
      () => openWindow("about", "about", "About Ankit"),
      5,
    ),

    makeIcon(
      "contact",
      "Contact",
      "Contact Ankit",
      <ContactIcon />,
      () => openWindow("contact", "contact", "Contact Ankit"),
      6,
    ),

    makeIcon(
      "certs",
      "Certifications",
      "Certifications",
      <CertIcon />,
      () => openWindow("certs", "certs", "Certifications"),
      7,
    ),

    makeIcon(
      "github",
      "GitHub",
      "GitHub Activity",
      <GitHubIcon />,
      () => openWindow("github", "github", "GitHub Activity"),
      8,
    ),

    makeIcon(
      "music",
      "Music",
      "Chill Lofi",
      <MusicIcon />,
      () => openWindow("music", "music", "Chill Lofi"),
      9,
    ),

    makeIcon(
      "dashboard",
      "Dashboard",
      "Analytics Dashboard",
      <DashboardIcon />,
      () => openWindow("dashboard", "dashboard", "Analytics Dashboard"),
      10,
    ),

    makeIcon(
      "cases",
      "Case Studies",
      "Case Studies",
      <CasesIcon />,
      () => openWindow("cases", "cases", "Case Studies"),
      11,
    ),

    makeIcon(
      "recycle",
      "Recycle Bin",
      "Recycle Bin",
      <TrashIcon />,
      () => openWindow("recycle", "recycle", "Recycle Bin"),
      12,
    ),

    makeIcon(
      "browser",
      "Browser",
      "Web Browser",
      <BrowserIcon />,
      () => openWindow("browser", "browser", "Web Browser"),
      13,
    ),
  ];

  const icons = profile === "aiml" ? [...AIML_ICONS] : [...ANALYST_ICONS];

  const sortedIcons = [...icons];
  if (iconsSort === "asc") {
    sortedIcons.sort((a, b) => a.label.localeCompare(b.label));
  } else if (iconsSort === "desc") {
    sortedIcons.sort((a, b) => b.label.localeCompare(a.label));
  }

  const renderWindowContent = (type: string) => {
    switch (type) {
      case "projects":
        return <ProjectsWindow profile={profile} />;
      case "skills":
        return <SkillsWindow profile={profile} />;
      case "terminal":
        return <TerminalWindow />;
      case "sql":
        return <SqlStudioWindow />;
      case "research":
        return <ResearchWindow />;
      case "certs":
        return <CertificationsWindow profile={profile} />;
      case "resume":
        return <ResumeWindow profile={profile} />;
      case "about":
        return <AboutWindow profile={profile} />;
      case "game":
        return <MiniGameWindow />;
      case "contact":
        return <ContactWindow />;
      case "recycle":
        return <RecycleBinWindow profile={profile} />;
      case "blog":
        return <BlogWindow profile={profile} />;
      case "github":
        return <GitHubActivityWindow />;
      case "music":
        return <MusicWindow />;
      case "dashboard":
        return <AnalyticsDashboardWindow profile={profile} />;
      case "cases":
        return <CaseStudiesWindow profile={profile} />;
      case "settings":
        return <SettingsWindow profile={profile} onLogout={onLogout} />;
      case "personalize":
        return <PersonalizeWindow profile={profile} onLogout={onLogout} />;
      case "browser":
        return <BrowserWindow />;
      default:
        return null;
    }
  };

  return (
    <TaskbarProvider>
      <BrowserContext.Provider value={{ openBrowser: openBrowserUrl }}>
        <div
          className="w-full h-[100dvh] relative overflow-hidden animate-in fade-in duration-500"
          onClick={() => {
            setSelectedIcon(null);
            closeWindowMenu();
          }}
          onContextMenu={handleDesktopContextMenu}
        >
          <Wallpaper profile={profile} />

          {sortedIcons.map((item) => (
            <DesktopIcon
              key={item.id}
              label={item.label}
              icon={item.icon}
              selected={selectedIcon === item.id}
              onClick={() => setSelectedIcon(item.id)}
              onDoubleClick={() => {
                setSelectedIcon(item.id);
                item.action();
              }}
              testId={`desktop-icon-${item.id}`}
              defaultX={item.defaultX}
              defaultY={item.defaultY}
              iconSize={iconSize}
            />
          ))}

          {windows.map((w, idx) => (
            <Window
              key={w.id}
              id={w.id}
              title={w.title}
              zIndex={w.zIndex}
              onClose={() => closeWindow(w.id)}
              onFocus={() => focusWindow(w.id)}
              defaultWidth={Math.round(
                (w.type === "terminal" ||
                w.type === "sql" ||
                w.type === "dashboard"
                  ? 450
                  : w.type === "game"
                    ? 380
                    : 480) * 1.7,
              )}
              defaultHeight={Math.round((w.type === "game" ? 340 : 360) * 1.7)}
              offsetX={w.offsetX}
              offsetY={w.offsetY}
            >
              {renderWindowContent(w.type)}
            </Window>
          ))}

          <Taskbar
            profile={profile}
            onLogout={onLogout}
            windows={windows}
            onFocusWindow={focusWindow}
            onMinimizeAll={minimizeAll}
            music={music}
            onSearch={handleSearch}
            notifications={notifications}
            onClearNotifications={clearNotifications}
            language={language}
            onToggleLanguage={toggleLanguage}
            weather={weather}
            wifi={wifi}
            battery={battery}
          />

          {windowMenuPos && (
            <div
              className="fixed z-50 min-w-[220px] border border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl"
              style={{
                top: windowMenuPos.y,
                left: windowMenuPos.x,
                borderRadius: "10px",
                padding: "6px 0",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {[
                { label: "View", action: handleView, disabled: false },
                { label: "Sort by", action: handleSortBy, disabled: false },
                { label: "Refresh", action: handleRefresh, disabled: false },
                { label: "Paste", action: handlePaste, disabled: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`px-4 py-1.5 text-xs transition-colors ${item.disabled ? "text-white/40 cursor-default" : "text-white/80 hover:bg-white/10 hover:text-white cursor-pointer"}`}
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize: "11px",
                  }}
                  onClick={item.action}
                >
                  {item.label}
                </div>
              ))}
              <div className="h-px bg-white/10 my-1" />
              {[
                { label: "Display settings", action: handleDisplaySettings },
                { label: "Personalize", action: handlePersonalize },
                { label: "Open in Terminal", action: handleOpenInTerminal },
              ].map((item) => (
                <div
                  key={item.label}
                  className="px-4 py-1.5 text-xs text-white/80 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize: "11px",
                  }}
                  onClick={item.action}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}

          {searchOpen && (
            <SearchOverlay
              onClose={() => setSearchOpen(false)}
              onOpen={(id) => {
                setSearchOpen(false);
                window.dispatchEvent(
                  new CustomEvent("open-app", { detail: { id } }),
                );
              }}
            />
          )}
        </div>
      </BrowserContext.Provider>
    </TaskbarProvider>
  );
}
