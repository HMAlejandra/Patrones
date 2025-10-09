import type { Song } from "./doubly-linked-list"

const FAVORITES_KEY = "musiclist_favorites"

export class FavoritesService {
  static getFavorites(): Song[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(FAVORITES_KEY)
    return stored ? JSON.parse(stored) : []
  }

  static addFavorite(song: Song): void {
    const favorites = this.getFavorites()
    if (!favorites.find((s) => s.id === song.id)) {
      favorites.push(song)
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    }
  }

  static removeFavorite(songId: string): void {
    const favorites = this.getFavorites()
    const filtered = favorites.filter((s) => s.id !== songId)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered))
  }

  static isFavorite(songId: string): boolean {
    const favorites = this.getFavorites()
    return favorites.some((s) => s.id === songId)
  }

  static toggleFavorite(song: Song): boolean {
    if (this.isFavorite(song.id)) {
      this.removeFavorite(song.id)
      return false
    } else {
      this.addFavorite(song)
      return true
    }
  }
}
