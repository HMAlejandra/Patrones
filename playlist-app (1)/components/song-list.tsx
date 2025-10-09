"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Trash2, Heart } from "lucide-react"
import type { Song } from "@/lib/doubly-linked-list"
import { FavoritesService } from "@/lib/favorites-service"
import Image from "next/image"

interface SongListProps {
  songs: Song[]
  currentSong: Song | null
  onSelectSong: (song: Song) => void
  onDeleteSong: (id: string) => void
  onFavoritesChange?: () => void
}

export function SongList({ songs, currentSong, onSelectSong, onDeleteSong, onFavoritesChange }: SongListProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    const favs = FavoritesService.getFavorites()
    setFavorites(new Set(favs.map((s) => s.id)))
  }, [])

  const handleToggleFavorite = (song: Song, e: React.MouseEvent) => {
    e.stopPropagation()
    const isFav = FavoritesService.toggleFavorite(song)
    const newFavorites = new Set(favorites)
    if (isFav) {
      newFavorites.add(song.id)
    } else {
      newFavorites.delete(song.id)
    }
    setFavorites(newFavorites)
    onFavoritesChange?.()
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4 text-foreground">Lista de Reproducción ({songs.length})</h3>
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {songs.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No hay canciones en la lista</p>
        ) : (
          songs.map((song, index) => (
            <div
              key={song.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                currentSong?.id === song.id
                  ? "bg-primary/20 border-2 border-primary"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
              onClick={() => onSelectSong(song)}
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded overflow-hidden bg-primary/10 flex-shrink-0">
                {song.cover ? (
                  <Image src={song.cover || "/placeholder.svg"} alt={song.title} fill className="object-cover" />
                ) : (
                  <Music className="w-5 h-5 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {index + 1}. {song.title}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {song.artist} • {song.duration}
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className={`${
                  favorites.has(song.id)
                    ? "text-primary hover:text-primary"
                    : "text-muted-foreground hover:text-primary"
                } hover:bg-primary/10`}
                onClick={(e) => handleToggleFavorite(song, e)}
              >
                <Heart className={`w-4 h-4 ${favorites.has(song.id) ? "fill-primary" : ""}`} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteSong(song.id)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
