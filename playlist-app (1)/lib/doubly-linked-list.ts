export interface Song {
  id: string
  title: string
  artist: string
  duration: string
  album?: string
  cover?: string
  preview?: string
  deezerId?: number
}

class Node {
  data: Song
  next: Node | null = null
  prev: Node | null = null

  constructor(data: Song) {
    this.data = data
  }
}

export class DoublyLinkedList {
  private head: Node | null = null
  private tail: Node | null = null
  public size = 0

  // Agregar al inicio
  addAtStart(song: Song): void {
    const newNode = new Node(song)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head.prev = newNode
      this.head = newNode
    }

    this.size++
  }

  // Agregar al final
  addAtEnd(song: Song): void {
    const newNode = new Node(song)

    if (!this.tail) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.prev = this.tail
      this.tail.next = newNode
      this.tail = newNode
    }

    this.size++
  }

  // Agregar en posición específica
  addAtPosition(song: Song, position: number): void {
    if (position < 0 || position > this.size) {
      throw new Error("Posición inválida")
    }

    if (position === 0) {
      this.addAtStart(song)
      return
    }

    if (position === this.size) {
      this.addAtEnd(song)
      return
    }

    const newNode = new Node(song)
    let current = this.head
    let index = 0

    while (current && index < position) {
      current = current.next
      index++
    }

    if (current) {
      newNode.next = current
      newNode.prev = current.prev

      if (current.prev) {
        current.prev.next = newNode
      }

      current.prev = newNode
      this.size++
    }
  }

  // Eliminar canción por ID
  remove(id: string): boolean {
    if (!this.head) return false

    let current: Node | null = this.head

    while (current) {
      if (current.data.id === id) {
        if (current.prev) {
          current.prev.next = current.next
        } else {
          this.head = current.next
        }

        if (current.next) {
          current.next.prev = current.prev
        } else {
          this.tail = current.prev
        }

        this.size--
        return true
      }

      current = current.next
    }

    return false
  }

  // Obtener siguiente canción
  getNext(currentId: string): Song | null {
    let current = this.head

    while (current) {
      if (current.data.id === currentId) {
        return current.next ? current.next.data : null
      }
      current = current.next
    }

    return null
  }

  // Obtener canción anterior
  getPrevious(currentId: string): Song | null {
    let current = this.head

    while (current) {
      if (current.data.id === currentId) {
        return current.prev ? current.prev.data : null
      }
      current = current.next
    }

    return null
  }

  // Obtener primera canción
  getFirst(): Song | null {
    return this.head ? this.head.data : null
  }

  // Obtener última canción
  getLast(): Song | null {
    return this.tail ? this.tail.data : null
  }

  // Convertir a array
  toArray(): Song[] {
    const result: Song[] = []
    let current = this.head

    while (current) {
      result.push(current.data)
      current = current.next
    }

    return result
  }
}
