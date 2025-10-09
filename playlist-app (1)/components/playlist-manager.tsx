"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ListMusic, Plus, Trash2, Play, Music } from "lucide-react"
import { PlaylistService, type Playlist } from "@/lib/playlist-service"
import type { Song } from "@/lib/doubly-linked-list"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PlaylistManagerProps {
  currentSong: Song | null
  onLoadPlaylist: (songs: Song[]) => void
}

export function PlaylistManager({ currentSong, onLoadPlaylist }: PlaylistManagerProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  useEffect(() => {
    setPlaylists(PlaylistService.getPlaylists())
  }, [])

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      PlaylistService.createPlaylist(newPlaylistName.trim())
      setPlaylists(PlaylistService.getPlaylists())
      setNewPlaylistName("")
      setIsCreateDialogOpen(false)
    }
  }

  const handleDeletePlaylist = (playlistId: string) => {
    PlaylistService.deletePlaylist(playlistId)
    setPlaylists(PlaylistService.getPlaylists())
    if (selectedPlaylist?.id === playlistId) {
      setSelectedPlaylist(null)
    }
  }

  const handleAddCurrentSong = (playlistId: string) => {
    if (currentSong) {
      PlaylistService.addSongToPlaylist(playlistId, currentSong)
      setPlaylists(PlaylistService.getPlaylists())
    }
  }

  const handleRemoveSong = (playlistId: string, songId: string) => {
    PlaylistService.removeSongFromPlaylist(playlistId, songId)
    setPlaylists(PlaylistService.getPlaylists())
    const updated = PlaylistService.getPlaylists().find((p) => p.id === playlistId)
    if (updated) setSelectedPlaylist(updated)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ListMusic className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Playlists ({playlists.length})</h3>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Nueva
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Playlist</DialogTitle>
              <DialogDescription>Ingresa un nombre para tu nueva playlist</DialogDescription>
            </DialogHeader>
            <div className="flex gap-2 mt-4">
              <Input
                placeholder="Nombre de la playlist"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreatePlaylist()}
              />
              <Button onClick={handleCreatePlaylist}>Crear</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {playlists.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No tienes playlists creadas</p>
        ) : (
          playlists.map((playlist) => (
            <div key={playlist.id} className="border border-border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{playlist.name}</h4>
                  <p className="text-sm text-muted-foreground">{playlist.songs.length} canciones</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-primary hover:text-primary hover:bg-primary/10"
                    onClick={() => onLoadPlaylist(playlist.songs)}
                    disabled={playlist.songs.length === 0}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-primary hover:text-primary hover:bg-primary/10"
                    onClick={() => handleAddCurrentSong(playlist.id)}
                    disabled={!currentSong}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeletePlaylist(playlist.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {playlist.songs.length > 0 && (
                <div className="space-y-1 pl-2 border-l-2 border-primary/20">
                  {playlist.songs.map((song) => (
                    <div
                      key={song.id}
                      className="flex items-center gap-2 p-2 rounded bg-secondary/50 hover:bg-secondary text-sm"
                    >
                      <div className="relative flex items-center justify-center w-8 h-8 rounded overflow-hidden bg-primary/10 flex-shrink-0">
                        {song.cover ? (
                          <Image
                            src={song.cover || "/placeholder.svg"}
                            alt={song.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Music className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate text-xs">{song.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveSong(playlist.id, song.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
