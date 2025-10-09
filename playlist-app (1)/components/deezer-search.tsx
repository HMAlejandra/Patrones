"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Plus, Loader2, Music } from "lucide-react"
import { DeezerService, type DeezerTrack } from "@/lib/deezer-service"
import type { Song } from "@/lib/doubly-linked-list"
import Image from "next/image"

interface DeezerSearchProps {
  onAddSong: (song: Omit<Song, "id">) => void
}

export function DeezerSearch({ onAddSong }: DeezerSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<DeezerTrack[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) return

    console.log("[v0] Starting Deezer search for:", query)
    setIsSearching(true)
    setHasSearched(true)

    const tracks = await DeezerService.searchTracks(query)
    console.log("[v0] Search completed, results:", tracks.length)
    setResults(tracks)
    setIsSearching(false)
  }

  const handleAddTrack = (track: DeezerTrack) => {
    console.log("[v0] Adding track to playlist:", track.title)
    const song = DeezerService.convertToSong(track)
    onAddSong(song)
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4 text-foreground">Buscar en Deezer</h3>

      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="search">Buscar canciones, artistas o álbumes</Label>
          <div className="flex gap-2">
            <Input
              id="search"
              placeholder="Ej: Bohemian Rhapsody, Queen, etc."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching || !query.trim()}>
              {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </form>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {isSearching && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {!isSearching && hasSearched && results.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Music className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No se encontraron resultados</p>
          </div>
        )}

        {!isSearching &&
          results.map((track) => (
            <div
              key={track.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-primary/10">
                {track.album.cover_small ? (
                  <Image
                    src={track.album.cover_small || "/placeholder.svg"}
                    alt={track.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Music className="w-6 h-6 text-primary/50" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{track.title}</p>
                <p className="text-xs text-muted-foreground truncate">{track.artist.name}</p>
              </div>

              <div className="text-xs text-muted-foreground flex-shrink-0">
                {DeezerService.formatDuration(track.duration)}
              </div>

              <Button size="sm" variant="outline" onClick={() => handleAddTrack(track)} className="flex-shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ))}
      </div>
    </Card>
  )
}
