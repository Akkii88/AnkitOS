interface WallpaperProps {
  profile?: "aiml" | "analyst";
}

function Wallpaper({ profile }: WallpaperProps) {
  const wallpaperSrc = profile === "analyst" ? "/analyst-wallpaper.mp4" : "/desktop-wallpaper.mp4";

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.65 }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={wallpaperSrc} type="video/mp4" />
      </video>
    </div>
  );
}

export default Wallpaper;
