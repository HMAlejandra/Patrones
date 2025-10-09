import { MusicPlayer } from "@/components/music-player"
import { AnimatedBubbles } from "@/components/animated-bubbles"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-pink-50/30 to-rose-50/50 relative">
      <AnimatedBubbles />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="mb-8 text-center">
          <h1 className="font-sans text-5xl font-bold text-primary mb-2">MusicList</h1>
          <p className="text-muted-foreground text-lg">Lista de Reproducción con Listas Dobles</p>
        </header>
        <MusicPlayer />
      </div>
    </main>
  )
}
