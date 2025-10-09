import type { Song } from "./doubly-linked-list"

const PLAYLISTS_KEY = "musiclist_playlists"

export interface Playlist {
  id: string
  name: string
  songs: Song[]
  createdAt: string
}

export class PlaylistService {
  static getPlaylists(): Playlist[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(PLAYLISTS_KEY)
    return stored ? JSON.parse(stored) : []
  }

  static createPlaylist(name: string): Playlist {
    const playlists = this.getPlaylists()
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      songs: [],
      createdAt: new Date().toISOString(),
    }
    playlists.push(newPlaylist)
    localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists))
    return newPlaylist
  }

  static deletePlaylist(playlistId: string): void {
    const playlists = this.getPlaylists()
    const filtered = playlists.filter((p) => p.id !== playlistId)
    localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(filtered))
  }

  static addSongToPlaylist(playlistId: string, song: Song): void {
    const playlists = this.getPlaylists()
    const playlist = playlists.find((p) => p.id === playlistId)
    if (playlist && !playlist.songs.find((s) => s.id === song.id)) {
      playlist.songs.push(song)
      localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists))
    }
  }

  static removeSongFromPlaylist(playlistId: string, songId: string): void {
    const playlists = this.getPlaylists()
    const playlist = playlists.find((p) => p.id === playlistId)
    if (playlist) {
      playlist.songs = playlist.songs.filter((s) => s.id !== songId)
      localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists))
    }
  }

  static renamePlaylist(playlistId: string, newName: string): void {
    const playlists = this.getPlaylists()
    const playlist = playlists.find((p) => p.id === playlistId)
    if (playlist) {
      playlist.name = newName
      localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists))
    }
  }
}
