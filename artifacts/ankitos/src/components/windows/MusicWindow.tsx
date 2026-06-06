import { useState, useRef, useEffect } from "react"

interface Track {
  title: string
  artist: string
  url: string
  duration: string
}

const loFiTracks: Track[] = [
  { title: "Midnight Code", artist: "ChillBot", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "2:34" },
  { title: "Neon Dreams", artist: "SynthCat", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: "3:12" },
  { title: "Pixel Rain", artist: "RetroSynth", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: "4:05" },
  { title: "Terminal Breeze", artist: "CoffeeByte", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: "2:58" },
]

export default function MusicWindow() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      if (!isPlaying) {
        audioRef.current.pause()
      }
    }
  }, [volume, isPlaying])

  const playTrack = async (idx: number) => {
    setCurrentTrack(idx)
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.load()
      try {
        await audioRef.current.play()
      } catch (err) {
        console.error("Failed to play audio:", err)
        setIsPlaying(false)
      }
    }
  }

  const stopTrack = () => {
    setCurrentTrack(null)
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  return (
    <div className="p-4 space-y-3">
      <div className="text-center mb-3">
        <div className="w-16 h-16 bg-white border-2 border-[#E8D5B0] shadow-[3px_3px_0px_#C4A882] flex items-center justify-center mx-auto mb-2">
          <span className="text-[24px]">🎧</span>
        </div>
        <div className="font-display text-[10px] text-[#3D2B1F]">
          {currentTrack !== null ? loFiTracks[currentTrack].title : "Select a track"}
        </div>
        <div className="font-display text-[7px] text-[#8B6F47]">
          {currentTrack !== null ? loFiTracks[currentTrack].artist : "Ambient Coding Beats"}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => {
            if (currentTrack !== null) {
              playTrack((currentTrack - 1 + loFiTracks.length) % loFiTracks.length)
            }
          }}
          className="w-6 h-6 bg-white border-2 border-[#E8D5B0] shadow-[2px_2px_0px_#C4A882] flex items-center justify-center hover:-translate-y-0.5 transition-transform"
          disabled={currentTrack === null}
        >
          <span className="text-[9px]">⏮</span>
        </button>
        <button
          onClick={() => {
            if (currentTrack !== null) {
              if (!isPlaying && audioRef.current) {
                audioRef.current.play().catch(() => setIsPlaying(false))
              }
              setIsPlaying(!isPlaying)
            }
          }}
          className="w-8 h-8 bg-white border-2 border-[#E8D5B0] shadow-[2px_2px_0px_#C4A882] flex items-center justify-center hover:-translate-y-0.5 transition-transform"
        >
          <span className="text-[12px]">{isPlaying ? "⏸" : "▶"}</span>
        </button>
        <button
          onClick={() => {
            if (currentTrack !== null) {
              playTrack((currentTrack + 1) % loFiTracks.length)
            }
          }}
          className="w-6 h-6 bg-white border-2 border-[#E8D5B0] shadow-[2px_2px_0px_#C4A882] flex items-center justify-center hover:-translate-y-0.5 transition-transform"
          disabled={currentTrack === null}
        >
          <span className="text-[9px]">⏭</span>
        </button>
        <button
          onClick={stopTrack}
          className="w-6 h-6 bg-white border-2 border-[#E8D5B0] shadow-[2px_2px_0px_#C4A882] flex items-center justify-center hover:-translate-y-0.5 transition-transform"
        >
          <span className="text-[9px]">⏹</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-display text-[7px] text-[#8B6F47]">Volume</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="flex-1"
        />
        <span className="font-display text-[7px] text-[#3D2B1F]">{Math.round(volume * 100)}%</span>
      </div>

      <div className="border-t-2 border-[#E8D5B0] pt-2">
        <div className="font-display text-[7px] text-[#3D2B1F] mb-1">Playlist</div>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {loFiTracks.map((track, idx) => (
            <button
              key={idx}
              onClick={() => playTrack(idx)}
              className={`w-full text-left p-1.5 font-display text-[7px] border-2 border-[#E8D5B0] shadow-[2px_2px_0px_#C4A882] hover:-translate-y-0.5 transition-transform ${
                currentTrack === idx ? "bg-[#F5E6C8]" : "bg-white"
              }`}
            >
              <span className={currentTrack === idx && isPlaying ? "text-[#E8832A]" : "text-[#3D2B1F]"}>
                {track.title}
              </span>
              <span className="text-[#8B6F47] ml-1"> — {track.duration}</span>
            </button>
          ))}
        </div>
      </div>

      <audio ref={audioRef} src={currentTrack !== null ? loFiTracks[currentTrack].url : undefined} />
    </div>
  )
}