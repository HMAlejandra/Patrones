"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react"
import { DoublyLinkedList, type Song } from "@/lib/doubly-linked-list"
import { SongList } from "@/components/song-list"
import { AddSongForm } from "@/components/add-song-form"
import { DeezerSearch } from "@/components/deezer-search"
import { FavoritesPanel } from "@/components/favorites-panel"
import { PlaylistManager } from "@/components/playlist-manager"
import Image from "next/image"

export function MusicPlayer() {
  const [playlist] = useState(() => {
    const list = new DoublyLinkedList()
    return list
  })

  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [songs, setSongs] = useState<Song[]>([])
  const [favoritesUpdateTrigger, setFavoritesUpdateTrigger] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!currentSong?.preview) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      setIsPlaying(false)
      return
    }

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
    }

    const audio = new Audio(currentSong.preview)
    audioRef.current = audio

    audio.addEventListener("ended", () => {
      setIsPlaying(false)
      handleNext()
    })

    audio.addEventListener("error", (e) => {
      console.error("[v0] Audio error:", e)
      setIsPlaying(false)
    })

    audio.addEventListener("play", () => {
      setIsPlaying(true)
    })

    audio.addEventListener("pause", () => {
      setIsPlaying(false)
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [currentSong?.id])

  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("[v0] Error playing audio:", error)
        setIsPlaying(false)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const updateSongsList = () => {
    setSongs(playlist.toArray())
  }

  const handlePlay = () => {
    if (!currentSong && playlist.size > 0) {
      setCurrentSong(playlist.getFirst())
      return
    }

    if (!currentSong?.preview) {
      return
    }

    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    if (currentSong) {
      const next = playlist.getNext(currentSong.id)
      if (next) {
        setCurrentSong(next)
        setIsPlaying(false)
      }
    }
  }

  const handlePrevious = () => {
    if (currentSong) {
      const prev = playlist.getPrevious(currentSong.id)
      if (prev) {
        setCurrentSong(prev)
        setIsPlaying(false)
      }
    }
  }

  const handleAddSong = (song: Omit<Song, "id">, position: "start" | "end" | number) => {
    const newSong: Song = {
      ...song,
      id: Date.now().toString() + Math.random(),
    }

    if (position === "start") {
      playlist.addAtStart(newSong)
    } else if (position === "end") {
      playlist.addAtEnd(newSong)
    } else {
      playlist.addAtPosition(newSong, position)
    }

    updateSongsList()

    if (!currentSong) {
      setCurrentSong(playlist.getFirst())
    }
  }

  const handleAddFromDeezer = (song: Omit<Song, "id">) => {
    handleAddSong(song, "end")
  }

  const handleDeleteSong = (id: string) => {
    if (currentSong?.id === id) {
      const next = playlist.getNext(id) || playlist.getPrevious(id)
      setCurrentSong(next)
      setIsPlaying(false)
    }

    playlist.remove(id)
    updateSongsList()
  }

  const handleSelectSong = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(false)
  }

  const handleLoadPlaylist = (playlistSongs: Song[]) => {
    // Limpiar playlist actual
    songs.forEach((song) => playlist.remove(song.id))

    // Agregar canciones de la playlist
    playlistSongs.forEach((song) => {
      playlist.addAtEnd(song)
    })

    updateSongsList()

    if (playlistSongs.length > 0) {
      setCurrentSong(playlistSongs[0])
      setIsPlaying(false)
    }
  }

  const handleFavoritesChange = () => {
    setFavoritesUpdateTrigger((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Reproductor Principal */}
        <Card className="p-8 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border-primary/20">
          <div className="flex flex-col items-center gap-6">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl overflow-hidden relative">
              {currentSong?.cover ? (
                <Image
                  src={currentSong.cover || "/placeholder.svg"}
                  alt={currentSong.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <Music className="w-24 h-24 text-primary-foreground" />
              )}
            </div>

            <div className="text-center space-y-2 w-full">
              <h2 className="text-3xl font-bold text-foreground text-balance">{currentSong?.title || "Sin canción"}</h2>
              <p className="text-lg text-muted-foreground">{currentSong?.artist || "Busca canciones en Deezer"}</p>
              {currentSong?.album && <p className="text-sm text-muted-foreground">{currentSong.album}</p>}
              {currentSong && <p className="text-sm text-muted-foreground">{currentSong.duration}</p>}
              {currentSong && !currentSong.preview && (
                <p className="text-xs text-destructive font-medium">Esta canción no tiene preview disponible</p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full w-14 h-14 border-primary/30 hover:bg-primary/10 bg-transparent"
                onClick={handlePrevious}
                disabled={!currentSong}
              >
                <SkipBack className="w-6 h-6" />
              </Button>

              <Button
                size="lg"
                className="rounded-full w-20 h-20 bg-primary hover:bg-primary/90 shadow-lg disabled:opacity-50"
                onClick={handlePlay}
                disabled={!currentSong || !currentSong.preview}
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full w-14 h-14 border-primary/30 hover:bg-primary/10 bg-transparent"
                onClick={handleNext}
                disabled={!currentSong}
              >
                <SkipForward className="w-6 h-6" />
              </Button>
            </div>

            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div
                className={`h-full bg-primary transition-all duration-300 ${isPlaying ? "animate-pulse" : ""}`}
                style={{ width: isPlaying ? "60%" : "0%" }}
              />
            </div>
          </div>
        </Card>

        {/* Lista de Canciones y Controles */}
        <div className="space-y-6">
          <DeezerSearch onAddSong={handleAddFromDeezer} />
          <AddSongForm onAddSong={handleAddSong} totalSongs={songs.length} />
          <SongList
            songs={songs}
            currentSong={currentSong}
            onSelectSong={handleSelectSong}
            onDeleteSong={handleDeleteSong}
            onFavoritesChange={handleFavoritesChange}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <FavoritesPanel onAddToQueue={handleAddFromDeezer} updateTrigger={favoritesUpdateTrigger} />
        <PlaylistManager currentSong={currentSong} onLoadPlaylist={handleLoadPlaylist} />
      </div>
    </div>
  )
}
