"""
Implementación de Lista Doblemente Enlazada en Python
para simular una lista de reproducción de canciones.

Esta estructura de datos permite:
- Navegar hacia adelante y hacia atrás
- Insertar en cualquier posición
- Eliminar elementos eficientemente
"""

class Song:
    """Representa una canción en la lista de reproducción"""
    def __init__(self, title: str, artist: str, duration: str):
        self.title = title
        self.artist = artist
        self.duration = duration
    
    def __str__(self):
        return f"{self.title} - {self.artist} ({self.duration})"


class Node:
    """Nodo de la lista doblemente enlazada"""
    def __init__(self, data: Song):
        self.data = data
        self.next = None
        self.prev = None


class DoublyLinkedList:
    """Lista doblemente enlazada para gestionar la playlist"""
    
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0
    
    def add_at_start(self, song: Song):
        """Agregar canción al inicio de la lista"""
        new_node = Node(song)
        
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
        
        self.size += 1
        print(f"✓ Agregada al inicio: {song}")
    
    def add_at_end(self, song: Song):
        """Agregar canción al final de la lista"""
        new_node = Node(song)
        
        if not self.tail:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node
        
        self.size += 1
        print(f"✓ Agregada al final: {song}")
    
    def add_at_position(self, song: Song, position: int):
        """Agregar canción en una posición específica"""
        if position < 0 or position > self.size:
            print(f"✗ Posición inválida: {position}")
            return
        
        if position == 0:
            self.add_at_start(song)
            return
        
        if position == self.size:
            self.add_at_end(song)
            return
        
        new_node = Node(song)
        current = self.head
        index = 0
        
        while current and index < position:
            current = current.next
            index += 1
        
        if current:
            new_node.next = current
            new_node.prev = current.prev
            
            if current.prev:
                current.prev.next = new_node
            
            current.prev = new_node
            self.size += 1
            print(f"✓ Agregada en posición {position}: {song}")
    
    def remove(self, title: str):
        """Eliminar canción por título"""
        if not self.head:
            print("✗ La lista está vacía")
            return False
        
        current = self.head
        
        while current:
            if current.data.title == title:
                if current.prev:
                    current.prev.next = current.next
                else:
                    self.head = current.next
                
                if current.next:
                    current.next.prev = current.prev
                else:
                    self.tail = current.prev
                
                self.size -= 1
                print(f"✓ Eliminada: {current.data}")
                return True
            
            current = current.next
        
        print(f"✗ No se encontró: {title}")
        return False
    
    def get_next(self, title: str):
        """Obtener la siguiente canción (adelantar)"""
        current = self.head
        
        while current:
            if current.data.title == title:
                if current.next:
                    return current.next.data
                else:
                    print("✗ No hay siguiente canción")
                    return None
            current = current.next
        
        print(f"✗ No se encontró: {title}")
        return None
    
    def get_previous(self, title: str):
        """Obtener la canción anterior (retroceder)"""
        current = self.head
        
        while current:
            if current.data.title == title:
                if current.prev:
                    return current.prev.data
                else:
                    print("✗ No hay canción anterior")
                    return None
            current = current.next
        
        print(f"✗ No se encontró: {title}")
        return None
    
    def display(self):
        """Mostrar todas las canciones"""
        if not self.head:
            print("La lista está vacía")
            return
        
        print(f"\n{'='*60}")
        print(f"LISTA DE REPRODUCCIÓN ({self.size} canciones)")
        print(f"{'='*60}")
        
        current = self.head
        index = 1
        
        while current:
            print(f"{index}. {current.data}")
            current = current.next
            index += 1
        
        print(f"{'='*60}\n")
    
    def display_reverse(self):
        """Mostrar todas las canciones en orden inverso"""
        if not self.tail:
            print("La lista está vacía")
            return
        
        print(f"\n{'='*60}")
        print(f"LISTA EN ORDEN INVERSO ({self.size} canciones)")
        print(f"{'='*60}")
        
        current = self.tail
        index = self.size
        
        while current:
            print(f"{index}. {current.data}")
            current = current.prev
            index -= 1
        
        print(f"{'='*60}\n")


# Demostración del funcionamiento
def main():
    print("\n🎵 SISTEMA DE LISTA DE REPRODUCCIÓN 🎵")
    print("Implementación con Lista Doblemente Enlazada\n")
    
    # Crear playlist
    playlist = DoublyLinkedList()
    
    # Agregar canciones al final
    print("--- Agregando canciones al final ---")
    playlist.add_at_end(Song("Bohemian Rhapsody", "Queen", "5:55"))
    playlist.add_at_end(Song("Imagine", "John Lennon", "3:03"))
    playlist.add_at_end(Song("Billie Jean", "Michael Jackson", "4:54"))
    
    # Mostrar playlist
    playlist.display()
    
    # Agregar al inicio
    print("--- Agregando canción al inicio ---")
    playlist.add_at_start(Song("Stairway to Heaven", "Led Zeppelin", "8:02"))
    playlist.display()
    
    # Agregar en posición específica
    print("--- Agregando canción en posición 2 ---")
    playlist.add_at_position(Song("Hotel California", "Eagles", "6:30"), 2)
    playlist.display()
    
    # Navegar (adelantar)
    print("--- Adelantar canción ---")
    current = "Bohemian Rhapsody"
    next_song = playlist.get_next(current)
    if next_song:
        print(f"Siguiente de '{current}': {next_song}")
    
    # Navegar (retroceder)
    print("\n--- Retroceder canción ---")
    current = "Billie Jean"
    prev_song = playlist.get_previous(current)
    if prev_song:
        print(f"Anterior de '{current}': {prev_song}")
    
    # Eliminar canción
    print("\n--- Eliminando canción ---")
    playlist.remove("Hotel California")
    playlist.display()
    
    # Mostrar en orden inverso
    playlist.display_reverse()
    
    print("✓ Demostración completada")


if __name__ == "__main__":
    main()
