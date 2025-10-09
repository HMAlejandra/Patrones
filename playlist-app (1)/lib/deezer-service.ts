import type { Song } from "./doubly-linked-list"

export interface DeezerTrack {
  id: number
  title: string
  duration: number
  preview: string
  artist: {
    id: number
    name: string
    picture: string
    picture_small: string
    picture_medium: string
    picture_big: string
  }
  album: {
    id: number
    title: string
    cover: string
    cover_small: string
    cover_medium: string
    cover_big: string
  }
}

export interface DeezerSearchResponse {
  data: DeezerTrack[]
  total: number
}

export class DeezerService {
  static async searchTracks(query: string, limit = 10): Promise<DeezerTrack[]> {
    try {
      console.log("[v0] Searching Deezer for:", query)
      const response = await fetch(`/api/deezer/search?q=${encodeURIComponent(query)}&limit=${limit}`)

      console.log("[v0] Deezer API response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("[v0] Deezer API error:", errorText)
        throw new Error("Error al buscar canciones")
      }

      const data: DeezerSearchResponse = await response.json()
      console.log("[v0] Deezer results:", data.data?.length || 0, "tracks found")
      return data.data || []
    } catch (error) {
      console.error("[v0] Error searching Deezer:", error)
      return []
    }
  }

  static formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  static convertToSong(track: DeezerTrack): Omit<Song, "id"> {
    return {
      title: track.title,
      artist: track.artist.name,
      duration: this.formatDuration(track.duration),
      album: track.album.title,
      cover: track.album.cover_medium,
      preview: track.preview,
      deezerId: track.id,
    }
  }
}
