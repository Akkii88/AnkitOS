import { useState, useCallback } from "react";
import Desktop from "./pages/Desktop";
import LoginScreen from "./components/os/LoginScreen";
import BootScreen from "./components/os/BootScreen";
import AiAssistant from "./components/os/AiAssistant";

type Phase = "boot" | "login" | "desktop";
type Profile = "aiml" | "analyst" | null;

export default function App() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [profile, setProfile] = useState<Profile>(null);
  const [bootShow, setBootShow] = useState(true);
  const [loginShow, setLoginShow] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBootShow(false);
    requestAnimationFrame(() => {
      setLoginShow(true);
    });
  }, []);

  const selectProfile = (selectedProfile: "aiml" | "analyst") => {
    setProfile(selectedProfile);
    setPhase("desktop");
    setLoginShow(false);
  };

  const handleLogout = () => {
    setProfile(null);
    setPhase("boot");
    setBootShow(true);
    setLoginShow(false);
  };

  return (
    <div className="min-h-[100dvh] w-full overflow-hidden relative bg-black">
      {bootShow && (
        <div className="absolute inset-0 z-30">
          <BootScreen onComplete={handleBootComplete} />
        </div>
      )}

      {loginShow && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: bootShow ? 0 : 1,
            pointerEvents: bootShow ? "none" : "auto",
            zIndex: 20,
          }}
        >
          <LoginScreen onSelectProfile={selectProfile} visible={loginShow} />
        </div>
      )}

      {phase === "desktop" && profile && (
        <div className="absolute inset-0 z-10">
          <Desktop profile={profile} onLogout={handleLogout} />
        </div>
      )}

      {phase === "desktop" && profile && <AiAssistant profile={profile} />}
    </div>
  );
}