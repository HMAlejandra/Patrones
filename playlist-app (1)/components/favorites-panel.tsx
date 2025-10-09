"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Music, Play, Trash2 } from "lucide-react"
import { FavoritesService } from "@/lib/favorites-service"
import type { Song } from "@/lib/doubly-linked-list"
import Image from "next/image"

interface FavoritesPanelProps {
  onAddToQueue: (song: Song) => void
  updateTrigger?: number
}

export function FavoritesPanel({ onAddToQueue, updateTrigger }: FavoritesPanelProps) {
  const [favorites, setFavorites] = useState<Song[]>([])

  useEffect(() => {
    setFavorites(FavoritesService.getFavorites())
  }, [updateTrigger])

  const handleRemoveFavorite = (songId: string) => {
    FavoritesService.removeFavorite(songId)
    setFavorites(FavoritesService.getFavorites())
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-primary fill-primary" />
        <h3 className="text-xl font-bold text-foreground">Favoritos ({favorites.length})</h3>
      </div>
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {favorites.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No tienes canciones favoritas</p>
        ) : (
          favorites.map((song) => (
            <div
              key={song.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded overflow-hidden bg-primary/10 flex-shrink-0">
                {song.cover ? (
                  <Image src={song.cover || "/placeholder.svg"} alt={song.title} fill className="object-cover" />
                ) : (
                  <Music className="w-5 h-5 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{song.title}</p>
                <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-primary hover:text-primary hover:bg-primary/10"
                onClick={() => onAddToQueue(song)}
              >
                <Play className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleRemoveFavorite(song.id)}
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
