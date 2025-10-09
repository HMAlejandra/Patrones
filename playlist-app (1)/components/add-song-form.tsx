"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import type { Song } from "@/lib/doubly-linked-list"

interface AddSongFormProps {
  onAddSong: (song: Omit<Song, "id">, position: "start" | "end" | number) => void
  totalSongs: number
}

export function AddSongForm({ onAddSong, totalSongs }: AddSongFormProps) {
  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [duration, setDuration] = useState("")
  const [position, setPosition] = useState<"start" | "end" | "custom">("end")
  const [customPosition, setCustomPosition] = useState("0")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !artist || !duration) return

    let finalPosition: "start" | "end" | number = position

    if (position === "custom") {
      const pos = Number.parseInt(customPosition)
      if (isNaN(pos) || pos < 0 || pos > totalSongs) {
        alert(`La posición debe estar entre 0 y ${totalSongs}`)
        return
      }
      finalPosition = pos
    }

    onAddSong({ title, artist, duration }, finalPosition)

    // Limpiar formulario
    setTitle("")
    setArtist("")
    setDuration("")
    setPosition("end")
    setCustomPosition("0")
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4 text-foreground">Agregar Canción</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            placeholder="Nombre de la canción"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="artist">Artista</Label>
          <Input
            id="artist"
            placeholder="Nombre del artista"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duración</Label>
          <Input
            id="duration"
            placeholder="3:45"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Posición</Label>
          <Select value={position} onValueChange={(value) => setPosition(value as "start" | "end" | "custom")}>
            <SelectTrigger id="position">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="start">Al inicio</SelectItem>
              <SelectItem value="end">Al final</SelectItem>
              <SelectItem value="custom">Posición específica</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {position === "custom" && (
          <div className="space-y-2">
            <Label htmlFor="customPosition">Posición (0 a {totalSongs})</Label>
            <Input
              id="customPosition"
              type="number"
              min="0"
              max={totalSongs}
              value={customPosition}
              onChange={(e) => setCustomPosition(e.target.value)}
              required
            />
          </div>
        )}

        <Button type="submit" className="w-full" size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Agregar Canción
        </Button>
      </form>
    </Card>
  )
}
