import { createContext, useContext, useState, ReactNode } from "react";

export interface WindowInfo {
  id: string;
  title: string;
  type: string;
}

export interface MusicState {
  isPlaying: boolean;
  currentTrack: number | null;
  trackInfo: { title: string; artist: string } | null;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
}

export interface TaskbarContextValue {
  windows: WindowInfo[];
  registerWindow: (w: WindowInfo) => void;
  unregisterWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeAll: () => void;
  isMinimized: boolean;
  setIsMinimized: (v: boolean) => void;
  music: MusicState;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  notifications: Array<{ id: string; text: string; time: string }>;
  addNotification: (text: string) => void;
  clearNotifications: () => void;
  language: string;
  setLanguage: (l: string) => void;
  weather: { temp: string; icon: string; location: string };
  wifi: boolean;
  battery: number;
}

export const TaskbarContext = createContext<TaskbarContextValue>({
  windows: [],
  registerWindow: () => {},
  unregisterWindow: () => {},
  focusWindow: () => {},
  minimizeAll: () => {},
  isMinimized: false,
  setIsMinimized: () => {},
  music: {
    isPlaying: false,
    currentTrack: null,
    trackInfo: null,
    play: () => {},
    pause: () => {},
    next: () => {},
    prev: () => {},
  },
  searchOpen: false,
  setSearchOpen: () => {},
  notifications: [],
  addNotification: () => {},
  clearNotifications: () => {},
  language: "EN",
  setLanguage: () => {},
  weather: { temp: "28°C", icon: "🌤", location: "Gurugram" },
  wifi: true,
  battery: 85,
});

export function TaskbarProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowInfo[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState<TaskbarContextValue["notifications"]>([]);
  const [language, setLanguage] = useState("EN");
  const [musicState, setMusicState] = useState({
    isPlaying: false,
    currentTrack: null as number | null,
    trackInfo: null as { title: string; artist: string } | null,
  });

  const registerWindow = (w: WindowInfo) => {
    setWindows(prev => prev.find(win => win.id === w.id) ? prev : [...prev, w]);
  };

  const unregisterWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const focusWindow = (id: string) => {
    setWindows(prev => {
      const idx = prev.findIndex(w => w.id === id);
      if (idx === -1) return prev;
      const next = [...prev];
      const [win] = next.splice(idx, 1);
      next.push(win);
      return next;
    });
    setIsMinimized(false);
  };

  const minimizeAll = () => setIsMinimized(true);

  const addNotification = (text: string) => {
    const id = Date.now().toString();
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setNotifications(prev => [...prev.slice(-9), { id, text, time }]);
  };

  const clearNotifications = () => setNotifications([]);

  const music: MusicState = {
    isPlaying: musicState.isPlaying,
    currentTrack: musicState.currentTrack,
    trackInfo: musicState.trackInfo,
    play: () => setMusicState(s => ({ ...s, isPlaying: true })),
    pause: () => setMusicState(s => ({ ...s, isPlaying: false })),
    next: () => setMusicState(s => ({ ...s, currentTrack: s.currentTrack !== null ? (s.currentTrack + 1) % 4 : 0, isPlaying: true })),
    prev: () => setMusicState(s => ({ ...s, currentTrack: s.currentTrack !== null ? (s.currentTrack - 1 + 4) % 4 : 0, isPlaying: true })),
  };

  return (
    <TaskbarContext.Provider
      value={{
        windows,
        registerWindow,
        unregisterWindow,
        focusWindow,
        minimizeAll,
        isMinimized,
        setIsMinimized,
        music,
        searchOpen,
        setSearchOpen,
        notifications,
        addNotification,
        clearNotifications,
        language,
        setLanguage,
        weather: { temp: "28°C", icon: "🌤", location: "Gurugram" },
        wifi: true,
        battery: 85,
      }}
    >
      {children}
    </TaskbarContext.Provider>
  );
}

export function useTaskbar() {
  return useContext(TaskbarContext);
}
